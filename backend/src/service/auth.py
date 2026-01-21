from datetime import datetime

from fastapi import HTTPException, Depends
from jwt import PyJWT
from loguru import logger

from src.schemas.users import UserCreateSchema, UserUpdateSchema, UsersSchema
from src.utils.unit_of_work import IUnitOfWork
from src.config import pwd_context, SecurityConfig, oauth2_scheme


class AuthService:

    async def register(self, data: UserCreateSchema, uow: IUnitOfWork):
        logger.info(f"Registration attempt for username='{data.username}'")
        data.password = pwd_context.hash(data.password)
        logger.debug(f"Password hashed for username='{data.username}'")
        async with uow:
            try:
                user = await uow.users.create(data)
                await uow.commit()
                logger.success(f"User registered successfully: username='{data.username}', user_id={user.id}")
                return {'message': "success"}
            except Exception as e:
                logger.error(f"Registration failed for username='{data.username}': {e}")
                raise

    async def login(self, username: str, password: str, uow: IUnitOfWork):
        logger.info(f"login called for username='{username}'")
        async with uow:
            user = await uow.users.get_filter_by(username=username)
            if not user or not pwd_context.verify(password, user.password):
                logger.warning(f"login failed: invalid credentials for username='{username}'")
                raise HTTPException(status_code=400, detail='invalid credetials')
            access = await self.generate_access_jwt(user)
            refresh = await self.generate_refresh_jwt(user)
            logger.info(f"User logged in: username='{user.username}' (tokens generated, not logged)")
            return access, refresh

    def _create_payload(self, user: UsersSchema, expires):
        payload = {
            "exp": expires,
            'user_id': user.id,
            "username": user.username,
            "access": user.access,
        }
        logger.debug(
            f"_create_payload: user_id='{user.id}', username='{user.username}', access='{user.access}', exp={expires}")
        return payload

    def expires_time(self, expires):
        expire_time = datetime.utcnow() + expires
        logger.debug(f"expires_time: computed expire timestamp: {int(expire_time.timestamp())}")
        logger.debug(f"expires_time: current utc timestamp: {int(datetime.utcnow().timestamp())}")
        return expire_time

    def _encode_jwt(self, payload: dict, key):
        logger.debug(f"_encode_jwt: encoding payload for username='{payload.get('username')}'")
        token = PyJWT().encode(payload=payload, key=key, algorithm=SecurityConfig.algorithm)
        logger.debug(f"_encode_jwt: token encoded (value not logged)")
        return token

    async def generate_access_jwt(self, user: UsersSchema):
        logger.debug(f"generate_access_jwt called for username='{user.username}'")
        payload = self._create_payload(user, self.expires_time(SecurityConfig.exp))
        token = self._encode_jwt(payload, SecurityConfig.secret_key)
        logger.debug(f"generate_access_jwt: access token generated for username='{user.username}' (not logged)")
        return token

    async def generate_refresh_jwt(self, user: UsersSchema):
        logger.debug(f"generate_refresh_jwt called for username='{user.username}'")
        payload = self._create_payload(user, self.expires_time(SecurityConfig.exp_refresh))
        token = self._encode_jwt(payload, SecurityConfig.secret_key)
        logger.debug(f"generate_refresh_jwt: refresh token generated for username='{user.username}' (not logged)")
        return token

    @staticmethod
    async def __decode_jwt(token: str):
        logger.debug("_decode_jwt called (token not logged)")
        try:
            data = PyJWT().decode(token, key=SecurityConfig.secret_key, algorithms=[SecurityConfig.algorithm])
            if not data:
                logger.warning("_decode_jwt: decoded payload empty")
                raise HTTPException(status_code=401)
            logger.debug(f"_decode_jwt: decoded payload for username='{data.get('username')}'")
            return data
        except Exception as e:
            logger.exception(f"_decode_jwt: failed to decode token: {e}")
            raise HTTPException(status_code=401)

    @classmethod
    async def get_admin_by_jwt(cls, token: str = Depends(oauth2_scheme)):
        logger.debug("get_admin_by_jwt called (token not logged)")
        user_data = await cls.__decode_jwt(token)
        if user_data.get('access') != 'False':
            logger.warning(
                f"get_admin_by_jwt: access denied for user_id='{user_data.get('user_id')}', insufficient role")
            raise HTTPException(status_code=403)
        logger.info(f"get_admin_by_jwt: admin access granted for user_id='{user_data.get('user_id')}'")
        return user_data

