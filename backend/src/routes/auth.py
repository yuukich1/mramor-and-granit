from fastapi import APIRouter, Form, Request
from src.dependencies import UOWdep
from src.schemas.users import UserCreateSchema, UserUpdateSchema
from src.service.auth import AuthService
from loguru import logger


router = APIRouter()


@router.post("/register")
async def register_user(user_create: UserCreateSchema, uow: UOWdep):
    logger.info(f"POST /api/auth/register - Registration request for username='{user_create.username}''")
    try:
        user = await AuthService().register(user_create, uow)
        logger.info(f"Registration successful for username='{user_create.username}'")
        return user
    except Exception as e:
        logger.error(f"Registration failed for username='{user_create.username}': {e}")
        raise

@router.post('/login')
async def login_user(uow: UOWdep, username: str = Form(...), password: str = Form(...)):
    logger.info(f"POST /api/auth/login - Login attempt for username='{username}'")
    try:
        access_token, refresh_token = await AuthService().login(username=username, password=password, uow=uow)
        logger.info(f"Login successful for username='{username}'")
        return {'access_token': access_token,
                'refresh_token': refresh_token,
                'type': 'bearer'}
    except Exception as e:
        logger.warning(f"Login failed for username='{username}': {e}")
        raise



