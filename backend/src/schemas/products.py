from typing import List, Optional
from pydantic import BaseModel
from src.schemas.categories import CategorySchemas
class ProductSchema(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category_id:  int
    image_url: Optional[str] = None
    tags: List[str]

class ProductWithCategorySchema(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image_url: Optional[str] = None
    tags: List[str]
    category: CategorySchemas

class ProductCreateSchemas(BaseModel):
    name: str
    description: str
    price: float
    category_id: int
    tags: List[str]

class ProductUpdateSchemas(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None
    tags: Optional[List[str]] = None

