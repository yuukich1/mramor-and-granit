# Docker Setup Guide 🐳

Complete guide for running Mramor and Granit with Docker and Docker Compose.

## Prerequisites

- **Docker** (version 20.10+) - [Installation Guide](https://docs.docker.com/get-docker/)
- **Docker Compose** (version 2.0+) - [Installation Guide](https://docs.docker.com/compose/install/)
- 4GB+ RAM available for containers
- 2GB+ disk space for images and volumes

## Project Structure

```
mramor-and-granit/
├── docker-compose.yml          # Service orchestration
├── backend/
│   ├── Dockerfile              # Backend container image
│   └── src/                    # Application code
├── frontend/
│   ├── Dockerfile              # Frontend container image
│   └── src/                    # Application code
└── .env                        # Environment variables (create from .env.example)
```

## Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd mramor-and-granit
```

### 2. Configure Environment

Create `.env` file in the root directory:

```bash
# Database
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/mramor_db

# Security
SECRET_KEY=your_super_secret_key_change_in_production
ALGORITHM=HS256

# Telegram
TG_API_KEY=your_telegram_bot_token
ADMIN_ID=your_telegram_admin_id

# Frontend
FRONTEND_HOST=http://localhost:3000
```

### 3. Build and Start Services

```bash
# Build images and start all services
docker-compose up --build

# Or start in background
docker-compose up -d --build
```

### 4. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **API Docs (ReDoc)**: http://localhost:8000/redoc
- **Database**: PostgreSQL at localhost:5432

### 5. Verify Services

```bash
# Check running containers
docker-compose ps

# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### 6. Stop Services

```bash
# Stop containers (data preserved)
docker-compose down

# Stop and remove volumes (removes database)
docker-compose down -v
```

## Common Docker Commands

### Service Management

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart backend

# View status
docker-compose ps
```

### Container Operations

```bash
# Execute command in backend container
docker-compose exec backend bash

# Execute command in frontend container
docker-compose exec frontend bash

# Execute command in database container
docker-compose exec db psql -U postgres

# View container logs
docker-compose logs backend
docker-compose logs -f backend  # Follow logs

# View last 100 lines
docker-compose logs --tail=100 backend
```

### Building & Rebuilding

```bash
# Rebuild all images
docker-compose build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Build without using cache
docker-compose build --no-cache
```

### Database Operations

```bash
# Connect to PostgreSQL
docker-compose exec db psql -U postgres -d mramor_db

# Run SQL query
docker-compose exec db psql -U postgres -d mramor_db -c "SELECT * FROM products;"

# Backup database
docker-compose exec db pg_dump -U postgres mramor_db > backup.sql

# Restore database
cat backup.sql | docker-compose exec -T db psql -U postgres -d mramor_db
```

## Service Configuration

### Backend Container

- **Image**: Python 3.14 slim
- **Port**: 8000
- **Volume**: `./backend:/app` (code)
- **Environment**: Loaded from `.env`
- **Health Check**: FastAPI `/docs` endpoint
- **Dependencies**: PostgreSQL database

### Frontend Container

- **Image**: Node.js 20 LTS
- **Port**: 3000
- **Volume**: `./frontend:/app` (code)
- **Environment**: Loaded from `.env`
- **Dependencies**: Backend API

### Database Container

- **Image**: PostgreSQL 15
- **Port**: 5432
- **Volume**: `mramor_db_data` (persistent storage)
- **User**: postgres
- **Database**: mramor_db
- **Root Password**: postgres (change in production!)

## Development Workflow

### Live Code Changes

Both containers have volumes mounted, so code changes are reflected immediately:

**Backend Changes:**
```bash
# Changes in backend/src/ are automatically picked up
# Uvicorn will auto-reload on file changes
```

**Frontend Changes:**
```bash
# Changes in frontend/src/ trigger Next.js hot module replacement
# Browser automatically refreshes
```

### Debugging

#### View Application Logs

```bash
# Follow backend logs in real-time
docker-compose logs -f backend

# Search for errors
docker-compose logs backend | grep ERROR

# Get last 50 lines
docker-compose logs --tail=50 backend
```

#### Database Debugging

```bash
# Connect to database and run queries
docker-compose exec db psql -U postgres -d mramor_db

# List tables
\dt

# Describe table
\d products

# Run query
SELECT * FROM products LIMIT 5;

# Exit
\q
```

#### Container Inspection

```bash
# View container stats (CPU, memory, network)
docker stats

# Inspect container details
docker inspect mramor-backend

# View environment variables
docker inspect mramor-backend | grep Env
```

## Troubleshooting

### Port Already in Use

If ports 3000, 8000, or 5432 are already in use:

```bash
# Find process using port
lsof -i :3000
lsof -i :8000
lsof -i :5432

# Kill process (if needed)
kill -9 <PID>
```

Or modify `docker-compose.yml` to use different ports:
```yaml
backend:
  ports:
    - "8001:8000"  # Change 8000 to 8001

frontend:
  ports:
    - "3001:3000"  # Change 3000 to 3001
```

### Container Fails to Start

```bash
# Check logs
docker-compose logs backend

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up

# Check disk space
docker system df
```

### Database Connection Issues

```bash
# Test database connectivity
docker-compose exec backend bash
python -c "import asyncpg; print('asyncpg installed')"

# Check if database is running
docker-compose ps db

# Restart database
docker-compose restart db

# View database logs
docker-compose logs db
```

### Image Build Failures

```bash
# Clear build cache
docker system prune -a

# Rebuild with detailed output
docker-compose build --no-cache --verbose backend

# Check Docker disk usage
docker system df

# Remove unused images
docker image prune -a
```

### Memory Issues

If containers are using too much memory:

```bash
# Check resource usage
docker stats

# Limit memory in docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
```

## Production Deployment

### Pre-Deployment Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `TG_API_KEY` and `ADMIN_ID` for Telegram
- [ ] Update `FRONTEND_HOST` to production domain
- [ ] Set `DATABASE_URL` to production database
- [ ] Review security settings in `.env`
- [ ] Test all endpoints on staging

### Production Setup

1. **Update docker-compose.yml**:
   ```yaml
   backend:
     restart: always
     deploy:
       resources:
         limits:
           memory: 2G
   
   frontend:
     restart: always
   
   db:
     restart: always
     volumes:
       - db_data:/var/lib/postgresql/data
   ```

2. **Set environment**:
   ```bash
   # Use production environment
   cp .env.production .env
   ```

3. **Start services**:
   ```bash
   docker-compose up -d

   # Verify all services started
   docker-compose ps
   ```

4. **Enable auto-restart**:
   ```bash
   # Services will automatically restart on failure
   # Already configured with restart: always
   ```

### Monitoring

```bash
# Monitor resource usage
docker stats --no-stream

# View application logs
docker-compose logs --tail=100 -f backend

# Check service health
docker-compose exec backend curl http://localhost:8000/docs
```

### Backups

```bash
# Backup database
docker-compose exec db pg_dump -U postgres mramor_db | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Backup volumes
docker run --rm -v mramor_db_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/db_backup.tar.gz /data

# Automated daily backup (add to crontab)
0 2 * * * cd /path/to/mramor-and-granit && docker-compose exec -T db pg_dump -U postgres mramor_db | gzip > backup_$(date +\%Y\%m\%d).sql.gz
```

## Docker Compose File Reference

Key services in `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:          # FastAPI application
  frontend:         # Next.js application
  db:              # PostgreSQL database

volumes:
  db_data:         # Persistent database storage

networks:
  default:         # Internal service communication
```

Services communicate using service names:
- Backend: `http://db:5432` (database)
- Frontend: `http://backend:8000` (API)

## Advanced Usage

### Custom Network

```bash
# Create custom network
docker network create mramor-network

# Connect container to network
docker network connect mramor-network container_name
```

### Multi-Stage Builds

Frontend uses multi-stage build for optimized images:
```dockerfile
# Build stage
FROM node:20 AS builder
...

# Production stage
FROM node:20-alpine
...
```

### Health Checks

Services include health checks:
```bash
# View health status
docker-compose ps

# Check specific service health
docker inspect --format='{{json .State.Health}}' mramor-backend
```

## Cleanup

### Remove Unused Resources

```bash
# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Remove everything (⚠️ be careful)
docker system prune -a --volumes
```

### Full Reset

```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Remove all images
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## Related Documentation

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Main README](README.md) - Project overview and setup
- [API Documentation](http://localhost:8000/docs) - Interactive API docs

## Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Review troubleshooting section above
- Contact: [@ultimap](https://t.me/ultimap)
