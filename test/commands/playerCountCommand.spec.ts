import Sinon from 'sinon';
import playerCountCommand from '../../src/commands/playerCountCommand';
import Game from '../../src/game';
import ConnectionModel from '../../src/models/connectionModel';
import PlayerModel from '../../src/models/playerModel';

describe('playerCountCommand', function () {
  it('sends a message to the player with a count of active players', function () {
    const mockConnection = {} as ConnectionModel;
    const mockGameInstance = {
      players: [{}],
    } as Game;
    const player = new PlayerModel(mockConnection, mockGameInstance, {});

    const stubSendMessage = Sinon.stub(player, 'sendMessage');

    playerCountCommand(player);

    Sinon.assert.calledWith(stubSendMessage, 'There are 1 players online');
  });
});
