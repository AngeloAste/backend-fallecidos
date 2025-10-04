import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fallecidos')
export class Fallecido {
  @ApiProperty({ description: 'ID único del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre completo del fallecido' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'RUT del fallecido', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  rut: string;

  @ApiProperty({ description: 'Año de nacimiento', required: false })
  @Column({ type: 'int', nullable: true })
  birthYear: number;

  @ApiProperty({ description: 'Año de fallecimiento' })
  @Column({ type: 'int' })
  deathYear: number;

  @ApiProperty({ description: 'Región', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  region: string;

  @ApiProperty({ description: 'Comuna', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  comuna: string;

  @ApiProperty({ description: 'Cementerio o lugar de entierro' })
  @Column({ type: 'varchar', length: 255 })
  location: string;

  @ApiProperty({ description: 'Slug del cementerio', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  cemeterySlug: string;

  @ApiProperty({ description: 'Causa de muerte', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  cause: string;

  @ApiProperty({ description: 'Epitafio' })
  @Column({ type: 'text' })
  epitaph: string;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
}
