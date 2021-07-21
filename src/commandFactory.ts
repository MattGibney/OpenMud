import lookCommand from './commands/lookCommand';
import playerCountCommand from './commands/playerCountCommand';
import PlayerModel from './models/playerModel';

export type CommandFunction = (player: PlayerModel) => void;
export type CommandFactory = { [key: string]: CommandFunction };

export default {
  look: lookCommand,
  playerCount: playerCountCommand,
};
