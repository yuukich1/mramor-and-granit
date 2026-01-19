from fastapi import  FastAPI
from src.routes import *
app = FastAPI()

app.include_router(categories_router, prefix="/categories", tags=["categories"])
app.include_router(products_router, prefix="/products", tags=["products"])