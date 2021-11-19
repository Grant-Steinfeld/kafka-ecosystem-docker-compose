"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const BROKER_HOST = process.env.ENVIRONMENT === "local"
    ? process.env.INTERNAL_KAFKA_ADDR
    : process.env.EXTERNAL_KAFKA_ADDR;
const kafka = new kafkajs_1.Kafka({
    clientId: "my-app",
    brokers: [BROKER_HOST],
});
const consumer = kafka.consumer({ groupId: "test-group" });
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true });
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Received: ", {
                partition,
                offset: message.offset,
                value: message.value,
            });
        }),
    });
});
run().catch(console.error);
