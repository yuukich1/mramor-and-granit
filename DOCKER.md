# Docker Setup Guide / Гайд по запуску в Docker

## English

### Prerequisites
- Docker (version 20.10+)
- Docker Compose (version 2.0+)

### Quick Start

1. **Clone environment variables:**
   ```bash
   cp .env.docker .env.local
   ```

2. **Build and start containers:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

4. **Access applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

5. **Stop containers:**
   ```bash
   docker-compose down
   ```

### Common Commands

```bash
# Rebuild containers
docker-compose build

# Rebuild specific service
docker-compose build backend

# Run commands in container
docker-compose exec backend bash
docker-compose exec frontend bash

# Remove volumes (including database)
docker-compose down -v

# Restart services
docker-compose restart
```

### Database Migrations

If your project uses migrations:
```bash
docker-compose exec backend alembic upgrade head
```

---

## Русский

### Предварительные требования
- Docker (версия 20.10+)
- Docker Compose (версия 2.0+)

### Быстрый старт

1. **Скопируйте переменные окружения:**
   ```bash
   cp .env.docker .env.local
   ```

2. **Построите и запустите контейнеры:**
   ```bash
   docker-compose up -d
   ```

3. **Просмотрите логи:**
   ```bash
   # Все сервисы
   docker-compose logs -f

   # Конкретный сервис
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

4. **Доступ к приложениям:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Документация API: http://localhost:8000/docs

5. **Остановите контейнеры:**
   ```bash
   docker-compose down
   ```

### Часто используемые команды

```bash
# Пересборка контейнеров
docker-compose build

# Пересборка конкретного сервиса
docker-compose build backend

# Выполнение команд в контейнере
docker-compose exec backend bash
docker-compose exec frontend bash

# Удаление volumes (включая базу данных)
docker-compose down -v

# Перезагрузка сервисов
docker-compose restart
```

### Миграции базы данных

Если ваш проект использует миграции:
```bash
docker-compose exec backend alembic upgrade head
```
