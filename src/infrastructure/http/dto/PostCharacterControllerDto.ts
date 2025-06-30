import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PostCharacterControllerDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  planetName!: string;

  @IsNotEmpty()
  @IsUrl()
  homeworldUrl!: string;
}
