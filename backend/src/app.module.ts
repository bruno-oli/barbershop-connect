import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BarbersModule } from './barbers/barbers.module';

@Module({
  imports: [UsersModule, BarbersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
