import * as pino from 'pino';
import CommandFactory from '../commandFactory';
import DaoFactory from '../daoFactory';
import Game from '../game';
import ModelFactory from '../modelFactory';
import ScreenFactory from '../screenFactory';
import AdventureScreen from '../screens/adventureScreen';
import LoginScreen from '../screens/loginScreen';
import PlayerModel from './playerModel';

/**
 * This interface provides the ConnectionModel with a way of sending data to the
 * connected client.
 */
export type MessageWriterFunction = (message: string) => void;

export type RenderMode = 'TEXT' | 'JSON';

export default class ConnectionModel {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private clientMessageWriter: MessageWriterFunction;
  private gameInstance: Game;
  private commandFactory: CommandFactory;
  private logger: pino.Logger;
  private screenFactory: ScreenFactory;

  public renderMode: RenderMode;

  public player!: PlayerModel;
  public currentScreen!: AdventureScreen | LoginScreen;

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

    this.renderMode = 'TEXT';

    // Shortcut, auth player
    // this.authenticatePlayer(1);

    this.currentScreen = new screenFactory.login(this, this.logger);
  }

  get isAuthenitcated(): boolean {
    return !!this.player;
  }

  async authenticatePlayer(
    username: string,
    password: string
  ): Promise<boolean> {
    const player = this.ModelFactory.player.fetchPlayerByUsername(
      this.ModelFactory,
      this.DaoFactory,
      this,
      this.gameInstance,
      this.commandFactory,
      this.logger,
      username
    );
    if (player) {
      const passwordIsValid = await player.validatePassword(password);
      if (passwordIsValid) {
        this.player = player;
        return true;
      }
    }
    return false;
  }

  switchScreenToAdventure(): void {
    this.currentScreen = new this.screenFactory.adventure(
      this,
      this.logger,
      this.commandFactory
    );
  }

  clientInputHandler(data: string): void {
    // this.sendMessage('RESPONSE!' + data);
    // if (this.isAuthenitcated) {
    //   return this.player.processCommand(data);
    // }

    // // TODO: Implement auth handler
    // this.logger.debug('Not Authed');
    // return undefined;
    this.currentScreen.inputHandler(data);
  }

  sendMessage(message: string, renderNewLine = true): void {
    this.clientMessageWriter(`${message}${renderNewLine ? '\n' : ' '}`);
  }
}
