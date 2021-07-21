import Sinon from 'sinon';
import lookCommand from '../../src/commands/lookCommand';
import DaoFactory from '../../src/daoFactory';
import Game from '../../src/game';
import ModelFactory from '../../src/modelFactory';
import ConnectionModel from '../../src/models/connectionModel';
import PlayerModel from '../../src/models/playerModel';

describe('lookCommand', function () {
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

    Sinon.stub(player, 'currentRoom').get(() => ({
      title: 'Test Room',
      description: 'Test Description',
      playersInRoom: [{}],
    }));

    const stubSendMessage = Sinon.stub(player, 'sendMessage');

    lookCommand(player);

    Sinon.assert.calledWith(
      stubSendMessage,
      'Test Room\nTest Description\nThere are 1 players here.'
    );
  });
});
