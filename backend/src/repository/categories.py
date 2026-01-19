from src.models.categories import Category
from src.utils.repository import SQLAlchemyRepository

class CategoriesRepository(SQLAlchemyRepository):

    entity = Category