import Game from '../game';
import ConnectionModel from './connectionModel';

import commandFactory, { CommandFunction } from '../commandFactory';

export interface ParsedCommand {
  instruction: keyof typeof commandFactory;
}

export default class PlayerModel {
  private connection: ConnectionModel;
  public gameInstance: Game;

  constructor(connection: ConnectionModel, gameInstance: Game) {
    this.connection = connection;
    this.gameInstance = gameInstance;
  }

  processCommand(rawCommand: string): void {
    const command: ParsedCommand = this.parsedCommand(rawCommand);

    const commandFunction: CommandFunction =
      commandFactory[command.instruction];
    if (!commandFunction) {
      return this.sendMessage('Command not recognised');
    }
    return commandFunction(this);
  }

  parsedCommand(rawCommand: string): ParsedCommand {
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
    gameInstance: Game
  ): PlayerModel {
    return new PlayerModel(connection, gameInstance);
  }
}