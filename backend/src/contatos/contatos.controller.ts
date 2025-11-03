import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';

@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post()
  create(@Body() createContatoDto: CreateContatoDto) {
    return this.contatosService.create(createContatoDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.contatosService.findAll(status);
  }

  @Get('stats')
  getStats() {
    return this.contatosService.getStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contatosService.findOne(id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.contatosService.markAsRead(id);
  }

  @Patch(':id/responded')
  markAsResponded(@Param('id', ParseIntPipe) id: number) {
    return this.contatosService.markAsResponded(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contatosService.remove(id);
  }
}
