import * as pino from 'pino';
import { CommandFunction } from '../commandFactory';
import PlayerModel from '../models/playerModel';
import { RoomExitDirection } from '../models/roomModel';

const moveInDirection = (
  logger: pino.Logger,
  player: PlayerModel,
  direction: RoomExitDirection
) => {
  const currentRoom = player.currentRoom;
  const directionExit = currentRoom.exits.find(
    (exit) => exit.direction === direction
  );
  if (!directionExit) return player.sendMessage('You cannot go that way');

  const newRoom = player.gameInstance.rooms.find(
    (room) => room.id === directionExit.roomId
  );
  if (!newRoom) {
    throw 'Room exit mapped to non existant room';
  }
  logger.debug(
    `Player ${player.id} moving from room ${currentRoom.id} to ${newRoom.id}`
  );
  player.currentRoom = newRoom;

  // TODO: #11 Come up with a better way of chaining commands.
  // logger.debug('Executing look command after moving');
  // player.processCommand('look');
};

const upCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  moveInDirection(logger, player, 'U');
};
const downCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  moveInDirection(logger, player, 'D');
};
const northCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  moveInDirection(logger, player, 'N');
};
const eastCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  moveInDirection(logger, player, 'E');
};
const southCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  moveInDirection(logger, player, 'S');
};
const westCommand: CommandFunction = (
  logger: pino.Logger,
  player: PlayerModel
): void => {
  moveInDirection(logger, player, 'W');
};

export {
  upCommand,
  downCommand,
  northCommand,
  eastCommand,
  southCommand,
  westCommand,

  moveInDirection
};
