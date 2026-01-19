from fastapi import HTTPException
from src.utils.unit_of_work import IUnitOfWork
from src.schemas.categories import CategoryCreateSchemas, CategoryUpdateSchemas
from src.utils.utils import clean_dict
from loguru import logger


class CategoriesService:

    @staticmethod
    async def create(data: CategoryCreateSchemas, uow: IUnitOfWork):
        logger.info(f"Creating new category: {data}")
        async with uow:
            new_category = await uow.categories.create(data)
            await uow.commit()
            logger.success(f"Category created with ID: {new_category.id}")
            return new_category

    @staticmethod
    async def get_many_by_filter(uow: IUnitOfWork, **filters):
        active_filters = clean_dict(filters)
        logger.info(f"Getting categories with filters: {active_filters}")
        async with uow:
            result = await uow.categories.get_all(**active_filters)
            logger.info(f"Found {len(result)} categories")
            return result

    @staticmethod
    async def get_one_by_filter(uow: IUnitOfWork, **filters):
        active_filters = clean_dict(filters)
        logger.info(f"Searching for one category with filters: {active_filters}")
        async with uow:
            result = await uow.categories.get_filter_by(**active_filters)
            if result:
                logger.info(f"Category found: {result.id}")
                return result
            else:
                logger.warning(f"Category not found with filters: {active_filters}")
                raise HTTPException(status_code=404, detail="Category not found")

    @staticmethod
    async def update(category_id: int, data: CategoryUpdateSchemas, uow: IUnitOfWork):
        update_data = clean_dict(data.model_dump())
        logger.info(f"Updating category {category_id} with data: {update_data}")
        async with uow:
            new_category = await uow.categories.update(entity_id=category_id, **update_data)
            if not new_category:
                logger.warning(f"Failed to update: Category {category_id} not found")
                raise HTTPException(status_code=404, detail="Category not found")

            await uow.commit()
            logger.success(f"Category {category_id} updated successfully")
            return new_category

    @staticmethod
    async def delete(category_id: int, uow: IUnitOfWork):
        logger.info(f"Request to delete category ID: {category_id}")
        async with uow:
            category = await uow.categories.get_filter_by(id=category_id)
            if not category:
                logger.warning(f"Failed to update: Category {category_id} not found")
                raise HTTPException(status_code=404, detail="Category not found")
            await uow.categories.delete(category_id)
            await uow.commit()
            logger.success(f"Category {category_id} deleted")
            return None