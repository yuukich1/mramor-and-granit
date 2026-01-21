from aiogram import Bot
from loguru import logger

from src.config import TGConfig
from src.schemas.callback import CallbackSchema

bot = Bot(token=TGConfig.TG_API_KEY)


async def send_callback_notification(callback_info: CallbackSchema):
    logger.info(f"Отправка уведомления в Telegram для {callback_info.fullname}")
    text = (
        f'<b>📞 Заказан звонок!</b>\n\n'
        f"👤 <b>Имя:</b> {callback_info.fullname}\n"
        f"📱 <b>Номер:</b> <code>{callback_info.phone.replace('tel:', '')}</code>\n"
        f"💬 <b>Сообщение:</b> {callback_info.message or '<i>(отсутствует)</i>'}"
    )
    try:
        await bot.send_message(
            chat_id=TGConfig.ADMIN_ID,
            text=text,
            parse_mode="HTML"
        )
        logger.success(f"Уведомление для {callback_info.fullname} успешно доставлено админу {TGConfig.ADMIN_ID}")
    except Exception as e:
        logger.error(f"Ошибка при отправке уведомления в Telegram: {e}")