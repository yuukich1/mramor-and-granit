from typing import List
from fastapi import APIRouter, UploadFile
from fastapi_cache.decorator import cache
from loguru import logger
from starlette.responses import FileResponse
from src.schemas.products import ProductCreateSchemas, ProductSchema, ProductWithCategorySchema, ProductUpdateSchemas
from src.dependencies import UOWdep, AdminDep
from src.service.products import ProductsService

router = APIRouter()

@router.post('/')
async def create(data: ProductCreateSchemas, uow: UOWdep, admin: AdminDep) -> ProductSchema:
    logger.debug(f"POST /products - Creating product: {data.name}")
    return await ProductsService.create(data, uow)

@router.patch('/image/{id}')
async def update(id: int, file: UploadFile, uow: UOWdep, admin: AdminDep) -> ProductSchema:
    logger.debug(f"PATCH /products/image/{id} - Uploading file: {file.filename}")
    return await ProductsService.upload_image_by_product(product_id=id, file=file, uow=uow)

@cache(expire=3600)
@router.get('/')
async def get_products_by_filter(uow: UOWdep, limit: int = 20, page: int = 0, name: str | None = None, id: int | None= None, price: float | None = None) -> List[ProductSchema]:
    logger.debug(f"GET /products - Filters: name={name}, id={id}, price={price}, limit={limit}, page={page}")
    return await ProductsService.get_many_by_filters(uow=uow, limit=limit, page=page, name=name, id=id, price=price)

@router.get('/{product_id}')
async def get_product(product_id: int, uow: UOWdep) -> ProductWithCategorySchema | ProductSchema:
    logger.debug(f"GET /products/{product_id}")
    return await ProductsService.get_one_by_filters(uow=uow, id=product_id)

@router.get('/image/{image}')
async def get_product_image(image: str) -> FileResponse:
    logger.debug(f"GET /products/image/{image}")
    return await ProductsService.get_file_path(image)

@router.put('/{product_id}')
async def update_products(product_id: int, data: ProductUpdateSchemas, uow: UOWdep, admin: AdminDep) -> ProductSchema:
    logger.debug(f"PUT /products/{product_id} - Update data")
    return await ProductsService.update(product_id, data, uow=uow)

@router.delete('/{product_id}')
async def delete_product(product_id: int, uow: UOWdep, admin: AdminDep):
    logger.debug(f"DELETE /products/{product_id}")
    return await ProductsService.delete(product_id, uow=uow)