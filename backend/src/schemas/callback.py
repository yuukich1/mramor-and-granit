from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber

class CallbackSchema(BaseModel):
    id: int
    phone: PhoneNumber
    fullname: str
    message: Optional[str] = None
    created_at: datetime

class CallbackCreateSchema(BaseModel):
    phone: PhoneNumber
    fullname: str
    message: Optional[str] = None