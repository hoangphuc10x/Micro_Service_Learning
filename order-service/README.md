# Order Service (GraphQL + Kafka)

This NestJS service exposes a GraphQL API for creating and reading orders, and produces `order_created` events to Kafka so other microservices can react to new orders.

### Stack

- NestJS 11 + Apollo GraphQL (code-first)
- Kafka producer (via `@nestjs/microservices` + `kafkajs`)
- PostgreSQL + TypeORM migrations

### Scripts

```bash
npm install                   # install dependencies
npm run start:dev             # dev mode http://localhost:4003/graphql
npm run build                 # compile to dist
npm run test                  # placeholder Nest test target
npm run migration:run         # apply latest migrations
npm run migration:revert      # rollback latest migration
# generate: npm run migration:generate --name add-new-column
```

### Environment

Create `.env`:

```dotenv
PORT=4003
KAFKA_BROKER=localhost:9092
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=microservices
```

### GraphQL Usage

- Query all orders:

  ```graphql
  query Orders {
    orders {
      id
      total
      status
    }
  }
  ```

- Create a new order (and emit `order_created`):
  ```graphql
  mutation CreateOrder {
    createOrder(
      input: {
        userId: 1
        total: 149.99
        items: ["course", "support"]
        status: "PENDING"
      }
    ) {
      id
      createdAt
    }
  }
  ```

Every successful mutation pushes the payload to Kafka, so consumers (e.g., task-service) can subscribe with `@MessagePattern('order_created')`.

### Migrations

```bash
npm run migration:run
npm run migration:revert
npm run migration:generate --name meaningful-change
```

Migrations rely on the same `.env` database credentials; ensure PostgreSQL is running (see root `docker-compose.yml`).
