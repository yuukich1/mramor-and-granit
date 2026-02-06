from typing import List
from fastapi import APIRouter
from fastapi_cache.decorator import cache
from loguru import logger
from src.service.categories import CategoriesService
from src.dependencies import UOWdep, AdminDep
from src.schemas.categories import CategoryCreateSchemas, CategorySchemas, CategoryUpdateSchemas

router = APIRouter()

@router.post('/')
async def create(data: CategoryCreateSchemas, uow: UOWdep, admin: AdminDep) -> CategorySchemas:
    logger.debug(f"POST /categories - Creating category: {data.name}")
    return await CategoriesService.create(data, uow)

@cache(expire=3600)
@router.get('/')
async def get_categories_by_filter(uow: UOWdep, name: str | None = None, id: int | None= None) -> List[CategorySchemas]:
    logger.debug(f"GET /categories - Filters: name={name}, id={id}")
    return await CategoriesService.get_many_by_filter(uow=uow, name=name, id=id)

@router.get('/{category_id}')
async def get_category(uow: UOWdep, category_id: int) -> CategorySchemas:
    logger.debug(f"GET /categories/{category_id}")
    return await CategoriesService.get_one_by_filter(uow=uow, id=category_id)

@router.put('/{category_id}')
async def update(data: CategoryUpdateSchemas, uow: UOWdep, admin: AdminDep, category_id: int) -> CategorySchemas:
    logger.debug(f"PUT /categories/{category_id} - Update data: {data.name}")
    return await CategoriesService.update(category_id, data, uow=uow)

@router.delete('/{category_id}')
async def delete(uow: UOWdep, admin: AdminDep, category_id: int):
    logger.debug(f"DELETE /categories/{category_id}")
    return await CategoriesService.delete(category_id, uow=uow)

