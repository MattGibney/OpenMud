import playerCountCommand from './commands/playerCountCommand';
import PlayerModel from './models/playerModel';

export type CommandFunction = (player: PlayerModel) => void;

export default {
  playerCount: playerCountCommand,
};
