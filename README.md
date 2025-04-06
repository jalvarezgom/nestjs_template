
# NestJS Template 🚀

This project is a template for applications built with NestJS, TypeORM, and Prisma. It provides a basic structure for developing robust and scalable applications in TypeScript.

## Features ✨

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript that allows easy interaction with databases.
- **JWT Authentication**: Implementation of authentication based on JSON Web Tokens.
- **Validation and Transformation**: Use of `class-validator` and `class-transformer` to validate and transform data.
- **Pagination**: Built-in pagination support for easy data management.
- **Swagger**: Automatic API documentation with Swagger.
- **Winston**: Logging with Winston and daily file rotation.

## Requirements 📋

- Node.js
- pnpm

## Installation 🛠️

1. Clone the repository:
    ```bash
    git clone https://github.com/your_username/nestjs_template.git
    ```
2. Navigate to the project directory:
    ```bash
    cd nestjs_template
    ```
3. Install the dependencies:
    ```bash
    pnpm install
    ```

## Usage 🚀

To start the development server, run:
```bash
pnpm run start:dev
```
The server will be available at http://localhost:3000.

## Project Structure 🗂️

- `src/`: Application source code.
    - `app_1/`: Example module.
        - `services/`: Module services.
        - `entities/`: Module entities.
        - `repositories/`: Module repositories.
        - `interfaces/`: Module interfaces.
    - `core/`: Core code and utilities.
        - `config/`: Configuration files.
        - `pagination/`: Pagination services and utilities.
        - `pagination-simple/`: Simple pagination services.
        - `providers/`: Core providers like database connection, logger, etc.
        - `utils/`: Utility functions.
- `test/`: Project tests.

## Contribution 🤝

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License 📄

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Developed with ❤️ by Jancel