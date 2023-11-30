import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
