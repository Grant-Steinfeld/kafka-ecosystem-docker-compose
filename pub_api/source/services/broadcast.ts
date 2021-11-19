import { Kafka } from "kafkajs";
import { Post } from "../interfaces";

const BROKER_HOST: string =  process.env.ENVIRONMENT === 'local'
? process.env.INTERNAL_KAFKA_ADDR
: process.env.EXTERNAL_KAFKA_ADDR;

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [BROKER_HOST]
});

const producer = kafka.producer();

export async function publish(msg: Post, key: Number) {
  await producer.connect();

  console.log("........");
  console.log(msg);

  const response_ = await producer.send({
    topic: process.env.TOPIC,
    messages: [{ value: JSON.stringify(msg) }],
  });

  console.log(response_);
}
