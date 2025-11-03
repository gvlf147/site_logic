import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll(categoria?: string) {
    return this.prisma.project.findMany({
      where: {
        ativo: true,
        ...(categoria && categoria !== 'Todos' ? { categoria } : {}),
      },
      orderBy: [
        { destaque: 'desc' },
        { ordem: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findFeatured() {
    return this.prisma.project.findFirst({
      where: {
        destaque: true,
        ativo: true,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async deactivate(id: number) {
    return this.prisma.project.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
