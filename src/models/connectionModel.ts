import pino from 'pino';
import CommandFactory from '../commandFactory';
import DaoFactory from '../daoFactory';
import Game from '../game';
import ModelFactory from '../modelFactory';
import ScreenFactory from '../screenFactory';
import AdventureScreen from '../screens/adventureScreen';
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
  private screenFactory: ScreenFactory;

  public player!: PlayerModel;
  public currentScreen!: AdventureScreen;

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    messageWriter: MessageWriterFunction,
    gameInstance: Game,
    commandFactory: CommandFactory,
    logger: pino.Logger,
    screenFactory: ScreenFactory
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.clientMessageWriter = messageWriter;
    this.gameInstance = gameInstance;
    this.commandFactory = commandFactory;
    this.logger = logger;
    this.screenFactory = screenFactory;

    // Shortcut, auth player
    this.authenticatePlayer(1);

    this.currentScreen = new screenFactory.adventure(
      this,
      this.commandFactory,
      this.logger
    );
  }

  get isAuthenitcated(): boolean {
    return !!this.player;
  }

  authenticatePlayer(playerId: number): void {
    const player = this.ModelFactory.player.fetchPlayerById(
      this.ModelFactory,
      this.DaoFactory,
      this,
      this.gameInstance,
      this.commandFactory,
      this.logger,
      playerId
    );
    if (player) {
      this.player = player;
    }
  }

  clientInputHandler(data: string): void {
    // this.sendMessage('RESPONSE!' + data);
    // if (this.isAuthenitcated) {
    //   return this.player.processCommand(data);
    // }

    // // TODO: Implement auth handler
    // this.logger.debug('Not Authed');
    // return undefined;
    this.currentScreen.processCommand(data);
  }

  sendMessage(message: string): void {
    this.clientMessageWriter(`${message}\n`);
  }
}
