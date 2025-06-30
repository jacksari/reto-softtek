import { MergedCharacterWeather } from "@/domain/models/MergedCharacterWeather";
import { MergedWeatherRepository } from "@/domain/repositories/MergedCharacterWeatherRepository";
import { SwapiClient } from "@/infrastructure/apis/SwapiClient";
import { WeatherApiClient } from "@/infrastructure/apis/WeatherApiClient";
import { CacheService } from "@/infrastructure/cache/CacheService";

export class GetMergedCharacterWeather {
  constructor(
    private readonly swapiClient: SwapiClient,
    private readonly weatherClient: WeatherApiClient,
    private readonly cacheService: CacheService,
    private readonly repository: MergedWeatherRepository
  ) {}

  async execute(personId: string): Promise<MergedCharacterWeather> {
    // buscar si existe cache
    const cached = await this.cacheService.get(personId);
    if (cached) {
      return cached;
    }

    // datos de personaje y planeta
    const character = await this.swapiClient.getCharacter(personId);

    const planetName = await this.swapiClient.getPlanetName(
      character.homeworldUrl
    );
    character.setPlanetName(planetName);

    // buscar clima
    const weather = await this.weatherClient.getWeatherByLocation(planetName);

    // crear entidad combinada
    const merged = MergedCharacterWeather.create({
      personId,
      characterName: character.name,
      planet: character.planetName,
      temperature: weather.temperature,
      weatherDescription: weather.description,
      humidity: weather.humidity,
    });

    // guardar en bd
    await this.repository.save(merged);

    // guardar en cache
    await this.cacheService.set(personId, merged, 30 * 60); // 30 min

    return merged;
  }
}
