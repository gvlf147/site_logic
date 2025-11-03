import { PrismaService } from '../prisma/prisma.service';
import { CreateContatoDto } from './dto/create-contato.dto';
export declare class ContatosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createContatoDto: CreateContatoDto): Promise<{
        createdAt: Date;
        id: number;
        nome: string;
        email: string;
        telefone: string | null;
        status: string;
        respondido: boolean;
        mensagem: string;
    }>;
    findAll(status?: string): Promise<{
        createdAt: Date;
        id: number;
        nome: string;
        email: string;
        telefone: string | null;
        status: string;
        respondido: boolean;
        mensagem: string;
    }[]>;
    findOne(id: number): Promise<{
        createdAt: Date;
        id: number;
        nome: string;
        email: string;
        telefone: string | null;
        status: string;
        respondido: boolean;
        mensagem: string;
    } | null>;
    markAsRead(id: number): Promise<{
        createdAt: Date;
        id: number;
        nome: string;
        email: string;
        telefone: string | null;
        status: string;
        respondido: boolean;
        mensagem: string;
    }>;
    markAsResponded(id: number): Promise<{
        createdAt: Date;
        id: number;
        nome: string;
        email: string;
        telefone: string | null;
        status: string;
        respondido: boolean;
        mensagem: string;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        id: number;
        nome: string;
        email: string;
        telefone: string | null;
        status: string;
        respondido: boolean;
        mensagem: string;
    }>;
    getStats(): Promise<{
        total: number;
        novos: number;
        lidos: number;
        respondidos: number;
    }>;
}
