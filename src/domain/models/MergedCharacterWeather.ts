export class MergedCharacterWeather {
  private constructor(
    public readonly id: string,
    public readonly characterName: string,
    public readonly planet: string,
    public readonly temperature: number | null,
    public readonly weatherDescription: string,
    public readonly humidity: number | null,
    public readonly timestamp: Date
  ) {}

  static create(props: {
    personId: string;
    characterName: string;
    planet: string;
    temperature: number | null;
    weatherDescription: string;
    humidity: number | null;
  }): MergedCharacterWeather {
    return new MergedCharacterWeather(
      props.personId,
      props.characterName,
      props.planet,
      props.temperature,
      props.weatherDescription,
      props.humidity,
      new Date()
    );
  }

  static fromItem(item: any): MergedCharacterWeather {
    return new MergedCharacterWeather(
      item.id,
      item.characterName,
      item.planet,
      item.temperature,
      item.weatherDescription,
      item.humidity,
      new Date(item.timestamp)
    );
  }

  toItem() {
    return {
      id: this.id,
      characterName: this.characterName,
      planet: this.planet,
      temperature: this.temperature,
      weatherDescription: this.weatherDescription,
      humidity: this.humidity,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
