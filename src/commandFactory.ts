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
export type CommandFactory = { [key: string]: CommandFunction };

/**
 * Commands appear multiple times under different names. This approach is used
 * to be explicit about which command string triggers which command function. If
 * the aliases were abstracted out into the requisut command files, it would be
 * easy to accidentally assign multiple commands to the same command string.
 *
 * This approach is a little messy but it will definately work for now and can
 * be adressed again at a later date if required.
 */
export default {
  look: lookCommand,
  playerCount: playerCountCommand,

  // Movement
  up: upCommand,
  u: upCommand,

  down: downCommand,
  d: downCommand,

  north: northCommand,
  n: northCommand,

  east: eastCommand,
  e: eastCommand,

  south: southCommand,
  s: southCommand,

  west: westCommand,
  w: westCommand,
};
