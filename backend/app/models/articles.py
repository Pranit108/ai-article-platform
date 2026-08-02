from pydantic import BaseModel

class Article(BaseModel):
    id : int
    title : str
    author : str
    content : str

class ArticleCreate(BaseModel):
    title : str
    author : str
    content : str