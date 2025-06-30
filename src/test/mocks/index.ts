import { CharacterRepository } from "@/domain/repositories/CharacterRepository";
import { MergedWeatherRepository } from "@/domain/repositories/MergedCharacterWeatherRepository";
import { SwapiClient } from "@/infrastructure/apis/SwapiClient";

export const mockSwapiClient: {
  getCharacter: jest.Mock;
  getPlanetName: jest.Mock;
} = {
  getCharacter: jest.fn(),
  getPlanetName: jest.fn(),
};

export const mockWeatherClient: {
  getWeatherByLocation: jest.Mock;
} = {
  getWeatherByLocation: jest.fn(),
};

export const mockCacheService: {
  get: jest.Mock;
  set: jest.Mock;
} = {
  get: jest.fn(),
  set: jest.fn(),
};


export const mockRepository: jest.Mocked<MergedWeatherRepository> = {
  save: jest.fn(),
  getAllPaginated: jest.fn(),
};

export const mockCharacterRepository: jest.Mocked<CharacterRepository> = {
  save: jest.fn(),
};
