import pino from 'pino';

import ModelFactory from './modelFactory';
import DaoFactory from './daoFactory';
import Game from './game';
import telnet from './networking/telnetServer';
import CommandFactory from './commandFactory';
import environment from '../config/environment';

const logger = pino({
  level: 'debug',
});

const modelFactory = new ModelFactory();
const daoFactory = new DaoFactory();
const commandFactory = new CommandFactory();
const game = new Game(modelFactory, daoFactory, commandFactory, logger);

game.initialise();

// Telnet Server
const telnetServer = telnet(game);
telnetServer.listen(environment.telnetPort, () =>
  logger.info(`Listening to telnet connections on ${environment.telnetPort}`)
);
