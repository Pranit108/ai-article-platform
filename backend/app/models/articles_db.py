from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class ArticleDB(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    author = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)

