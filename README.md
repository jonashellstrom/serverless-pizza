# Serverless Pizza 🍕

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Seeding the Store Table

- For convenience, you can seed the Store Table with some test data
- Using the AWS CLI, running the following in your terminal will get you set up with a store to place orders to

```bash
aws dynamodb put-item \
    --table-name store-table-dev \
    --item '{
        "storeId": {"S": "ouudJiBWJd0HQUafMVLvX"},
        "coordinates": {"M": {"latitude": {"N": "51.04900775883393"},"longitude": {"N": "-114.08263067482211"}}}
      }' \
    --return-consumed-capacity TOTAL
```
