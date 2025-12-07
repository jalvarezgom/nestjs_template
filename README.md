# NestJS Archetype (Template) 🚀

A minimal, production-ready NestJS + TypeScript archetype that provides common building blocks and best practices for backend APIs. Use this repository as a starting point for new projects — it contains authentication, pagination, logging, providers, and example modules so you can move faster.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Key Features](#key-features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Environment variables (example)](#environment-variables-example)
- [Migrations](#migrations)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [License](#license)

---

## Key Features ✨

- Modular project structure with example module (`src/app_1`).
- TypeORM integration and migration support (see `migrations/`).
- Full JWT authentication: access + refresh tokens, strategies and guards.
- Role & permission management with decorators and guards.
- DTOs and validation using `class-validator` and `class-transformer`.
- Pagination utilities and a lightweight alternative (`pagination/` & `pagination-simple/`).
- Serialization helpers, interceptors and resource DTOs for consistent responses.
- Central providers: database, cache, logger and repository provider patterns.
- Logging via Winston with file rotation (configurable).
- Swagger-ready for automatic API docs.
- CLI / scheduled task examples (`tasks/` and `cli.ts`).
- Unit and e2e test examples (`test/`).
- Utility helpers (hashing, UUID, transforms).

## Requirements 📋

- Node.js (LTS recommended)
- pnpm

## Quick Start 🚀

1. Clone the repository:

    ```bash
    git clone https://github.com/your_username/nestjs_template.git
    cd nestjs_template
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Create a `.env` file (see example below) and run in development:

    ```bash
    pnpm run start:dev
    ```

    The server will run on http://localhost:3000 by default (check `src/main.ts`).

### Build & Run (production)

```bash
pnpm run build
node dist/main.js
```

## Environment variables (example)

Add a `.env` file at project root with the variables your environment requires. Example keys used in this template (names may vary depending on `src/config`):

```
DATABASE_URL=sqlite:dev.db
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=3600
JWT_REFRESH_EXPIRES_IN=604800
NODE_ENV=development
PORT=3000
```

Always review `src/config/configuration.ts` or `src/core/config` for the definitive variable names.

## Migrations

TypeORM migrations are placed in `migrations/`. Make sure your datasource configuration matches your environment before running migrations.

Example commands (adjust according to your TypeORM usage):

```bash
# run migrations (example, adjust command if you use typeorm CLI or a custom script)
pnpm run migration:run
```

## Project Structure

A high-level view of the main folders:

- `src/` - application source
  - `auth/` - authentication, strategies, guards, messages
  - `core/` - shared providers, pagination utilities, config and middleware
  - `app_1/` - example feature module
  - `tasks/` - scheduled tasks example
- `migrations/` - TypeORM migrations
- `test/` - tests (unit & e2e)

## Scripts

Typical scripts included in this template (check `package.json` for exact names):

- `start:dev` - start in development with hot reload
- `start:cli` - run CLI scripts
- `build` - compile TypeScript to `dist/`
- `start` - run compiled `dist/` in production
- `test` - run unit tests
- `test:e2e` - run end-to-end tests
- `lint` - run linter

## License 📄

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

Made with ♥ by Jancel
