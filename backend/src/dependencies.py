from typing import Annotated
from fastapi import Depends

from src.service.auth import AuthService
from src.utils.unit_of_work import UnitOfWork

UOWdep = Annotated[UnitOfWork, Depends(UnitOfWork)]

AdminDep = Annotated[dict, Depends(AuthService.get_admin_by_jwt)]