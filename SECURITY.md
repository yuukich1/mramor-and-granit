# Security Policy

## Supported Versions
We actively provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Security Features in this Project
Our architecture is designed with security best practices:
* **Authentication**: Stateless JWT-based auth with HS256 algorithm.
* **Password Safety**: Secure hashing using `passlib` (SHA-256).
* **Database Security**: Protection against SQL injection via SQLAlchemy ORM parameterized queries.
* **Environment Safety**: Critical credentials (TG tokens, Secret Keys) are managed strictly via `.env` files and are never committed to the repository.
* **Admin Access**: All destructive operations (CRUD for products/categories) require a valid Admin-level JWT.

## Reporting a Vulnerability
If you discover a security vulnerability, please do not open a public issue. Instead:
1. Contact the maintainers via Telegram: [@ultimap](https://t.me/ultimap) or [@Konaisya](https://t.me/Konaisya).
2. Provide a detailed description of the issue.
3. We will acknowledge your report within 48 hours.
