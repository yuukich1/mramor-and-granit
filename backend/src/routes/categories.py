from typing import List
from fastapi import APIRouter
from src.service.categories import CategoriesService
from src.dependencies import UOWdep
from src.schemas.categories import CategoryCreateSchemas, CategorySchemas, CategoryUpdateSchemas

router = APIRouter()

@router.post('/')
async def create(data: CategoryCreateSchemas, uow: UOWdep) -> CategorySchemas:
    return await CategoriesService.create(data, uow)

@router.get('/')
async def get_categories_by_filter(uow: UOWdep, name: str | None = None, id: int | None= None) -> List[CategorySchemas]:
    return await CategoriesService.get_many_by_filter(uow=uow, name=name, id=id)

@router.get('/{category_id}')
async def get_category(uow: UOWdep, category_id: int) -> CategorySchemas:
    return await CategoriesService.get_one_by_filter(uow=uow, id=category_id)

@router.put('/{category_id}')
async def update(data: CategoryUpdateSchemas, uow: UOWdep, category_id: int) -> CategorySchemas:
    return await CategoriesService.update(category_id, data, uow=uow)

@router.delete('/{category_id}')
async def delete(uow: UOWdep, category_id: int):
    return await CategoriesService.delete(category_id, uow=uow)

