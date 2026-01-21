from abc import ABC, abstractmethod
from sqlalchemy import select, insert, update, delete
from typing import Type
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, OperationalError, ProgrammingError
from src.models import BaseSQLModels

class AbstractRepository(ABC):

    @abstractmethod
    async def create(self, entity):
        raise NotImplementedError()

    @abstractmethod
    async def get_all(self, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    async def get_filter_by(self, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    async def update(self, entity_id: int, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    async def delete(self, entity):
        raise NotImplementedError()


class SQLAlchemyRepository(AbstractRepository):

    entity: Type[BaseSQLModels]

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def _execute(self, stmt):
        try:
            result = await self.session.execute(stmt)
            return result

        except IntegrityError as e:
            await self.session.rollback()

            orig = e.orig
            pg_error_code = getattr(orig, "pgcode", None) or getattr(orig, "sqlstate", None)
            detail = str(orig)
            if hasattr(orig, "diag"):
                detail = getattr(orig.diag, "message_detail", detail)
            elif hasattr(orig, "detail"):
                detail = orig.detail

            context = f"Repository: {self.entity.__name__}"

            if pg_error_code == "23505":
                logger.warning(f"[{context}] Unique constraint violation: {detail}")
                raise Exception(f"Ошибка уникальности: {detail}")

            elif pg_error_code == "23503":
                logger.warning(f"[{context}] Foreign key violation: {detail}")
                raise Exception("Ошибка связи: Указанный связанный объект не существует (Foreign Key).")

            elif pg_error_code == "23502":
                col = "unknown"
                if hasattr(orig, "diag"):
                    col = getattr(orig.diag, "column_name", col)
                elif hasattr(orig, "column_name"):
                    col = orig.column_name

                logger.warning(f"[{context}] Not null violation on column: {col}")
                raise Exception(f"Ошибка данных: Поле '{col}' не может быть пустым.")

            logger.error(f"[{context}] Integrity error: {e}")
            raise Exception(f"Нарушение целостности БД: {detail}")

        except OperationalError as e:
            await self.session.rollback()
            logger.critical(f"Database connection error: {e}")
            raise Exception("База данных временно недоступна.")

        except ProgrammingError as e:
            await self.session.rollback()
            logger.error(f"SQL Syntax error in {self.entity.__name__}: {e}")
            raise Exception(f"Критическая ошибка синтаксиса SQL.")

        except SQLAlchemyError as e:
            await self.session.rollback()
            logger.exception(f"Unexpected SQLAlchemy error")
            raise Exception(f"Непредвиденная ошибка базы данных.")

    async def create(self, entity):
        stmt = insert(self.entity).values(**entity.__dict__).returning(self.entity)
        result = await self._execute(stmt)
        entity = result.scalars().first()
        return entity.to_schemas()

    async def get_all(self, limit: int = None, offset: int = None, **kwargs):
        stmt = select(self.entity).filter_by(**kwargs)
        if limit is not None:
            stmt = stmt.limit(limit)
        if offset is not None:
            stmt = stmt.offset(offset)
        result = await self._execute(stmt)
        return [entity.to_schemas() for entity in result.scalars().all()]

    async def get_filter_by(self, **kwargs):
        stmt = select(self.entity).filter_by(**kwargs)
        result = await self._execute(stmt)
        entity = result.scalar_one_or_none()
        return entity.to_schemas() if entity else None

    async def update(self, entity_id: int, **kwargs):
        stmt = update(self.entity).filter_by(id=entity_id).values(**kwargs).returning(self.entity)
        result = await self._execute(stmt)
        entity = result.scalar_one_or_none()
        return entity.to_schemas() if entity else None

    async def delete(self, entity_id: int):
        stmt = delete(self.entity).filter_by(id=entity_id)
        result = await self._execute(stmt)

