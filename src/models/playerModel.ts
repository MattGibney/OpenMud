import Game from '../game';
import ConnectionModel from './connectionModel';
import CommandFactory from '../commandFactory';
import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import RoomModel from './roomModel';
import pino from 'pino';

export interface ParsedCommand {
  instruction: string;
}

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
    logger: pino.Logger
  ) {
    this.id = 1;
    this.currentRoomId = 1;

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

  processCommand(rawCommand: string): void {
    const command: ParsedCommand = this.parseCommand(rawCommand);

    const commandFunction = this.commandFactory.getCommandFunction(
      command.instruction
    );
    if (!commandFunction) {
      return this.sendMessage('Command not recognised');
    }
    return commandFunction(this.logger, this);
  }

  parseCommand(rawCommand: string): ParsedCommand {
    const instruction = rawCommand.split(' ')[0];
    return {
      instruction: instruction,
    };
  }

  sendMessage(message: string): void {
    return this.connection.sendMessage(message);
  }

  static createPlayer(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory,
    logger: pino.Logger
  ): PlayerModel {
    return new PlayerModel(
      ModelFactory,
      DaoFactory,
      connection,
      gameInstance,
      commandFactory,
      logger
    );
  }
}
