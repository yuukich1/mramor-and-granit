from typing import List

from fastapi import APIRouter, BackgroundTasks
from loguru import logger
from src.schemas.callback import CallbackCreateSchema, CallbackSchema
from src.dependencies import UOWdep, AdminDep
from src.service.callback import CallbackService

router = APIRouter()

@router.post('/')
async def create_callback(new_callback: CallbackCreateSchema, background_tasks: BackgroundTasks, uow: UOWdep):
    logger.debug(f"POST /callback - New callback from {new_callback.fullname}")
    return await CallbackService.create_callback(data=new_callback, uow=uow, background_tasks=background_tasks)

@router.get('/')
async def get_callback(uow: UOWdep, admin: AdminDep, limit: int = 10, page: int = 1, ) -> List[CallbackSchema]:
    logger.debug(f"GET /callback - limit={limit}, page={page}")
    return await CallbackService.get_all(uow=uow, limit=limit, page=page)

@router.delete('/{callback_id}')
async def delete_callback(uow: UOWdep, admin: AdminDep, callback_id: int):
    logger.debug(f"DELETE /callback/{callback_id}")
    return await CallbackService.delete_callback(callback_id=callback_id, uow=uow)