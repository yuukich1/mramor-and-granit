import os
import sys
from loguru import logger
from dotenv import load_dotenv

load_dotenv()

class DatabaseConfig:
    DATABASE_URL = os.getenv("DATABASE_URL")


logger.remove()

logger.add(sys.stdout, level="INFO", format="{time} - {level} - {message}")
logger.add("logs/app.log", rotation="10 MB", level="DEBUG", format="{time} - {level} - {message}")