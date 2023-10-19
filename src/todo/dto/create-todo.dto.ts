import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  body?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsBoolean()
  isComplited?: boolean;

  @IsOptional()
  @IsDateString()
  expiresIn?: Date;
}
