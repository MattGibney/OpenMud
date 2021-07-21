import PlayerModel from '../models/playerModel';
import { RoomExitDirection } from '../models/roomModel';

const moveInDirection = (player: PlayerModel, direction: RoomExitDirection) => {
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
  player.currentRoom = newRoom;

  // TODO: #11 Come up with a better way of chaining commands.
  player.processCommand('look');
};

const upCommand = (player: PlayerModel): void => {
  moveInDirection(player, 'U');
};
const downCommand = (player: PlayerModel): void => {
  moveInDirection(player, 'D');
};
const northCommand = (player: PlayerModel): void => {
  moveInDirection(player, 'N');
};
const eastCommand = (player: PlayerModel): void => {
  moveInDirection(player, 'E');
};
const southCommand = (player: PlayerModel): void => {
  moveInDirection(player, 'S');
};
const westCommand = (player: PlayerModel): void => {
  moveInDirection(player, 'W');
};

export {
  upCommand,
  downCommand,
  northCommand,
  eastCommand,
  southCommand,
  westCommand,
};
