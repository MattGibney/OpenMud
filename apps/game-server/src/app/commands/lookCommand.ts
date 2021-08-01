import * as pino from 'pino';
import { CommandFunction } from '../commandFactory';
import PlayerModel from '../models/playerModel';

const lookCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  logger.debug('Look Command');
  const currentRoom = player.currentRoom;
  player.sendMessage(
    `${currentRoom.title}
${currentRoom.description}

There are ${currentRoom.playersInRoom.length} players here.

Exits: ${currentRoom.exits.map((exit) => exit.direction)}`
  );
};

export default lookCommand;
