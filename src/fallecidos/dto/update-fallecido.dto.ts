import { PartialType } from '@nestjs/swagger';
import { CreateFallecidoDto } from './create-fallecido.dto';

export class UpdateFallecidoDto extends PartialType(CreateFallecidoDto) {}
