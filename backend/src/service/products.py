import os
import shutil
from uuid import uuid4

from fastapi import UploadFile, HTTPException
from loguru import logger
from starlette.responses import FileResponse

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.products import ProductCreateSchemas, ProductUpdateSchemas
from src.utils.utils import clean_dict


class ProductsService:

    @staticmethod
    async def create(data: ProductCreateSchemas, uow: IUnitOfWork):
        logger.info(f"Creating new product: {data}")
        async with uow:
            new_product = await uow.products.create(data)
            await uow.commit()
            logger.success(f"Product created with ID: {new_product.id}")
            return new_product

    @staticmethod
    async def upload_image_by_product(product_id: int, file: UploadFile, uow: IUnitOfWork):
        logger.info(f"Uploading image for product ID: {product_id}")
        file_extension = file.filename.split(".")[-1]
        file_name = f"{uuid4()}.{file_extension}"
        file_path = f"static/products/{file_name}"
        os.makedirs("static/products/", exist_ok=True)
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            logger.info(f"File saved at {file_path}")
        except Exception as e:
            logger.error(f"Failed to save file: {e}")
            raise Exception("Ошибка при сохранении файла")

        async with uow:
            updated_product = await uow.products.update(
                entity_id=product_id,
                image_url=file_path.replace('static/products/', ""),
            )
            if not updated_product:
                if os.path.exists(file_path):
                    os.remove(file_path)
                logger.warning(f"Product {product_id} not found for image upload")
                raise HTTPException(status_code=404, detail="Product not found")

            await uow.commit()
            logger.success(f"Image linked to product {product_id}")
            return updated_product

    @staticmethod
    async def get_many_by_filters(uow: IUnitOfWork, limit: int = 10, page: int = 0, **filters):
        active_filters = clean_dict(filters)
        logger.info(f"Getting products with filters: {active_filters}")
        async with uow:
            offset = (page-1)*limit if page>1 else 0
            result = await uow.products.get_all(limit=limit, offset=offset, **active_filters)
            logger.info(f"Found {len(result)} products")
            return result

    @staticmethod
    async def get_one_by_filters(uow: IUnitOfWork, **filters):
        active_filters = clean_dict(filters)
        logger.info(f"Getting product with filters: {active_filters}")
        async with uow:
            result = await uow.products.get_filter_by(**active_filters)
            if result:
                logger.info(f"Product found: {result.id}")
                category = await uow.categories.get_filter_by(id=result.category_id)
                response_products = result.model_dump()
                if category:
                    response_products['category'] = category
                return response_products
            else:
                logger.warning(f"Product not found with filters: {active_filters}")
                raise HTTPException(status_code=404, detail="Product not found")

    @staticmethod
    async def get_file_path(image_name: str):
        file_path = f"static/products/{image_name}"
        if os.path.exists(file_path):
            return FileResponse(f"static/products/{image_name}")
        return None

    @staticmethod
    async def update(product_id: int, data: ProductUpdateSchemas, uow: IUnitOfWork):
        update_data = clean_dict(data.model_dump())
        logger.info(f"Updating product {product_id} with data: {update_data}")
        async with uow:
            new_category = await uow.products.update(entity_id=product_id, **update_data)
            if not new_category:
                logger.warning(f"Failed to update: Product {product_id} not found")
                raise HTTPException(status_code=404, detail="Product not found")

            await uow.commit()
            logger.success(f"Product {product_id} updated successfully")
            return new_category

    @staticmethod
    async def delete(product_id: int, uow: IUnitOfWork):
        logger.info(f"Request to delete product ID: {product_id}")
        async with uow:
            category = await uow.products.get_filter_by(id=product_id)
            if not category:
                logger.warning(f"Failed to update: Product {product_id} not found")
                raise HTTPException(status_code=404, detail="Product not found")
            await uow.products.delete(product_id)
            await uow.commit()
            logger.success(f"Product {product_id} deleted")
            return None