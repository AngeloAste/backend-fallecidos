import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, MaxLength, Min, Max } from 'class-validator';

export class CreateFallecidoDto {
  @ApiProperty({ description: 'Nombre completo del fallecido', example: 'Juan Pérez González' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'RUT del fallecido', example: '12.345.678-9', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  rut?: string;

  @ApiProperty({ description: 'Año de nacimiento', example: 1950, required: false })
  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  birthYear?: number;

  @ApiProperty({ description: 'Año de fallecimiento', example: 2023 })
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  deathYear: number;

  @ApiProperty({ description: 'Región', example: 'metropolitana', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  region?: string;

  @ApiProperty({ description: 'Comuna', example: 'santiago', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  comuna?: string;

  @ApiProperty({ description: 'Cementerio o lugar de entierro', example: 'Cementerio General' })
  @IsString()
  @MaxLength(255)
  location: string;

  @ApiProperty({ description: 'Slug del cementerio', example: 'general', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cemeterySlug?: string;

  @ApiProperty({ description: 'Causa de muerte', example: 'natural', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  cause?: string;

  @ApiProperty({ description: 'Epitafio', example: 'Siempre en nuestros corazones' })
  @IsString()
  epitaph: string;
}
