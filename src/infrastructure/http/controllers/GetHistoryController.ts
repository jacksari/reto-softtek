import { GetHistoryUseCase } from "@/application/use-cases/GetHistoryUseCase";
import { MergedWeatherRepositoryImpl } from "@/infrastructure/db/dynamodb/MergedWeatherRepositoryImpl";

export class GetHistoryController {
  static async execute(limit: number, lastKey?: string) {
    try {
      const repo = new MergedWeatherRepositoryImpl();
      const useCase = new GetHistoryUseCase(repo);
      const result = await useCase.execute(limit, lastKey);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "historial paginados",
          items: result.items.map((item) => item.toItem()),
          lastKey: result.lastKey || null,
        }),
      };
    } catch (error) {
      console.error("Error en GetHistoryController:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al obtener historial",
          error: (error as Error).message,
        }),
      };
    }
  }
}
