import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Fallecido } from './entities/fallecido.entity';
import { CreateFallecidoDto } from './dto/create-fallecido.dto';
import { UpdateFallecidoDto } from './dto/update-fallecido.dto';

@Injectable()
export class FallecidosService {
  constructor(
    @InjectRepository(Fallecido)
    private fallecidosRepository: Repository<Fallecido>,
  ) {}

  async create(createFallecidoDto: CreateFallecidoDto): Promise<Fallecido> {
    const fallecido = this.fallecidosRepository.create(createFallecidoDto);
    return await this.fallecidosRepository.save(fallecido);
  }

  async findAll(
    q?: string,
    year?: number,
    region?: string,
    comuna?: string,
    cemetery?: string,
    cause?: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ items: Fallecido[]; total: number; page: number; pageSize: number }> {
    const query = this.fallecidosRepository.createQueryBuilder('fallecido');

    if (q) {
      query.andWhere(
        '(fallecido.name ILIKE :q OR fallecido.rut ILIKE :q OR fallecido.location ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    if (year) {
      query.andWhere('fallecido.deathYear = :year', { year });
    }

    if (region) {
      query.andWhere('fallecido.region = :region', { region });
    }

    if (comuna) {
      query.andWhere('fallecido.comuna = :comuna', { comuna });
    }

    if (cemetery) {
      query.andWhere(
        '(fallecido.cemeterySlug = :cemetery OR fallecido.location ILIKE :cemeteryLike)',
        { cemetery, cemeteryLike: `%${cemetery}%` },
      );
    }

    if (cause) {
      query.andWhere('fallecido.cause = :cause', { cause });
    }

    const total = await query.getCount();
    const items = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('fallecido.createdAt', 'DESC')
      .getMany();

    return { items, total, page, pageSize };
  }

  async findOne(id: string): Promise<Fallecido> {
    const fallecido = await this.fallecidosRepository.findOne({ where: { id } });
    if (!fallecido) {
      throw new NotFoundException(`Fallecido con ID ${id} no encontrado`);
    }
    return fallecido;
  }

  async update(id: string, updateFallecidoDto: UpdateFallecidoDto): Promise<Fallecido> {
    const fallecido = await this.findOne(id);
    Object.assign(fallecido, updateFallecidoDto);
    return await this.fallecidosRepository.save(fallecido);
  }

  async remove(id: string): Promise<void> {
    const fallecido = await this.findOne(id);
    await this.fallecidosRepository.remove(fallecido);
  }

  async seed(): Promise<string> {
    const count = await this.fallecidosRepository.count();
    if (count > 0) {
      return 'La base de datos ya contiene datos';
    }

    const seedData = [
      { name: 'Isabella Rossi', rut: '12.345.678-9', birthYear: 1935, deathYear: 2023, region: 'metropolitana', comuna: 'santiago', location: 'Cementerio Metropolitano', cemeterySlug: 'metropolitano', cause: 'natural', epitaph: 'Siempre en nuestros corazones' },
      { name: 'Ricardo Silva', rut: '7.654.321-0', birthYear: 1950, deathYear: 2022, region: 'metropolitana', comuna: 'huechuraba', location: 'Parque del Recuerdo', cemeterySlug: 'parque', cause: 'natural', epitaph: 'Descansa en paz' },
      { name: 'María López', rut: '9.876.543-2', birthYear: 1942, deathYear: 2019, region: 'valparaiso', comuna: 'valparaiso', location: 'Cementerio General', cemeterySlug: 'general', cause: 'otro', epitaph: 'Luz eterna' },
      { name: 'Juan Pérez', rut: '11.223.344-5', birthYear: 1961, deathYear: 2020, region: 'biobio', comuna: 'concepcion', location: 'Parque del Recuerdo', cemeterySlug: 'parque', cause: 'accidente', epitaph: 'Hasta siempre' },
      { name: 'Elena García', rut: '6.111.222-3', birthYear: 1938, deathYear: 2017, region: 'metropolitana', comuna: 'maipu', location: 'Cementerio Católico', cemeterySlug: 'catolico', cause: 'natural', epitaph: 'Amor infinito' },
      { name: 'Pedro Torres', rut: '17.888.999-1', birthYear: 1970, deathYear: 2024, region: 'metropolitana', comuna: 'santiago', location: 'Cementerio Metropolitano', cemeterySlug: 'metropolitano', cause: 'otro', epitaph: 'Te recordaremos' },
      { name: 'Sofía Méndez', rut: '18.111.222-3', birthYear: 1990, deathYear: 2021, region: 'valparaiso', comuna: 'viña del mar', location: 'Cementerio General', cemeterySlug: 'general', cause: 'accidente', epitaph: 'Siempre presente' },
    ];

    await this.fallecidosRepository.save(seedData);
    return `${seedData.length} registros insertados exitosamente`;
  }
}
