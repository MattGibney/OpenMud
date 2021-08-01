import pino from 'pino';
import lookCommand from './commands/lookCommand';
import {
  upCommand,
  downCommand,
  northCommand,
  eastCommand,
  southCommand,
  westCommand,
} from './commands/moveCommand';
import playerCountCommand from './commands/playerCountCommand';
import PlayerModel from './models/playerModel';

export type CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
) => void;

const commands = new Map();
commands.set('look', lookCommand);
commands.set('playerCount', playerCountCommand);

commands.set('up', upCommand);
commands.set('down', downCommand);
commands.set('north', northCommand);
commands.set('east', eastCommand);
commands.set('south', southCommand);
commands.set('west', westCommand);

export default class CommandFactory {
  getCommandFunction(commandInstruction: string): CommandFunction | null {
    if (commands.has(commandInstruction)) {
      return commands.get(commandInstruction);
    }
    return null;
  }
}
