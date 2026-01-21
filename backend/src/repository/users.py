from src.utils.repository import SQLAlchemyRepository
from src.models.users import Users

class UsersRepository(SQLAlchemyRepository):

    entity = Users