from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class ConceptDB(Base):
    __tablename__ = "concepts"

    id = Column(Integer, primary_key=True, index=True)

    article_id = Column(
        Integer,
        ForeignKey("articles.id"),
        nullable=False,
    )

    term = Column(String(255), nullable=False)

    explanation = Column(Text, nullable=False)