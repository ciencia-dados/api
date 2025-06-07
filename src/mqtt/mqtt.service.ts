// src/mqtt/mqtt.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';


export interface SensorPayload {
  espId: string;
  valor: string; // recebemos como string via MQTT
  timestamp: string; // string ISO
}

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private writeApi: WriteApi;

  constructor() {
    const url    = process.env.INFLUX_URL!;
    const token  = process.env.INFLUX_TOKEN!;
    const org    = process.env.INFLUX_ORG!;
    const bucket = process.env.INFLUX_BUCKET!;

    console.debug({ url, token, org, bucket });

    const client = new InfluxDB({ url, token });
    this.writeApi = client.getWriteApi(org, bucket, 'ns');
  }

  async saveSensorData(payload: SensorPayload) {
    const { espId, valor, timestamp } = payload;

    const pt = new Point('esp_data')       
      .tag('espId', espId)                // coloca espId como tag
      .stringField('valor', valor)        // valor como campo string
      .timestamp(new Date(timestamp));


    // Parse dos campos
    const ts = new Date(timestamp).toISOString();
    console.log('ts');
    console.log(ts);

    this.writeApi.writePoint(pt);
    await this.writeApi.flush();
    this.logger.log(`Gravado ESP data: ${espId} → ${valor}`);

  }
}
