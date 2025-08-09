import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeriodeModule } from './periode/periode.module';
import { JabatanModule } from './jabatan/jabatan.module';
import { DivisiModule } from './divisi/divisi.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from './config/jwt.config';
import { TokenModule } from './token/token.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    cache:true,
    envFilePath: ['.env'],
    load: [() => ({jwt: jwtConfig})]
  }),PeriodeModule, JabatanModule, DivisiModule, AuthModule, TokenModule]
})
export class AppModule {}
