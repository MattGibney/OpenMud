import { assert } from 'chai';
import DaoFactory from '../../src/daoFactory';
import Game from '../../src/game';
import ModelFactory from '../../src/modelFactory';
import PlayerModel from '../../src/models/playerModel';
import RoomModel from '../../src/models/roomModel';

describe('roomModel', function () {
  describe('constructor', function () {
    it('should populate the public properties correctly', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockGameInstance = {} as Game;

      const room = new RoomModel(
        mockModelFactory,
        mockDaoFactory,
        mockGameInstance,
        {
          id: 11,
          title: 'Test Title',
          description: 'This is a description',
        }
      );

      assert.equal(room.id, 11);
      assert.equal(room.title, 'Test Title');
      assert.equal(room.description, 'This is a description');
    });
  });
  describe('(get) playersInRoom', function () {
    it('should return an array of players in the room', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {} as DaoFactory;
      const mockGameInstance = { players: [] } as unknown as Game;

      const room = new RoomModel(
        mockModelFactory,
        mockDaoFactory,
        mockGameInstance,
        {
          id: 11,
          title: 'Test Title',
          description: 'This is a description',
        }
      );

      const mockPlayerOne = { currentRoom: room } as PlayerModel;
      mockGameInstance.players.push(mockPlayerOne);

      assert.deepEqual(room.playersInRoom, [mockPlayerOne]);
    });
  });
  describe('fetchAllRooms', function () {
    it('should return an array of RoomModels', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {
        room: {
          fetchAllRooms: () => {
            return [{}];
          },
        },
      } as DaoFactory;
      const mockGameInstance = {} as Game;

      const rooms = RoomModel.fetchAllRooms(
        mockModelFactory,
        mockDaoFactory,
        mockGameInstance
      );

      assert.instanceOf(rooms[0], RoomModel);
    });
    it('should return an empty array if there are no rooms', function () {
      const mockModelFactory = {} as ModelFactory;
      const mockDaoFactory = {
        room: {
          fetchAllRooms: () => {
            return [];
          },
        },
      } as DaoFactory;
      const mockGameInstance = {} as Game;

      const rooms = RoomModel.fetchAllRooms(
        mockModelFactory,
        mockDaoFactory,
        mockGameInstance
      );

      assert.isArray(rooms);
      assert.equal(rooms.length, 0);
    });
  });
});
