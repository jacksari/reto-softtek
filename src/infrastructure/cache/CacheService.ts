import { MergedCharacterWeather } from "@/domain/models/MergedCharacterWeather";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient());

export class CacheService {
  constructor(
    private readonly tableName = process.env.CHARACTER_WEATHER_TABLE ||
      "CharacterWeather"
  ) {}

  async get(personId: string): Promise<MergedCharacterWeather | null> {
    const result = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id: personId },
      })
    );

    if (!result.Item) return null;

    const item = result.Item;

    return MergedCharacterWeather.fromItem(item);
  }

  async set(
    personId: string,
    data: MergedCharacterWeather,
    ttlSeconds: number
  ): Promise<void> {
    const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;

    await client.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id: personId },
        UpdateExpression: `
          SET characterName = :name,
              planet = :planet,
              temperature = :temp,
              weatherDescription = :desc,
              humidity = :humidity,
              #ts = :timestamp,
              expiresAt = :ttl
        `,
        ExpressionAttributeValues: {
          ":name": data.characterName,
          ":planet": data.planet,
          ":temp": data.temperature,
          ":desc": data.weatherDescription,
          ":humidity": data.humidity,
          ":timestamp": data.timestamp.toISOString(),
          ":ttl": expiresAt,
        },
        ExpressionAttributeNames: {
          "#ts": "timestamp",
        },
      })
    );
  }
}
