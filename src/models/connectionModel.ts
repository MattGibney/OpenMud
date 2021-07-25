import pino from 'pino';
import CommandFactory from '../commandFactory';
import DaoFactory from '../daoFactory';
import Game from '../game';
import ModelFactory from '../modelFactory';
import PlayerModel from './playerModel';

/**
 * This interface provides the ConnectionModel with a way of sending data to the
 * connected client.
 */
export type MessageWriterFunction = (message: string) => void;

export default class ConnectionModel {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private clientMessageWriter: MessageWriterFunction;
  private gameInstance: Game;
  private commandFactory: CommandFactory;
  private logger: pino.Logger;

  public player!: PlayerModel;

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    messageWriter: MessageWriterFunction,
    gameInstance: Game,
    commandFactory: CommandFactory,
    logger: pino.Logger
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.clientMessageWriter = messageWriter;
    this.gameInstance = gameInstance;
    this.commandFactory = commandFactory;
    this.logger = logger;
  }

  get isAuthenitcated(): boolean {
    return !!this.player;
  }

  authenticatePlayer(): void {
    this.player = this.ModelFactory.player.createPlayer(
      this.ModelFactory,
      this.DaoFactory,
      this,
      this.gameInstance,
      this.commandFactory,
      this.logger
    );
  }

  clientInputHandler(data: string): void {
    // this.sendMessage('RESPONSE!' + data);
    if (this.isAuthenitcated) {
      return this.player.processCommand(data);
    }

    // TODO: Implement auth handler
    return undefined;
  }

  sendMessage(message: string): void {
    this.clientMessageWriter(`${message}\n`);
  }
}
