const { Kafka } = require("kafkajs");
import { Post } from "../interfaces";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.INTERNAL_KAFKA_ADDR]
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
