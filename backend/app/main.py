from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.models.articles import Article
from app.models.articles import ArticleCreate
from app.models.concept_db import ConceptDB
from app.ai.concept_extractor import extract_concepts
from app.models.articles_db import ArticleDB
from sqlalchemy.orm import Session
from app.database import Base, engine, get_db


app = FastAPI(title="AI Article Platform API")
Base.metadata.create_all(bind=engine)


# Only the local frontend dev server is allowed to call this API right now.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

# @app.get("/articles")
# def get_articles():
#     return articles

# @app.post("/articles")
# def create_article(article: ArticleCreate):

#     new_id = len(articles) + 1

#     new_article = Article(
#         id = new_id,
#         title = article.title,
#         author = article.author,
#         content = article.content
#     )

#     articles.append(new_article)

#     return new_article

@app.post("/articles")
def create_article(
    article: ArticleCreate,
    db: Session = Depends(get_db)
):
    db_article = ArticleDB(
        title=article.title,
        author=article.author,
        content=article.content,
    )

    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    concepts = extract_concepts(article.content)

    for concept in concepts:
            db_concept = ConceptDB(
                article_id=db_article.id,
                term=concept["term"],
                explanation=concept["explanation"],
            )

            db.add(db_concept)

    db.commit()

    return db_article

# @app.get("/articles/{article_id}")
# def get_article(article_id: int):

#     for i in articles:
#         if i.id == article_id:
#             return i

#     raise HTTPException(
#         status_code=404,
#         detail="Article not found"
#     )

@app.get("/articles")
def get_articles(db: Session = Depends(get_db)):
    return db.query(ArticleDB).all()

@app.get("/articles/{article_id}")
def get_article(
    article_id: int,
    db: Session = Depends(get_db)
):
    article = (
        db.query(ArticleDB)
        .filter(ArticleDB.id == article_id)
        .first()
    )

    if article is None:
        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    return article

# @app.delete("/articles/{article_id}")
# def delete_article(article_id : int):
#     for i in articles:
#         if i.id == article_id:
#             articles.remove(i)

#             return {"message":"Article deleted"}

#     raise HTTPException(
#         status_code=404,
#         detail="Article not found"
#     )

@app.delete("/articles/{article_id}")
def delete_article(
    article_id: int,
    db: Session = Depends(get_db)
):
    article = (
        db.query(ArticleDB)
        .filter(ArticleDB.id == article_id)
        .first()
    )

    if article is None:
        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    db.delete(article)
    db.commit()

    return {"message": "Article deleted"}

@app.get("/articles/{article_id}/concepts")
def get_concepts(
    article_id: int,
    db: Session = Depends(get_db)
):
    concepts = (
        db.query(ConceptDB)
        .filter(ConceptDB.article_id == article_id)
        .all()
    )

    return concepts