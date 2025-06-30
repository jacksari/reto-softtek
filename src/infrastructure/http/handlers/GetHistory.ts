import { APIGatewayProxyHandler } from "aws-lambda";
import { GetHistoryController } from "../controllers/GetHistoryController";

export const handler: APIGatewayProxyHandler = async (event) => {
  const limit = parseInt(event.queryStringParameters?.limit || "10");
  const lastKey = event.queryStringParameters?.lastKey;

  return GetHistoryController.execute(limit, lastKey);
};
