// src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Instância HTTP padrão do NestJS
  const httpApp = await NestFactory.create(AppModule);
  const httpPort = process.env.API_PORT ? Number(process.env.API_PORT) : 3000; // Porta HTTP padrão
  await httpApp.listen(httpPort);

  // Microserviço MQTT
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(
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
  await mqttApp.listen();
  console.log('🟢 Microserviço MQTT rodando e aguardando mensagens...');
  console.log(`🟢 API HTTP rodando na porta ${httpPort}`);
}

bootstrap();
