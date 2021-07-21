import ModelFactory from './modelFactory';
import ConnectionModel, {
  MessageWriterFunction,
} from './models/connectionModel';
import PlayerModel from './models/playerModel';

/**
 * This class represents the actual running game. It's responsible for managing
 * all state within the game.
 */
export default class Game {
  private ModelFactory: ModelFactory;

  private connections: ConnectionModel[];

  constructor(ModelFactory: ModelFactory) {
    this.ModelFactory = ModelFactory;

    this.connections = [];
  }

  get players(): PlayerModel[] {
    return this.connections
      .filter((connection) => connection.isAuthenitcated)
      .map((connection) => connection.player);
  }

  createConnection(messageWriter: MessageWriterFunction): ConnectionModel {
    const newConnection = new this.ModelFactory.connection(
      this.ModelFactory,
      messageWriter,
      this
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
