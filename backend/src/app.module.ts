import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { ContatosModule } from './contatos/contatos.module';
import { UsersModule } from './users/users.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProjectsModule,
    OrcamentosModule,
    ContatosModule,
    UsersModule,
    InstagramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
