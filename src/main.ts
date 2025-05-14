// src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        // URL do broker MQTT (p.ex. localhost:1883, ou mqtt://test.mosquitto.org)
        url: 'mqtt://' + process.env.MQTT_HOST + ':' + process.env.MQTT_PORT,
        // (Opcional) credenciais, keepalive, etc.:
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        // keepalive: 60,
      },
    },
  );
  await app.listen();
  console.log('🟢 Microserviço MQTT rodando e aguardando mensagens...');
}

bootstrap();
