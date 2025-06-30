import { APIGatewayProxyHandler } from "aws-lambda";
import { PostCharacterController } from "../controllers/PostCharacterController";

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  return await PostCharacterController.execute(body);
};
