const net = require('net');
const path = require('path');

const pipeName1 = '\\\\.\\pipe\\test-mcp-pipe-local';
const pipeName2 = '\\\\?\\pipe\\test-mcp-pipe-long';

function testPipe(pipeName) {
  return new Promise((resolve) => {
    console.log(`Testing pipe: ${pipeName}`);
    const server = net.createServer((socket) => {
      console.log(`[Server] Client connected on ${pipeName}`);
      socket.end('hello');
    });

    server.listen(pipeName, () => {
      console.log(`[Server] Listening on ${pipeName}`);
      const client = net.createConnection(pipeName);
      client.on('data', (data) => {
        console.log(`[Client] Received: ${data.toString()}`);
      });
      client.on('connect', () => {
        console.log(`[Client] Connected to ${pipeName}`);
        client.end();
      });
      client.on('error', (err) => {
        console.error(`[Client] Error connecting to ${pipeName}: ${err.message}`);
        server.close(() => resolve(false));
      });
      client.on('close', () => {
        server.close(() => resolve(true));
      });
    });

    server.on('error', (err) => {
      console.error(`[Server] Error on ${pipeName}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  const res1 = await testPipe(pipeName1);
  console.log(`Pipe 1 result: ${res1}\n`);
  const res2 = await testPipe(pipeName2);
  console.log(`Pipe 2 result: ${res2}\n`);
}

run();
