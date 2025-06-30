import { MergedWeatherRepository } from "@/domain/repositories/MergedCharacterWeatherRepository";

export class GetHistoryUseCase {
  constructor(private readonly repository: MergedWeatherRepository) {}

  async execute(limit = 10, lastKey?: string) {
    return await this.repository.getAllPaginated(limit, lastKey);
  }
}
