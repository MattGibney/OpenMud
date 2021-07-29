import pino from 'pino';
import CommandFactory from '../commandFactory';
import ConnectionModel from '../models/connectionModel';

export interface ParsedCommand {
  instruction: string;
}

export default class AdventureScreen {
  private connection: ConnectionModel;
  private commandFactory: CommandFactory;
  private logger: pino.Logger;

  constructor(
    connectionModel: ConnectionModel,
    commandFactory: CommandFactory,
    logger: pino.Logger
  ) {
    this.connection = connectionModel;
    this.commandFactory = commandFactory;
    this.logger = logger;
  }

  processCommand(rawCommand: string): void {
    const command: ParsedCommand = this.parseCommand(rawCommand);

    const commandFunction = this.commandFactory.getCommandFunction(
      command.instruction
    );
    if (!commandFunction) {
      return this.sendMessage('Command not recognised');
    }
    return commandFunction(this.logger, this.connection.player);
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
}
