// src/mqtt/mqtt.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import {
  MessagePattern,
  Payload,
  Ctx,
  MqttContext,
} from '@nestjs/microservices';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}
  private readonly logger = new Logger(MqttController.name);

  // Se inscreve no tópico 'devices/+/status'
  @MessagePattern('iot/leituras')
  async handleDeviceStatus(
    @Payload() payload: any,
    @Ctx() context: MqttContext,
  ) {
    const topic = context.getTopic();
    const packet = context.getPacket();

    this.logger.log(
      `Recebido no tópico "${topic}": ${JSON.stringify(payload)}`,
    );

    // Salva no banco
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.mqttService.saveSensorData(payload);
  }

  // Também é possível usar topics exatos:
  // @MessagePattern('alerts/high-temperature')
  // handleHighTemp(@Payload() payload: any) { … }
}
