import { Character } from "@/domain/entities/Character";
import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { StoreCharacterUseCaseDto } from "../dtos/StoreCharacterUseCaseDto";

export class StoreCharacterUseCase {
  constructor(private readonly repo: CharacterRepository) {}

  async execute(input: StoreCharacterUseCaseDto) {
    const character = Character.createManual(input);
    await this.repo.save(character);
    return character;
  }
}
