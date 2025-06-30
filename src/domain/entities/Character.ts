import { v4 as uuidv4 } from "uuid";
import { SwapiPerson } from "../models/SwapiPerson";

export class Character {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly planetName: string,
    public readonly homeworldUrl: string
  ) {}

  static createManual(props: {
    name: string;
    planetName: string;
    homeworldUrl: string;
  }): Character {
    return new Character(
      uuidv4(),
      props.name,
      props.planetName,
      props.homeworldUrl
    );
  }

  static createFromApiResponse(data: SwapiPerson): Character {
    console.log("data character", data);
    if (!data.name || !data.homeworld) {
      throw new Error("Datos de personaje inválidos");
    }

    const planetId = data.homeworld.split("/").filter(Boolean).pop();

    // la primera api no trae el nombre del planeta
    return new Character(planetId!, data.name, "", data.homeworld);
  }

  setPlanetName(name: string) {
    (this as any).planetName = name;
  }

  toItem() {
    return {
      id: this.id,
      name: this.name,
      planetName: this.planetName,
      homeworldUrl: this.homeworldUrl,
    };
  }
}
