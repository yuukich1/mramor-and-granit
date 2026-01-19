from pydantic import BaseModel

class CategorySchemas(BaseModel):
    id: int
    name: str


class CategoryCreateSchemas(BaseModel):
    name: str

class CategoryUpdateSchemas(BaseModel):
    name: str
    