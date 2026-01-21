from .base import BaseSQLModels
from sqlalchemy.orm import Mapped, mapped_column
from src.schemas.callback import CallbackSchema
from datetime import datetime

class Callback(BaseSQLModels):

    __tablename__ = 'callback'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    phone: Mapped[str] = mapped_column(nullable=False)
    fullname: Mapped[str] = mapped_column(nullable=False)
    message: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    def to_schemas(self) -> CallbackSchema:
        return CallbackSchema(id=self.id, phone=self.phone, fullname=self.fullname, message=self.message)