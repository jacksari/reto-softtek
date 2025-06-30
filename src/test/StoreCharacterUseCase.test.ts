import { Character } from "@/domain/entities/Character";
import { StoreCharacterUseCase } from "@/application/use-cases/StoreCharacterUseCase";
import { mockCharacterRepository } from "./mocks";

describe("StoreCharacterUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe guardar un personaje correctamente", async () => {
    const useCase = new StoreCharacterUseCase(mockCharacterRepository);

    const input = {
      name: "Anakin Skywalker",
      planetName: "Tatooine",
      homeworldUrl: "https://swapi.dev/api/planets/1/",
    };

    const result = await useCase.execute(input);

    expect(mockCharacterRepository.save).toHaveBeenCalledTimes(1);
    expect(mockCharacterRepository.save).toHaveBeenCalledWith(
      expect.any(Character)
    );

    expect(result).toMatchObject({
      name: input.name,
      planetName: input.planetName,
      homeworldUrl: input.homeworldUrl,
    });

    expect(result.id).toBeDefined();
  });
});
