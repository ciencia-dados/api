import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttController } from './mqtt/mqtt.controller';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [],
  controllers: [MqttController],
  providers: [AppService, MqttService],
})
export class AppModule {}
