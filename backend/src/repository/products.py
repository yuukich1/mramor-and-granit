from src.models.products import Products
from src.utils.repository import SQLAlchemyRepository


class ProductsRepository(SQLAlchemyRepository):

    entity = Products
