# Serverless Pizza 🍕

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy the project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM 📦

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy the stack to AWS

### Using Yarn 🧶

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy the stack to AWS

## Seeding the Store Table

- For convenience, you can seed the Store Table with some test data
- Using the AWS CLI, running the following command will get you set up with a store to place orders to

```bash
aws dynamodb put-item \
    --table-name store-table-dev \
    --item '{
        "storeId": {"S": "ouudJiBWJd0HQUafMVLvX"},
        "coordinates": {"M": {"latitude": {"N": "51.04900775883393"},"longitude": {"N": "-114.08263067482211"}}}
      }' \
    --return-consumed-capacity TOTAL
```

## Using the Directions Service

- The Directions Service uses the [openrouteservice](https://openrouteservice.org) API to retrieve directions and delivery ETAs.
- In order to use it, you need to provide your own API key and host it on the AWS SSM Parameter Store (encrypted using a KMS key).
  - The SSM Parameter Name should be stored in the `OPENROUTE_API_KEY_SSM_NAME` environment variable.
  - The KMS Key ID should be stored in the `KMS_KEY_ID` environment variable.

## Endpoints

These endpoints provide functionality to create new orders, track the status of an existing order and adding a tip to an existing order.

- [Place New Order](docs/rest-api/place-order.md) : `POST /order/`
