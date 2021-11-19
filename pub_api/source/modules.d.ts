declare namespace NodeJS {
  export interface ProcessEnv {
    INTERNAL_KAFKA_ADDR: string;
    EXTERNAL_KAFKA_ADDR: string;
    TOPIC: string;
    PORT: string;
  }
}
