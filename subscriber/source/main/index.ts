import { Kafka } from "kafkajs";

const BROKER_HOST: string =
  process.env.ENVIRONMENT === "local"
    ? process.env.INTERNAL_KAFKA_ADDR
    : process.env.EXTERNAL_KAFKA_ADDR;

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [BROKER_HOST],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      let msg: string = "null/undefine";

      if(message.value){
          msg = message.value.toString();
      }
 
      console.log(`Topic: ${topic} Received: `, {
        partition,
        offset: message.offset,
        value: msg,
        headers: message.headers
      });
    },
  });
};
run().catch(console.error);
