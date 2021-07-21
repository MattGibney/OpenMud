import Sinon from 'sinon';
import playerCountCommand from '../../src/commands/playerCountCommand';
import DaoFactory from '../../src/daoFactory';
import Game from '../../src/game';
import ModelFactory from '../../src/modelFactory';
import ConnectionModel from '../../src/models/connectionModel';
import PlayerModel from '../../src/models/playerModel';

describe('playerCountCommand', function () {
  it('sends a message to the player with a count of active players', function () {
    const mockModelFactory = {} as ModelFactory;
    const mockDaoFactory = {} as DaoFactory;
    const mockConnection = {} as ConnectionModel;
    const mockGameInstance = {
      players: [{}],
    } as Game;
    const player = new PlayerModel(
      mockModelFactory,
      mockDaoFactory,
      mockConnection,
      mockGameInstance,
      {}
    );

    const stubSendMessage = Sinon.stub(player, 'sendMessage');

    playerCountCommand(player);

    Sinon.assert.calledWith(stubSendMessage, 'There are 1 players online');
  });
});
