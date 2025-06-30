import { APIGatewayProxyHandler } from "aws-lambda";
import { GetFusionController } from "../controllers/GetFusionController";

export const handler: APIGatewayProxyHandler = async (event) => {
  const personId = event.queryStringParameters?.personId || "";
  return GetFusionController.execute(personId);
};
