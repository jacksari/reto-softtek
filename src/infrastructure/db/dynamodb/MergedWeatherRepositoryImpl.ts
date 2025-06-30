import { MergedCharacterWeather } from "@/domain/models/MergedCharacterWeather";
import { MergedWeatherRepository } from "@/domain/repositories/MergedCharacterWeatherRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export class MergedWeatherRepositoryImpl implements MergedWeatherRepository {
  private readonly tableName = process.env.DYNAMO_TABLE!;

  async save(data: MergedCharacterWeather): Promise<void> {
    const rawItem = {
      id: data.id,
      characterName: data.characterName,
      planet: data.planet,
      temperature: data.temperature,
      weatherDescription: data.weatherDescription,
      humidity: data.humidity,
      timestamp: data.timestamp.toISOString(),
    };

    const item = this.cleanObject(rawItem);

    await client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
      })
    );
  }

  async getAllPaginated(limit: number, lastKey?: string) {

    const params: ScanCommandInput = {
      TableName: this.tableName,
      Limit: limit,
    };

    if (lastKey) {
      params.ExclusiveStartKey = { id: lastKey };
    }

    const result = await client.send(new ScanCommand(params));

    console.log("result", result.Items);
    console.log("key", result.LastEvaluatedKey);

    const items = (result.Items || []).map((item) =>
      MergedCharacterWeather.fromItem(item)
    );
    //   .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const itemsLen = items.length;

    return {
      items,
      lastKey: itemsLen > 0 ? items[itemsLen - 1].id : undefined,
    };
  }

  cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  }
}
