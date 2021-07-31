import Game from '../game';
import ConnectionModel from './connectionModel';
import CommandFactory from '../commandFactory';
import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import RoomModel from './roomModel';
import pino from 'pino';
import bcrypt from 'bcrypt';
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

  sendMessage(message: string): void {
    return this.connection.sendMessage(message);
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
