import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FallecidosService } from './fallecidos.service';
import { FallecidosController } from './fallecidos.controller';
import { Fallecido } from './entities/fallecido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fallecido])],
  controllers: [FallecidosController],
  providers: [FallecidosService],
  exports: [FallecidosService],
})
export class FallecidosModule {}
