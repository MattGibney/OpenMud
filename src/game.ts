import ModelFactory from './modelFactory';
import ConnectionModel, {
  MessageWriterFunction,
} from './models/connectionModel';

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

  createConnection(messageWriter: MessageWriterFunction): ConnectionModel {
    const newConnection = new this.ModelFactory.connection(messageWriter);
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
