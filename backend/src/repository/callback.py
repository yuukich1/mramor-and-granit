from src.utils.repository import SQLAlchemyRepository
from src.models.callback import Callback

class CallbackRepository(SQLAlchemyRepository):

    entity = Callback