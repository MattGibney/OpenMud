import Game from '../game';
import ConnectionModel from './connectionModel';

import commandFactory, {
  CommandFactory,
  CommandFunction,
} from '../commandFactory';

export interface ParsedCommand {
  instruction: keyof typeof commandFactory;
}

export default class PlayerModel {
  private connection: ConnectionModel;
  private commandFactory: CommandFactory;
  public gameInstance: Game;

  constructor(
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory
  ) {
    this.connection = connection;
    this.gameInstance = gameInstance;

    this.commandFactory = commandFactory;
  }

  processCommand(rawCommand: string): void {
    const command: ParsedCommand = this.parseCommand(rawCommand);

    const commandFunction: CommandFunction =
      this.commandFactory[command.instruction];
    if (!commandFunction) {
      return this.sendMessage('Command not recognised');
    }
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
    connection: ConnectionModel,
    gameInstance: Game,
    commandFactory: CommandFactory
  ): PlayerModel {
    return new PlayerModel(connection, gameInstance, commandFactory);
  }
}
