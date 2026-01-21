from typing import Optional

from pydantic import BaseModel

class UsersSchema(BaseModel):
    id: int
    username: str
    password: str
    access: bool

class UserCreateSchema(BaseModel):
    username: str
    password: str

class UserUpdateSchema(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None

