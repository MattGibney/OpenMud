import { CommandFactory } from '../commandFactory';
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
  private clientMessageWriter: MessageWriterFunction;
  private gameInstance: Game;
  private commandFactory: CommandFactory;

  public player!: PlayerModel;

  constructor(
    ModelFactory: ModelFactory,
    messageWriter: MessageWriterFunction,
    gameInstance: Game,
    commandFactory: CommandFactory
  ) {
    this.ModelFactory = ModelFactory;
    this.clientMessageWriter = messageWriter;
    this.gameInstance = gameInstance;
    this.commandFactory = commandFactory;
  }

  get isAuthenitcated(): boolean {
    return !!this.player;
  }

  authenticatePlayer(): void {
    this.player = this.ModelFactory.player.createPlayer(
      this,
      this.gameInstance,
      this.commandFactory
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
    this.clientMessageWriter(message);
  }
}
