// src/mqtt/mqtt.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface SensorPayload {
  espId: string;
  valor: string; // recebemos como string via MQTT
  timestamp: string; // string ISO
}

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);

  constructor(private readonly prisma: PrismaService) {}

  async saveSensorData(payload: SensorPayload) {
    const { espId, valor, timestamp } = payload;

    // Parse dos campos
    const valorNum = parseFloat(valor);
    const ts = new Date(timestamp);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const record = await this.prisma.data.create({
        data: {
          espId,
          valor: valorNum.toString(),
          timestamp: ts,
        },
      });
      this.logger.log(`Dados salvos: ${JSON.stringify(record)}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return record;
    } catch (error) {
      this.logger.error('Erro ao salvar sensor data', error);
      throw error;
    }
  }
}
