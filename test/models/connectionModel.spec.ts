import { assert } from 'chai';
import sinon, { stub } from 'sinon';
import Game from '../../src/game';
import ModelFactory from '../../src/modelFactory';
import DaoFactory from '../../src/daoFactory';
import ConnectionModel from '../../src/models/connectionModel';
import PlayerModel from '../../src/models/playerModel';

describe('ConnectionModel', function () {
  describe('authenticatePlayer', function () {
    it('should set the player property to a PlayerModel instance', function () {
      const fakePlayerModel = {} as PlayerModel;
      const createPlayerStub = sinon.stub().returns(fakePlayerModel);
      const mockModelFactory: ModelFactory = {
        player: {
          createPlayer: createPlayerStub,
        } as unknown as typeof PlayerModel,
      } as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockGameInstance: Game = {} as Game;

      const connection = new ConnectionModel(
        mockModelFactory,
        mockDaoFactory,
        sinon.stub(),
        mockGameInstance,
        {}
      );

      connection.authenticatePlayer();

      sinon.assert.calledWith(
        createPlayerStub,
        mockModelFactory,
        mockDaoFactory,
        connection,
        mockGameInstance
      );
      assert.equal(connection.player, fakePlayerModel);
    });
  });
  describe('clientInputHandler', function () {
    it('should call the player process command method when authenticated', () => {
      const modelFactory: ModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const gameInstance: Game = {} as Game;

      const mockMessageWriter = sinon.stub();
      const connection = new ConnectionModel(
        modelFactory,
        mockDaoFactory,
        mockMessageWriter,
        gameInstance,
        {}
      );

      const mockPlayerStubProcessCommand = stub();
      const mockPlayer: PlayerModel = {
        processCommand: mockPlayerStubProcessCommand,
      } as unknown as PlayerModel;
      stub(connection, 'authenticatePlayer').callsFake(() => {
        connection.player = mockPlayer;
      });
      connection.authenticatePlayer();

      connection.clientInputHandler('This is a test');
      sinon.assert.calledWith(mockPlayerStubProcessCommand, 'This is a test');
    });

    it('should return undefined when the player is not authenticated', () => {
      const modelFactory: ModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const gameInstance: Game = {} as Game;

      const mockMessageWriter = sinon.stub();

      const connection = new ConnectionModel(
        modelFactory,
        mockDaoFactory,
        mockMessageWriter,
        gameInstance,
        {}
      );

      const response = connection.clientInputHandler('This is a test');

      assert.isUndefined(response);
    });
  });
  describe('sendMessage', function () {
    it('uses the callback to send a message to the connected client.', function () {
      const modelFactory: ModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const gameInstance: Game = {} as Game;

      const mockMessageWriter = sinon.stub();
      const connection = new ConnectionModel(
        modelFactory,
        mockDaoFactory,
        mockMessageWriter,
        gameInstance,
        {}
      );

      connection.sendMessage('This is a test');

      sinon.assert.calledWith(mockMessageWriter, 'This is a test');
    });
  });
});
