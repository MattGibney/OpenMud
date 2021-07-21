import PlayerModel from '../models/playerModel';

export default (player: PlayerModel): void => {
  // console.log('COMMAND!!');
  player.sendMessage(
    `There are ${player.gameInstance.players.length} players online`
  );
};
