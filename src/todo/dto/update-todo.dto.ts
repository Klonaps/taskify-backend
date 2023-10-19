import { IsString, MaxLength, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  title?: string;

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
