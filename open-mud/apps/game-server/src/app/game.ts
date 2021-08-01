import pino from 'pino';
import CommandFactory from './commandFactory';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';
import ConnectionModel, {
  MessageWriterFunction,
} from './models/connectionModel';
import PlayerModel from './models/playerModel';
import RoomModel from './models/roomModel';
import ScreenFactory from './screenFactory';

/**
 * This class represents the actual running game. It's responsible for managing
 * all state within the game.
 */
export default class Game {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private connections: ConnectionModel[];
  private commandFactory: CommandFactory;
  private screenFactory: ScreenFactory;
  private logger: pino.Logger;

  public rooms: RoomModel[];

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    logger: pino.Logger
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.commandFactory = new CommandFactory();
    this.screenFactory = new ScreenFactory();
    this.logger = logger;

    this.connections = [];
    this.rooms = [];
  }

  initialise(): void {
    this.logger.info('Initialising game instance');

    this.logger.info('Setting up rooms');
    this.rooms = this.ModelFactory.room.fetchAllRooms(
      this.ModelFactory,
      this.DaoFactory,
      this
    );
    this.logger.info(`Found ${this.rooms.length} rooms.`);

    this.logger.info('Game ready');
  }

  get players(): PlayerModel[] {
    this.logger.debug('Fetching players for authenticated connections');
    return this.connections
      .filter((connection) => connection.isAuthenitcated)
      .map((connection) => connection.player);
  }

  createConnection(messageWriter: MessageWriterFunction): ConnectionModel {
    const newConnection = new this.ModelFactory.connection(
      this.ModelFactory,
      this.DaoFactory,
      messageWriter,
      this,
      this.commandFactory,
      this.logger,
      this.screenFactory
    );

    this.logger.info('New user connection established');

    this.connections.push(newConnection);
    return newConnection;
  }

  closeConnection(connection: ConnectionModel): void {
    this.logger.info('User disconnected');
    const index = this.connections.indexOf(connection);
    if (index > -1) {
      this.connections.splice(index, 1);
    }
  }
}
