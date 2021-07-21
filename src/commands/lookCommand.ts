import PlayerModel from '../models/playerModel';

export default (player: PlayerModel): void => {
  const currentRoom = player.currentRoom;
  player.sendMessage(
    `${currentRoom.title}
${currentRoom.description}

There are ${currentRoom.playersInRoom.length} players here.

Exits: ${currentRoom.exits.map((exit) => exit.direction)}`
  );
};
