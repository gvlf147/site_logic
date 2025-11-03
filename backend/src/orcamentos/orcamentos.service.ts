import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoStatusDto } from './dto/update-orcamento-status.dto';

@Injectable()
export class OrcamentosService {
  constructor(private prisma: PrismaService) {}

  async create(createOrcamentoDto: CreateOrcamentoDto) {
    return this.prisma.orcamento.create({
      data: createOrcamentoDto,
    });
  }

  async findAll(status?: string) {
    return this.prisma.orcamento.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.orcamento.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateOrcamentoStatusDto) {
    return this.prisma.orcamento.update({
      where: { id },
      data: updateStatusDto,
    });
  }

  async remove(id: number) {
    return this.prisma.orcamento.delete({
      where: { id },
    });
  }

  async getStats() {
    const total = await this.prisma.orcamento.count();
    const pendentes = await this.prisma.orcamento.count({
      where: { status: 'pendente' },
    });
    const emAnalise = await this.prisma.orcamento.count({
      where: { status: 'em_analise' },
    });
    const respondidos = await this.prisma.orcamento.count({
      where: { status: 'respondido' },
    });
    const fechados = await this.prisma.orcamento.count({
      where: { status: 'fechado' },
    });

    return {
      total,
      pendentes,
      emAnalise,
      respondidos,
      fechados,
    };
  }
}
