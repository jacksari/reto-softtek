import { MergedCharacterWeather } from "../models/MergedCharacterWeather";


export interface MergedWeatherRepository {
  save(data: MergedCharacterWeather): Promise<void>;
  getAllPaginated(limit: number, lastKey?: string): Promise<{
    items: MergedCharacterWeather[];
    lastKey?: string;
  }>;
}
