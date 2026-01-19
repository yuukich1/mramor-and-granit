from datetime import datetime
from typing import List
from sqlalchemy import ARRAY, String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.base import BaseSQLModels
from src.schemas.products import ProductSchema

class Products(BaseSQLModels):

    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(index=True, unique=True, nullable=False)
    description: Mapped[str]
    price: Mapped[float] = mapped_column(index=True)
    category_id: Mapped[int] = mapped_column(index=True)
    image_url: Mapped[str]
    tags: Mapped[List[str]] = mapped_column(ARRAY(String), default=[])
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    def to_schemas(self) -> ProductSchema:
        return ProductSchema(
            id=self.id,
            name=self.name,
            description=self.description,
            price=self.price,
            category_id=self.category_id,
            tags=self.tags,
            image_url=self.image_url,
        )