import { Character } from "../../domain/entities/Character";

export class SwapiClient {
  constructor(private readonly baseUrl = "https://swapi.info/api") {}

  async getCharacter(id: string): Promise<Character> {
    const response = await fetch(`${this.baseUrl}/people/${id}/`);

    if (!response.ok) {
      throw new Error(`SWAPI error: ${response.status}`);
    }

    const data = await response.json();
    return Character.createFromApiResponse(data);
  }

  async getPlanetName(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`SWAPI planet error: ${response.status}`);
    }

    const data = await response.json();
    return data.name;
  }
}
