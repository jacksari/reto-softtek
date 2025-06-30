import { SwapiClient } from "@/infrastructure/apis/SwapiClient";
import { WeatherApiClient } from "@/infrastructure/apis/WeatherApiClient";
import { CacheService } from "@/infrastructure/cache/CacheService";
import { MergedCharacterWeather } from "@/domain/models/MergedCharacterWeather";
import { GetMergedCharacterWeather } from "@/application/use-cases/GetMergedCharacterWeather";
import {
  mockCacheService,
  mockRepository,
  mockSwapiClient,
  mockWeatherClient,
} from "./mocks";

describe("GetMergedCharacterWeather", () => {
  const personId = "1";

  const useCase = new GetMergedCharacterWeather(
    mockSwapiClient as unknown as SwapiClient,
    mockWeatherClient as unknown as WeatherApiClient,
    mockCacheService as unknown as CacheService,
    mockRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna desde cache si existe", async () => {
    const cachedResult = MergedCharacterWeather.create({
      personId,
      characterName: "Luke Skywalker",
      planet: "Tatooine",
      temperature: 30,
      weatherDescription: "Soleado",
      humidity: 10,
    });

    mockCacheService.get.mockResolvedValueOnce(cachedResult);

    const result = await useCase.execute(personId);

    expect(mockCacheService.get).toHaveBeenCalledWith(personId);
    expect(mockSwapiClient.getCharacter).not.toHaveBeenCalled();
    expect(result).toBe(cachedResult);
  });

  it("obtiene datos y guarda si no hay cache", async () => {
    mockCacheService.get.mockResolvedValueOnce(null);

    mockSwapiClient.getCharacter.mockResolvedValueOnce({
      name: "Luke Skywalker",
      homeworldUrl: "https://swapi.dev/api/planets/1/",
      planetName: "",
      setPlanetName(name: string) {
        (this as any).planetName = name;
      },
    });

    mockSwapiClient.getPlanetName.mockResolvedValueOnce("Tatooine");

    mockWeatherClient.getWeatherByLocation.mockResolvedValueOnce({
      temperature: 30,
      description: "Soleado",
      humidity: 10,
    });

    const result = await useCase.execute(personId);

    expect(mockSwapiClient.getCharacter).toHaveBeenCalledWith(personId);
    expect(mockSwapiClient.getPlanetName).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/1/"
    );
    expect(mockWeatherClient.getWeatherByLocation).toHaveBeenCalledWith(
      "Tatooine"
    );
    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.any(MergedCharacterWeather)
    );
    expect(mockCacheService.set).toHaveBeenCalledWith(
      personId,
      expect.any(MergedCharacterWeather),
      30 * 60
    );

    expect(result.characterName).toBe("Luke Skywalker");
    expect(result.planet).toBe("Tatooine");
    expect(result.temperature).toBe(30);
  });
});
