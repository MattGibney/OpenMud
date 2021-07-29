import pino from 'pino';

import ModelFactory from './modelFactory';
import DaoFactory from './daoFactory';
import Game from './game';
import telnet from './networking/telnetServer';
import environment from '../config/environment';

const logger = pino({
  level: 'debug',
});

const modelFactory = new ModelFactory();
const daoFactory = new DaoFactory();
const game = new Game(modelFactory, daoFactory, logger);

game.initialise();

// Telnet Server
const telnetServer = telnet(game);
telnetServer.listen(environment.telnetPort, () =>
  logger.info(`Listening to telnet connections on ${environment.telnetPort}`)
);
