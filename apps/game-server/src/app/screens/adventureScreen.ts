import * as pino from 'pino';
import CommandFactory from '../commandFactory';
import ConnectionModel from '../models/connectionModel';
import BaseScreen from './baseScreen';

export interface ParsedCommand {
  instruction: string;
}

export default class AdventureScreen extends BaseScreen {
  private commandFactory: CommandFactory;

  constructor(
    connectionModel: ConnectionModel,
    logger: pino.Logger,
    commandFactory: CommandFactory
  ) {
    super(connectionModel, logger);
    this.commandFactory = commandFactory;
  }

  inputHandler(data: string): void {
    this.processInput(data);
  }

  processInput(rawCommand: string): void {
    const command: ParsedCommand = this.parseCommand(rawCommand);

    const commandFunction = this.commandFactory.getCommandFunction(
      command.instruction
    );
    if (!commandFunction) {
      return this.connection.sendMessage('Command not recognised');
    }
    return commandFunction(this.logger, this.connection.player);
  }

  parseCommand(rawCommand: string): ParsedCommand {
    const instruction = rawCommand.split(' ')[0];
    return {
      instruction: instruction,
    };
  }
}
