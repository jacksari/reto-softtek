import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "reto-softtek",
  frameworkVersion: "^4.0.0",
  // plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    region: "us-east-1",
    environment: {
      DYNAMO_TABLE: "CharacterWeather",
      OPENWEATHER_API_KEY: "3716efc2977e4736af393308252906",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*", "sns:*", "sqs:*", "events:*"],
            Resource: "*",
          },
        ],
      },
    },
  },
  functions: {
    GetFusionados: {
      handler: "src/infrastructure/http/handlers/GetFusionados.handler",
      timeout: 5,
      memorySize: 256,
      events: [
        {
          http: {
            method: "get",
            path: "fusionados",
          },
        },
      ],
    },
    GetHistory: {
      handler: "src/infrastructure/http/handlers/GetHistory.handler",
      timeout: 3,
      memorySize: 128,
      events: [
        {
          http: {
            method: "get",
            path: "historial",
          },
        },
      ],
    },
    storeCharacter: {
      handler: "src/infrastructure/http/handlers/PostCharacterHandler.handler",
      timeout: 3,
      memorySize: 128,
      events: [
        {
          http: {
            method: "post",
            path: "store-character",
          },
        },
      ],
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      target: "node20",
      platform: "node",
      external: [],
      // copyFiles: [{ from: "swagger/swagger.json", to: "swagger.json" }],
    },
  },
  resources: {
    Resources: {
      CharacterWeather: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "CharacterWeather",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
      CharacterTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "CharacterTable",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
