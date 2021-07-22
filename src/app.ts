import ModelFactory from './modelFactory';
import DaoFactory from './daoFactory';
import Game from './game';
import telnet from './networking/telnetServer';
import commandFactory from './commandFactory';
import environment from '../config/environment';

const modelFactory = new ModelFactory();
const daoFactory = new DaoFactory();
const game = new Game(modelFactory, daoFactory, commandFactory);

game.initialise();

// Telnet Server
const telnetServer = telnet(game);
telnetServer.listen(environment.telnetPort, () =>
  console.log(`Listening to telnet connections on ${environment.telnetPort}`)
);
