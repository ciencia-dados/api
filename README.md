# 📡 API de Sensoriamento IoT com NestJS, InfluxDB e MQTT

Este projeto fornece uma API RESTful construída com [NestJS](https://nestjs.com/) para o gerenciamento e persistência de dados sensoriais provenientes de dispositivos IoT via MQTT. Os dados são armazenados em um banco de dados **InfluxDB** e disponibilizados para consumo e análise em tempo real.

---

## 🚀 Funcionalidades

- 📥 Recebimento de dados via HTTP
- 📊 Armazenamento em banco de séries temporais (InfluxDB)
- 🔗 Integração com broker MQTT (Eclipse Mosquitto)
- 📡 Estrutura pronta para dashboards com Grafana
- 🌐 API RESTful com endpoints documentados

---

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) – Framework Node.js
- [InfluxDB 2.x](https://www.influxdata.com/) – Banco de dados de séries temporais
- [Grafana](https://grafana.com/) – Visualização de dados
- [MQTT (Eclipse Mosquitto)](https://mosquitto.org/) – Protocolo de mensagens leves
- [Docker & Docker Compose](https://docs.docker.com/compose/) – Orquestração de serviços

---

## 📦 Estrutura do Projeto
```
├── api/ # Código-fonte da API NestJS
├── grafana/ # Provisionamento de dashboards
├── mqtt-broker/ # Configurações do Mosquitto
├── grafana-data/ # Dados persistidos do Grafana
├── docker-compose.yml # Orquestração dos serviços
└── .env # Variáveis de ambiente
```

## 🧪 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (caso queira rodar a API fora do container)

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```
# .env
API_PORT=3000
INFLUXDB_PORT=8086

INFLUXDB_INIT_MODE=setup
INFLUXDB_INIT_USERNAME=admin
INFLUXDB_INIT_PASSWORD=admin123456
INFLUXDB_INIT_ORG=docs
INFLUXDB_INIT_BUCKET=home
INFLUXDB_INIT_ADMIN_TOKEN=admin123456

INFLUX_URL=http://influxdb:8086
INFLUX_TOKEN=admin123456
INFLUX_ORG=docs
INFLUX_BUCKET=home

MQTT_HOST="mosquitto"
MQTT_PORT="1883"
MQTT_USERNAME="mestre"
MQTT_PASSWORD="mestre123"
```

## ▶️ Como Executar
# Clone o repositório
git clone https://github.com/ciencia-dados/api.git
cd api

# Suba os containers
docker-compose up --build


# 🧪 Exemplo de Payload para o MQTT

Com a utilização de um cliente MQTT pode ser enviado um playload com as parâmentros abaixo:


Servidor: localhost
Porta: 1883
Tópico: iot/leituras
Usuário: mestre
Senha: mestre123

```
{
  "espId": "ESP32-03",
  "valor": "botão",
  "timestamp": "2025-06-14T10:30:00Z"
}
```

# Acessos
A API estará acessível em: http://localhost:3000

O Grafana estará em: http://localhost:3001 com o dashboard Eventos IoT.

Usuário: admin, Senha: admin123456

O InfluxDB em: http://localhost:8086

Usuário: admin, Senha: admin123456

## 📚 Referências

- [NestJS Docs](https://docs.nestjs.com/)
- [InfluxDB Client JS](https://github.com/influxdata/influxdb-client-js)
- [MQTT Protocol](http://mqtt.org/)
- [Grafana Documentation](https://grafana.com/docs/)




# 📌 Licença
Este projeto é licenciado sob a MIT License.

---