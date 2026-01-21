from abc import ABC, abstractmethod
from typing import Type

from src.repository.callback import CallbackRepository
from src.repository.categories import CategoriesRepository
from src.repository.products import ProductsRepository
from src.repository.users import UsersRepository
from src.utils.connect import async_session_maker

class IUnitOfWork(ABC):

    categories: Type[CategoriesRepository]
    products: Type[ProductsRepository]
    callback: Type[CallbackRepository]
    users: Type[UsersRepository]

    @abstractmethod
    async def __aenter__(self):
        raise NotImplementedError()

    @abstractmethod
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        raise NotImplementedError()

    @abstractmethod
    async def commit(self):
        raise NotImplementedError()

    @abstractmethod
    async def rollback(self):
        raise NotImplementedError()


class UnitOfWork(IUnitOfWork):

    def __init__(self):
        self.session_factory = async_session_maker

    async def __aenter__(self):
        self.session = self.session_factory()
        self.categories = CategoriesRepository(self.session)
        self.products = ProductsRepository(self.session)
        self.callback = CallbackRepository(self.session)
        self.users = UsersRepository(self.session)

        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.session.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()




