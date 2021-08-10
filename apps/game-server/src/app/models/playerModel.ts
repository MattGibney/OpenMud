import Game from '../game';
import ConnectionModel from './connectionModel';
import CommandFactory, { CommandFunction } from '../commandFactory';
import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import RoomModel from './roomModel';
import * as pino from 'pino';
import * as bcrypt from 'bcrypt';
import { PlayerData } from '../daos/playerDao';

export default class PlayerModel {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private connection: ConnectionModel;
  private commandFactory: CommandFactory;
  public gameInstance: Game;
  private logger: pino.Logger;

  private currentRoomId: number;
  public id: number;
  public username: string;
  private passwordHash: string;

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory,
    logger: pino.Logger,
    playerData: PlayerData
  ) {
    this.id = playerData.id;
    this.currentRoomId = playerData.currentRoomId;
    this.username = playerData.username;
    this.passwordHash = playerData.password;

    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.connection = connection;
    this.gameInstance = gameInstance;
    this.commandFactory = commandFactory;
    this.logger = logger.child({ playerId: this.id });
  }

  get currentRoom(): RoomModel {
    const currentRoom = this.gameInstance.rooms.find(
      (room) => room.id === this.currentRoomId
    );
    if (!currentRoom) {
      throw 'Player is in a room that does not exist!';
    }
    return currentRoom;
  }

  set currentRoom(room: RoomModel) {
    this.currentRoomId = room.id;
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
  }

  executeCommand(command: CommandFunction) {
    command(this.logger, this, this.connection.renderMode);
  }

  sendMessage(message: string): void {
    // TODO: Replace this when supporting return types other than strings
    const messageAsString = message.toString();
    return this.connection.sendMessage(messageAsString);
  }

  static fetchPlayerByUsername(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory,
    logger: pino.Logger,
    username: string
  ): PlayerModel | null {
    const playerData = DaoFactory.player.fetchPlayerByUsername(username);
    if (!playerData) return null;

    return new PlayerModel(
      ModelFactory,
      DaoFactory,
      connection,
      gameInstance,
      commandFactory,
      logger,
      playerData
    );
  }
}
