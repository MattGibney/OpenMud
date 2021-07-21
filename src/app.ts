import ModelFactory from './modelFactory';
import Game from './game';

import telnet from './networking/telnetServer';
import commandFactory from './commandFactory';
import DaoFactory from './daoFactory';

const modelFactory = new ModelFactory();
const daoFactory = new DaoFactory();
const game = new Game(modelFactory, daoFactory, commandFactory);

game.initialise();

// Telnet Server
const telnetServer = telnet(game);
telnetServer.listen(3200, () =>
  console.log('Listening to telnet connections on 3100')
);
