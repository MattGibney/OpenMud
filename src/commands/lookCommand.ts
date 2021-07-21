import PlayerModel from '../models/playerModel';

export default (player: PlayerModel): void => {
  const currentRoom = player.currentRoom;
  player.sendMessage(
    `${currentRoom.title}\n${currentRoom.description}\nThere are ${currentRoom.playersInRoom.length} players here.`
  );
};
