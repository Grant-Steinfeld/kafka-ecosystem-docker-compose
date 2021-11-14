const { Kafka } = require("kafkajs");
import { Post } from "../interfaces";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.INTERNAL_KAFKA_ADDR]
});

const producer = kafka.producer();

export async function publish(msg: Post) {
  await producer.connect();

  console.log("........");
  console.log(msg);

  await producer.send({
    topic: process.env.TOPIC,
    messages: [{ value: msg.title }],
  });
}
