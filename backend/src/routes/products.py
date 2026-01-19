from typing import List
from fastapi import APIRouter, UploadFile
from starlette.responses import FileResponse
from src.schemas.products import ProductCreateSchemas, ProductSchema, ProductWithCategorySchema, ProductUpdateSchemas
from src.dependencies import UOWdep
from src.service.products import ProductsService

router = APIRouter()

@router.post('/')
async def create(data: ProductCreateSchemas, uow: UOWdep) -> ProductSchema:
    return await ProductsService.create(data, uow)

@router.patch('/image/{id}')
async def update(id: int, file: UploadFile, uow: UOWdep) -> ProductSchema:
    return await ProductsService.upload_image_by_product(product_id=id, file=file, uow=uow)

@router.get('/')
async def get_products_by_filter(uow: UOWdep, name: str | None = None, id: int | None= None, price: float | None = None) -> List[ProductSchema]:
    return await ProductsService.get_many_by_filters(uow=uow, name=name, id=id, price=price)

@router.get('/{product_id}')
async def get_product(product_id: int, uow: UOWdep) -> ProductWithCategorySchema | ProductSchema:
    return await ProductsService.get_one_by_filters(uow=uow, id=product_id)

@router.get('/image/{image}')
async def get_product_image(image: str) -> FileResponse:
    return await ProductsService.get_file_path(image)

@router.put('/{product_id}')
async def update_products(product_id: int, data: ProductUpdateSchemas, uow: UOWdep) -> ProductSchema:
    return await ProductsService.update(product_id, data, uow=uow)

@router.delete('/{product_id}')
async def delete_product(product_id: int, uow: UOWdep):
    return await ProductsService.delete(product_id, uow=uow)