import * as net from 'net';
import Game from '../game';

export default (gameInstance: Game): net.Server => {
  const server = net.createServer((socket: net.Socket) => {
    const sendMessageFunction = function (message: string) {
      socket.write(message);
    };

    // On a new connection we create a new instance of the ConnectionModel
    const connection = gameInstance.createConnection(sendMessageFunction);

    socket.on('data', (data) => {
      connection.clientInputHandler(data.toString().trim());
    });

    socket.on('end', () => {
      gameInstance.closeConnection(connection);
    });
  });

  return server;
};
