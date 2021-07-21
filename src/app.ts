import ModelFactory from './modelFactory';
import Game from './game';

import telnet from './networking/telnetServer';
import commandFactory from './commandFactory';

const modelFactory = new ModelFactory();
const game = new Game(modelFactory, commandFactory);

// Telnet Server
const telnetServer = telnet(game);
telnetServer.listen(3100, () =>
  console.log('Listening to telnet connections on 3100')
);
