import { assert } from 'chai';
import sinon from 'sinon';
import DaoFactory from '../../src/daoFactory';
import Game from '../../src/game';
import ModelFactory from '../../src/modelFactory';
import ConnectionModel from '../../src/models/connectionModel';
import PlayerModel from '../../src/models/playerModel';

describe('PlayerModel', function () {
  describe('(get) currentRoom', function () {
    it('should throw an exception if the player is in a non-existant room', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {
        rooms: [],
      } as unknown as Game;
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );

      const currentRoomSpy = sinon.spy(player, 'currentRoom', ['get']);

      try {
        player.currentRoom;
      } catch (e) {
        // Don't really care about this. We are asserting on the exception below.
      }

      sinon.assert.threw(
        currentRoomSpy.get,
        'Player is in a room that does not exist!'
      );
    });
    it('should return the room that the player is in', function () {
      const mockRoom = { id: 1 };

      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {
        rooms: [mockRoom],
      } as unknown as Game;
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );

      assert.equal(player.currentRoom, mockRoom);
    });
  });
  describe('processCommand', function () {
    it('should tell the play if they attempt a bad command', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {} as Game;
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );

      const stubSendMessage = sinon.stub(player, 'sendMessage');

      player.processCommand('TEST');

      sinon.assert.calledWith(stubSendMessage, 'Command not recognised');
    });
    it('should call the appropriate command when it exists', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {} as Game;
      const testCommand = sinon.stub();
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {
          testCommand: testCommand,
        }
      );

      const stubSendMessage = sinon.stub(player, 'sendMessage');

      player.processCommand('testCommand');

      sinon.assert.notCalled(stubSendMessage);
      sinon.assert.called(testCommand);
    });
  });
  describe('parseCommand', function () {
    it('removes everything after the first space', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {} as Game;
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );

      const parsedCommand = player.parseCommand('Test Command');
      assert.equal(parsedCommand.instruction, 'Test');
    });
    it('should support camelCase commands', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {} as Game;
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );

      const parsedCommand = player.parseCommand('TestCommand');
      assert.equal(parsedCommand.instruction, 'TestCommand');
    });
  });
  describe('sendMessage', function () {
    it('should call the send message method on the connection', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;

      const mockSendMessage = sinon.stub();
      const mockConnection = {
        sendMessage: mockSendMessage,
      } as unknown as ConnectionModel;
      const mockGameInstance = {} as Game;
      const player = new PlayerModel(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );

      player.sendMessage('This is a test message');
      sinon.assert.calledWith(mockSendMessage, 'This is a test message\n');
    });
  });
  describe('(static) createPlayer', function () {
    it('should create a new instance of the playerModel', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockConnection = {} as ConnectionModel;
      const mockGameInstance = {} as Game;
      const player = PlayerModel.createPlayer(
        mockModelFactory,
        mockDaoFactory,
        mockConnection,
        mockGameInstance,
        {}
      );
      assert.instanceOf(player, PlayerModel);
    });
  });
});
