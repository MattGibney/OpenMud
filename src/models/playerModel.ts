import Game from '../game';
import ConnectionModel from './connectionModel';
import CommandFactory from '../commandFactory';
import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import RoomModel from './roomModel';
import pino from 'pino';
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

  // processCommand(rawCommand: string): void {
  //   const command: ParsedCommand = this.parseCommand(rawCommand);

  //   const commandFunction = this.commandFactory.getCommandFunction(
  //     command.instruction
  //   );
  //   if (!commandFunction) {
  //     return this.sendMessage('Command not recognised');
  //   }
  //   return commandFunction(this.logger, this);
  // }

  // parseCommand(rawCommand: string): ParsedCommand {
  //   const instruction = rawCommand.split(' ')[0];
  //   return {
  //     instruction: instruction,
  //   };
  // }

  sendMessage(message: string): void {
    return this.connection.sendMessage(message);
  }

  static fetchPlayerById(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory,
    logger: pino.Logger,
    playerId: number
  ): PlayerModel | null {
    const playerData = DaoFactory.player.fetchPlayerById(playerId);
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
