# kafka-ecosystem-docker-compose

### configure kafka
in docker-compose.yml

KAFKA_CREATE_TOPICS: 'example-topic:3:1'

will create topic `example-topic` with `3 partitions` and `1 replica`

the image used in this repo is and ENV vars are described here:

https://hub.docker.com/r/wurstmeister/kafka


### to run
newer versions of docker ( Docker Engine 18.06.0 or above ) use:
```sh
docker compose up --detach

```

Alternatively use docker-compose binary
```sh

docker-compose up --detach

```

and to publish to ecosystem one can POST to Post.py from local computer 

e.g.
```bash
cd ./pub_api
python3 post.py green eggs 123
```

see the consumer collecting messages and printing to std out, use

with `docker logs -f subscriber_container_id`

another way to consume / subscribe is to 
 exec into the kafka container
```sh
docker exec -it <kafka-container-id> /bin/bash
```
and run these commnds in kafka container
```bash
cd /opt/kafka/bin

./kafka-console-consumer.sh --topic example-topic --bootstrap-server "127.0.0.1:9092" --from-beginning  --property print.key=true --property print.headers=true --property print.timestamp=true
```

### references
`kafkajs` npm lib to connect to kafka broker/cluster
https://kafka.js.org/

Kafka Docker: Run multiple Kafka brokers in Docker
http://wurstmeister.github.io/kafka-docker/

github
https://github.com/wurstmeister/kafka-docker