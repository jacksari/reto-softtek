import { StoreCharacterUseCase } from "@/application/use-cases/StoreCharacterUseCase";
import { CharacterRepositoryImpl } from "@/infrastructure/db/dynamodb/CharacterRepositoryImpl";
import { validateDto } from "@/shared/utils/validateDto";
import { PostCharacterControllerDto } from "../dto/PostCharacterControllerDto";

export class PostCharacterController {
  static async execute(body: any) {
    const { instance: dto, errors } = await validateDto(
      PostCharacterControllerDto,
      body
    );

    if (errors) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Datos inválidos",
          details: errors,
        }),
      };
    }

    try {
      const useCase = new StoreCharacterUseCase(new CharacterRepositoryImpl());

      const character = await useCase.execute({
        name: dto.name,
        planetName: dto.planetName,
        homeworldUrl: dto.homeworldUrl,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Personaje creado",
          item: character,
        }),
      };
    } catch (error: any) {
      console.error("Error en PostCharacterController:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error interno al guardar personaje",
          error: error.message,
        }),
      };
    }
  }
}
