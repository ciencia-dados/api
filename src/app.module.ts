import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttController } from './mqtt/mqtt.controller';
import { PrismaService } from './prisma/prisma.service';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [],
  controllers: [MqttController],
  providers: [AppService, PrismaService, MqttService],
})
export class AppModule {}
