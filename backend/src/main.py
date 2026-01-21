from fastapi import  FastAPI
from loguru import logger
from src.routes import *

app = FastAPI()

logger.info("Initializing FastAPI application")

app.include_router(categories_router, prefix="/categories", tags=["categories"])
logger.debug("Categories router included")

app.include_router(products_router, prefix="/products", tags=["products"])
logger.debug("Products router included")

app.include_router(callback_router, prefix="/callback", tags=["callback"])
logger.debug("Callback router included")

app.include_router(auth_router, prefix="/auth", tags=["auth"])
logger.debug("Auth router included")

logger.info("FastAPI application initialized successfully")


@app.on_event("startup")
async def startup_event():
    logger.info("Application startup - API is ready to accept requests")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutdown")