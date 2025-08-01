## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```
POSTGRES_PASSWORD=postgres
```

These variables are used to connect to the PostgreSQL database.

## Running the Application with Docker

To run the application using Docker, make sure you have Docker and Docker Compose installed. Then, run the following command:

```bash
docker-compose up -d
```

This will start the NestJS application and a PostgreSQL database in detached mode. The application will be available at `http://localhost:3000`.

## Running the Application Locally

To run the application in development mode, use the following command:

```bash
npm run start:dev
```

This will start the application with hot-reloading enabled.

### Other Scripts

- `npm run build`: Builds the application for production.
- `npm start`: Starts the application in production mode.
- `npm run lint`: Lints the codebase.
- `npm test`: Runs the test suite.
