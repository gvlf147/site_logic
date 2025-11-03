import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContatoDto } from './dto/create-contato.dto';

@Injectable()
export class ContatosService {
  constructor(private prisma: PrismaService) {}

  async create(createContatoDto: CreateContatoDto) {
    return this.prisma.contato.create({
      data: createContatoDto,
    });
  }

  async findAll(status?: string) {
    return this.prisma.contato.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.contato.findUnique({
      where: { id },
    });
  }

  async markAsRead(id: number) {
    return this.prisma.contato.update({
      where: { id },
      data: { status: 'lido' },
    });
  }

  async markAsResponded(id: number) {
    return this.prisma.contato.update({
      where: { id },
      data: { status: 'respondido', respondido: true },
    });
  }

  async remove(id: number) {
    return this.prisma.contato.delete({
      where: { id },
    });
  }

  async getStats() {
    const total = await this.prisma.contato.count();
    const novos = await this.prisma.contato.count({
      where: { status: 'novo' },
    });
    const lidos = await this.prisma.contato.count({
      where: { status: 'lido' },
    });
    const respondidos = await this.prisma.contato.count({
      where: { status: 'respondido' },
    });

    return {
      total,
      novos,
      lidos,
      respondidos,
    };
  }
}
