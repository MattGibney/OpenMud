import { CommandFactory } from './commandFactory';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';
import ConnectionModel, {
  MessageWriterFunction,
} from './models/connectionModel';
import PlayerModel from './models/playerModel';
import RoomModel from './models/roomModel';

/**
 * This class represents the actual running game. It's responsible for managing
 * all state within the game.
 */
export default class Game {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private connections: ConnectionModel[];
  private commandFactory: CommandFactory;

  public rooms: RoomModel[];

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    commandFactory: CommandFactory
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.commandFactory = commandFactory;
    this.connections = [];

    this.rooms = [];
  }

  initialise(): void {
    this.rooms = this.ModelFactory.room.fetchAllRooms(
      this.ModelFactory,
      this.DaoFactory
    );
  }

  get players(): PlayerModel[] {
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
      this.commandFactory
    );

    // Auto authenticating as players currently have no state
    newConnection.authenticatePlayer();

    this.connections.push(newConnection);
    return newConnection;
  }

  closeConnection(connection: ConnectionModel): void {
    const index = this.connections.indexOf(connection);
    if (index > -1) {
      this.connections.splice(index, 1);
    }
  }
}
