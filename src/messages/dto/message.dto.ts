import { IsString, IsOptional, IsNumber, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsUUID()
  receiver_id: string;

  @IsString()
  @IsOptional()
  image_url?: string;
}

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number = 20;
}