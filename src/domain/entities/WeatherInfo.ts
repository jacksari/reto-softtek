export class WeatherInfo {
  constructor(
    public readonly location: string,
    public readonly temperature: number | null,
    public readonly description: string,
    public readonly humidity: number | null
  ) {}

  static createFromApiResponse(data: any): WeatherInfo {
    return new WeatherInfo(
      data.location.name,
      data.current.temp_c,
      data.current.condition.text,
      data.current.humidity,
    );
  }

  static createNotFound(location: string): WeatherInfo {
    return new WeatherInfo(location, null, "Planeta no encontrado", null);
  }
}
