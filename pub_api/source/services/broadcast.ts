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

  let msgDict: any = {};
  if(msg.messageType === "JSON"){
    msgDict = {  key: msg.id, value: JSON.stringify(msg) }
  } else {
    if(msg.messageType === "TEXT"){
      msgDict = { key: msg.id, value: msg.body }
    }
    else
    {
      throw `unsupported type  ${msg.messageType}`
    }
  }



  const response_ = await producer.send({
    topic: process.env.TOPIC,
    messages: [msgDict],
  });

  console.log(response_);
}
