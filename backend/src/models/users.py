from .base import BaseSQLModels
from sqlalchemy.orm import Mapped, mapped_column
from src.schemas.users import UsersSchema
from datetime import datetime

class Users(BaseSQLModels):

    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(unique=False, nullable=False)
    access: Mapped[bool] = mapped_column(unique=False, default=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())

    def to_schemas(self) -> UsersSchema:
        return UsersSchema(id=self.id, username=self.username, password=self.password, access=self.access,)