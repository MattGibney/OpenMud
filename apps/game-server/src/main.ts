import * as pino from 'pino';

import ModelFactory from './app/modelFactory';
import DaoFactory from './app/daoFactory';
import Game from './app/game';
import telnet from './app/networking/telnetServer';
import environment from './environments/environment';

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
