import os
import sys
from datetime import timedelta

from fastapi.security import OAuth2PasswordBearer
from loguru import logger
from dotenv import load_dotenv
from passlib.context import CryptContext


load_dotenv()

class DatabaseConfig:
    DATABASE_URL = os.getenv("DATABASE_URL")

class TGConfig:
    TG_API_KEY = os.getenv("TG_API_KEY")
    ADMIN_ID = os.getenv("ADMIN_ID")

class SecurityConfig:
    secret_key = os.getenv('SECRET_KEY', 'supersecretkeydefault')
    algorithm = os.getenv('ALGORITHM', 'HS256')
    exp = timedelta(hours=2)
    exp_refresh = timedelta(days=7)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")


def setup_logging():
    """Configure logging with both console and file outputs."""
    logger.remove()
    
    # Console output with color
    logger.add(
        sys.stdout,
        level="INFO",
        format="<level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
    )
    
    # File output with detailed information
    logger.add(
        "logs/app.log",
        rotation="10 MB",
        retention="7 days",
        level="DEBUG",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}"
    )
    
    # Errors to separate file
    logger.add(
        "logs/errors.log",
        rotation="10 MB",
        retention="30 days",
        level="ERROR",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}"
    )


setup_logging()