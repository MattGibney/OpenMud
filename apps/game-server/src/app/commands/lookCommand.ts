import * as pino from 'pino';
import { CommandFunction } from '../commandFactory';
import { RenderMode } from '../models/connectionModel';
import PlayerModel from '../models/playerModel';
import RoomModel, { RoomExitDirection } from '../models/roomModel';

export interface LookData {
  title: string;
  description: string;
  numPlayersInRoom: number;
  exitDirections: RoomExitDirection[];
};

const lookCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel,
  renderMode: RenderMode
): void => {
  logger.debug('Look Command');
  const lookData = getRoomData(player.currentRoom);

  if (renderMode === 'TEXT') {
    return player.sendMessage(renderLook(lookData));
  }
  return; // player.sendMessage();
};

export function getRoomData(playerCurrentRoom: RoomModel): LookData {
  return {
    title: playerCurrentRoom.title,
    description: playerCurrentRoom.description,
    numPlayersInRoom: playerCurrentRoom.playersInRoom.length,
    exitDirections: playerCurrentRoom.exits.map((exit) => exit.direction)
  };
}

export function renderLook(lookData: LookData) {
  return `${lookData.title}
${lookData.description}

There are ${lookData.numPlayersInRoom} players here.

Exits: ${lookData.exitDirections}`
}

export default lookCommand;

