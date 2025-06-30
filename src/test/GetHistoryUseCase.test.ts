import { MergedCharacterWeather } from "@/domain/models/MergedCharacterWeather";
import { mockRepository } from "./mocks";
import { GetHistoryUseCase } from "@/application/use-cases/GetHistoryUseCase";

describe("GetHistoryUseCase", () => {
  const useCase = new GetHistoryUseCase(mockRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("llama al repositorio con limit y lastKey", async () => {
    const limit = 5;
    const lastKey = "1";

    const fakeCharacter = MergedCharacterWeather.create({
      personId: "1",
      characterName: "Luke",
      planet: "Tatooine",
      temperature: 30,
      weatherDescription: "Calor seco",
      humidity: 20,
    });

    mockRepository.getAllPaginated.mockResolvedValueOnce({
      items: [fakeCharacter],
      lastKey: "nextKey",
    });

    const result = await useCase.execute(limit, lastKey);

    expect(mockRepository.getAllPaginated).toHaveBeenCalledWith(limit, lastKey);
    expect(result.items).toHaveLength(1);
    expect(result.lastKey).toBe("nextKey");
  });

  it("usa el límite por defecto si no se especifica", async () => {
    mockRepository.getAllPaginated.mockResolvedValueOnce({
      items: [],
      lastKey: undefined,
    });

    await useCase.execute();

    expect(mockRepository.getAllPaginated).toHaveBeenCalledWith(10, undefined);
  });
});
