import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
