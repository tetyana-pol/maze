import { IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  initializer: string;

  @IsString()
  game: string;
}
