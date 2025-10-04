import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FallecidosService } from './fallecidos.service';
import { CreateFallecidoDto } from './dto/create-fallecido.dto';
import { UpdateFallecidoDto } from './dto/update-fallecido.dto';
import { Fallecido } from './entities/fallecido.entity';

@ApiTags('fallecidos')
@Controller('fallecidos')
export class FallecidosController {
  constructor(private readonly fallecidosService: FallecidosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de fallecido' })
  @ApiResponse({ status: 201, description: 'Registro creado exitosamente', type: Fallecido })
  create(@Body(ValidationPipe) createFallecidoDto: CreateFallecidoDto) {
    return this.fallecidosService.create(createFallecidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros con filtros opcionales' })
  @ApiQuery({ name: 'q', required: false, description: 'Búsqueda por nombre, RUT o ubicación' })
  @ApiQuery({ name: 'year', required: false, description: 'Filtrar por año de fallecimiento' })
  @ApiQuery({ name: 'region', required: false, description: 'Filtrar por región' })
  @ApiQuery({ name: 'comuna', required: false, description: 'Filtrar por comuna' })
  @ApiQuery({ name: 'cemetery', required: false, description: 'Filtrar por cementerio' })
  @ApiQuery({ name: 'cause', required: false, description: 'Filtrar por causa de muerte' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Tamaño de página', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de registros', type: [Fallecido] })
  findAll(
    @Query('q') q?: string,
    @Query('year') year?: number,
    @Query('region') region?: string,
    @Query('comuna') comuna?: string,
    @Query('cemetery') cemetery?: string,
    @Query('cause') cause?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.fallecidosService.findAll(
      q,
      year ? Number(year) : undefined,
      region,
      comuna,
      cemetery,
      cause,
      page ? Number(page) : 1,
      pageSize ? Number(pageSize) : 10,
    );
  }

  @Get('seed')
  @ApiOperation({ summary: 'Insertar datos de prueba en la base de datos' })
  @ApiResponse({ status: 200, description: 'Datos insertados exitosamente' })
  seed() {
    return this.fallecidosService.seed();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro por ID' })
  @ApiResponse({ status: 200, description: 'Registro encontrado', type: Fallecido })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  findOne(@Param('id') id: string) {
    return this.fallecidosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro existente' })
  @ApiResponse({ status: 200, description: 'Registro actualizado', type: Fallecido })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFallecidoDto: UpdateFallecidoDto,
  ) {
    return this.fallecidosService.update(id, updateFallecidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro' })
  @ApiResponse({ status: 200, description: 'Registro eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  remove(@Param('id') id: string) {
    return this.fallecidosService.remove(id);
  }
}
