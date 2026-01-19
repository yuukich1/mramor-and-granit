from .base import BaseSQLModels
from sqlalchemy.orm import Mapped, mapped_column
from src.schemas.categories import CategorySchemas
from datetime import datetime

class Category(BaseSQLModels):

    __tablename__ = 'categories'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    def to_schemas(self) -> CategorySchemas:
        return CategorySchemas(id=self.id, name=self.name)
