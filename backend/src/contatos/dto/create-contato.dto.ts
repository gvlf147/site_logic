import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateContatoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsNotEmpty()
  mensagem: string;
}
