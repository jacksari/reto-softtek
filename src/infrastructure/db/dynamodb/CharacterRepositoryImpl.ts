import { Character } from "@/domain/entities/Character";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export class CharacterRepositoryImpl implements CharacterRepository {
  private readonly tableName = process.env.CHARACTER_TABLE || "CharacterTable";

  async save(character: Character): Promise<void> {
    await client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: character.toItem(),
      })
    );
  }
}
