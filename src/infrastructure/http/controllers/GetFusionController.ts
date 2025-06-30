import { CacheService } from "@/infrastructure/cache/CacheService";
import { GetMergedCharacterWeather } from "../../../application/use-cases/GetMergedCharacterWeather";
import { SwapiClient } from "../../apis/SwapiClient";
import { WeatherApiClient } from "../../apis/WeatherApiClient";
import { MergedWeatherRepositoryImpl } from "../../db/dynamodb/MergedWeatherRepositoryImpl";

export class GetFusionController {
  static async execute(personId: string) {
    const swapiClient = new SwapiClient();
    const weatherClient = new WeatherApiClient();
    const cacheService = new CacheService();
    const repository = new MergedWeatherRepositoryImpl();

    const useCase = new GetMergedCharacterWeather(
      swapiClient,
      weatherClient,
      cacheService,
      repository
    );

    if (!personId || isNaN(Number(personId))) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Parámetro 'person_id' inválido" }),
      };
    }

    try {
      const result = await useCase.execute(personId);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "consulta de datos",
          data: result.toItem(),
        }),
      };
    } catch (error: any) {
      console.error("Error en FusionController:", error);

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al fusionar datos del personaje y el clima",
          error: error.message,
        }),
      };
    }
  }
}
