import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrcamentoStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  notasInternas?: string;
}
