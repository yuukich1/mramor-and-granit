from fastapi import  FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
from src.routes import *
from src.config import frontend_host
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_host,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    FastAPICache.init(InMemoryBackend())


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutdown")


