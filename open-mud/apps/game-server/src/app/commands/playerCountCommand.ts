import pino from 'pino';
import { CommandFunction } from '../commandFactory';
import PlayerModel from '../models/playerModel';

const playerCountCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  logger.debug('Player Count Command');
  player.sendMessage(
    `There are ${player.gameInstance.players.length} players online`
  );
};

export default playerCountCommand;
