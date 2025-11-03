"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContatosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContatosService = class ContatosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContatoDto) {
        return this.prisma.contato.create({
            data: createContatoDto,
        });
    }
    async findAll(status) {
        return this.prisma.contato.findMany({
            where: status ? { status } : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.contato.findUnique({
            where: { id },
        });
    }
    async markAsRead(id) {
        return this.prisma.contato.update({
            where: { id },
            data: { status: 'lido' },
        });
    }
    async markAsResponded(id) {
        return this.prisma.contato.update({
            where: { id },
            data: { status: 'respondido', respondido: true },
        });
    }
    async remove(id) {
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
};
exports.ContatosService = ContatosService;
exports.ContatosService = ContatosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContatosService);
//# sourceMappingURL=contatos.service.js.map