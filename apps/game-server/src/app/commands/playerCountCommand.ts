import * as pino from 'pino';
import { CommandFunction } from '../commandFactory';
import { RenderMode } from '../models/connectionModel';
import PlayerModel from '../models/playerModel';

const playerCountCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel,
  renderMode: RenderMode
): void => {
  logger.debug('Player Count Command');
  if (renderMode === 'TEXT') {
    player.sendMessage(
      `There are ${player.gameInstance.players.length} players online`
    );
  }
};

export default playerCountCommand;
