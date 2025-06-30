import { WeatherInfo } from "../../domain/entities/WeatherInfo";

export class WeatherApiClient {
  constructor(
    private readonly baseUrl = "https://api.weatherapi.com/v1/current.json",
    private readonly apiKey = process.env.OPENWEATHER_API_KEY! || ""
  ) {}

  async getWeatherByLocation(location: string): Promise<WeatherInfo> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(location)}&key=${
      this.apiKey
    }&aqi=no`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      if (error?.error?.message?.includes("No matching location")) {
        return WeatherInfo.createNotFound(location);
      }

      throw new Error(
        `Weather API error: ${error?.error?.message || response.status}`
      );
    }

    const data = await response.json();
    return WeatherInfo.createFromApiResponse(data);
  }
}
