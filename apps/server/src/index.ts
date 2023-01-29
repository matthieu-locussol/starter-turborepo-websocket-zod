import FastifyWebSocketPlugin from '@fastify/websocket';
import Fastify from 'fastify';
import type { Schema } from 'shared';
import { isSchema } from 'shared';

const a: Schema = {
   type: 'a',
   variable: 1,
};

if (isSchema(a)) {
   console.log('a is a Schema!');
} else {
   console.log('a is not a Schema [wtf]');
}

const fastifyInstance = Fastify();

fastifyInstance.register(FastifyWebSocketPlugin);
fastifyInstance.register(async (fastify) => {
   fastify.get('/', { websocket: true }, (connection, req) => {
      console.log(`Connection from ${JSON.stringify(req.socket.address())}!`);

      connection.socket.onerror = (err) => console.error(err.message);

      connection.socket.onmessage = (event) => {
         const data = JSON.parse(event.data.toString());
         console.log(`Received: ${data} (${event.data.toString()})`);
      };

      connection.socket.onclose = () => {
         console.log('Connection closed.');
      };
   });
});

fastifyInstance.listen({ port: 3000 }, (err) => {
   if (err) {
      fastifyInstance.log.error(err);
      process.exit(1);
   }
});
