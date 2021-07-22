import Game from '../game';
import ConnectionModel from './connectionModel';

import commandFactory, {
  CommandFactory,
  CommandFunction,
} from '../commandFactory';
import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import RoomModel from './roomModel';

export interface ParsedCommand {
  instruction: keyof typeof commandFactory;
}

export default class PlayerModel {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private connection: ConnectionModel;
  private commandFactory: CommandFactory;
  private currentRoomId: number;
  public gameInstance: Game;

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.connection = connection;
    this.gameInstance = gameInstance;

    this.commandFactory = commandFactory;

    this.currentRoomId = 1;
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

    // Validating the command factory actually has the command. This is
    // validating user provided data. The Object.prototype route is also a
    // securtity measure https://eslint.org/docs/rules/no-prototype-builtins
    if (
      !Object.prototype.hasOwnProperty.call(
        this.commandFactory,
        command.instruction
      )
    ) {
      return this.sendMessage('Command not recognised');
    }
    const commandFunction: CommandFunction =
      this.commandFactory[command.instruction];
    return commandFunction(this);
  }

  parseCommand(rawCommand: string): ParsedCommand {
    const instruction = rawCommand.split(' ')[0] as keyof typeof commandFactory;
    return {
      instruction: instruction,
    };
  }

  sendMessage(message: string): void {
    return this.connection.sendMessage(`${message}\n`);
  }

  static createPlayer(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory
  ): PlayerModel {
    return new PlayerModel(
      ModelFactory,
      DaoFactory,
      connection,
      gameInstance,
      commandFactory
    );
  }
}
