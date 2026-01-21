from PIL.ImageChops import offset
from fastapi import BackgroundTasks, HTTPException
from loguru import logger
from src.utils.tg_sender import send_callback_notification
from src.schemas.callback import CallbackCreateSchema
from src.utils.unit_of_work import IUnitOfWork


class CallbackService:

    @staticmethod
    async def create_callback(data: CallbackCreateSchema, uow: IUnitOfWork, background_tasks: BackgroundTasks):
        logger.info(f"Creating new callback request for: {data.fullname}")
        async with uow:
            new_callback = await uow.callback.create(data)
            await uow.commit()
            logger.success(f"Callback saved to DB with ID: {new_callback.id}")
            background_tasks.add_task(send_callback_notification, new_callback)
            logger.info(f"Telegram notification task added for callback ID: {new_callback.id}")
            return new_callback

    @staticmethod
    async def get_all(uow: IUnitOfWork, limit: int = 10, page: int = 1):
        logger.info("Fetching all callback requests")
        async with uow:
            offset = page*limit if page not in (0,1) else 0
            result = await uow.callback.get_all(limit=limit, offset=offset)
            logger.info(f"Total callbacks found: {len(result)}")
            return result

    @staticmethod
    async def delete_callback(callback_id: int, uow: IUnitOfWork):
        logger.info(f"Request to delete callback ID: {callback_id}")
        async with uow:
            callback = await uow.callback.get_filter_by(id=callback_id)
            if not callback:
                logger.warning(f"Delete failed: Callback {callback_id} not found")
                raise HTTPException(status_code=404, detail="Callback not found")
            await uow.callback.delete(callback_id)
            await uow.commit()
            logger.success(f"Callback {callback_id} deleted successfully")
            return None