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
    const ts = new Date(timestamp).toISOString();
    console.log('ts');
    console.log(ts);

    try {
      const record = await this.prisma.data.create({
        data: {
          espId,
          valor: valor,
          timestamp: ts,
        },
      });
      this.logger.log(`Dados salvos: ${JSON.stringify(record)}`);

      return record;
    } catch (error) {
      this.logger.error('Erro ao salvar sensor data', error);
      throw error;
    }
  }

  /** Conta e agrupa eventos por dia e hora */
  async eventByDayAndHour() {
    const raw = await this.prisma.$queryRaw<
      { date: string; hour: string; count: bigint; espId: string }[]
    >`
      SELECT
        date( datetime(CAST(timestamp/1000 AS integer), 'unixepoch') ) AS date,
        strftime('%H', datetime(CAST(timestamp/1000 AS integer), 'unixepoch') ) AS hour,
        COUNT(*) AS "count",
        espId AS "espId"
      FROM "data"
      GROUP BY date, hour, espId
      ORDER BY date ASC, hour ASC;
    `;
    return raw.map((row) => ({
      date: row.date,
      hour: row.hour,
      espId: row.espId,
      count: Number(row.count),
    }));
  }
}
