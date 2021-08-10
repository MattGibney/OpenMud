import PlayerModel from '../../src/app/models/playerModel';
import RoomModel from '../../src/app/models/roomModel';
import pino = require('pino');
import lookCommand, { getRoomData, LookData, renderLook } from '../../src/app/commands/lookCommand';

describe('Command: Look', () => {
  describe('lookCommand', () => {
    test('it works as expected', () => {
      const mockLogger = {
        debug: jest.fn(),
      } as unknown as pino.Logger;
      const mockPlayer = {
        currentRoom: {
          title: 'Test Room',
          description: 'Room Description',
          playersInRoom: [],
          exits: [],
        },
        sendMessage: jest.fn(),
      } as unknown as PlayerModel;

      lookCommand(mockLogger, mockPlayer, 'TEXT');
      expect(mockPlayer.sendMessage).toHaveBeenCalledWith(`Test Room
Room Description

There are 0 players here.

Exits: `);
    });
    test('it does nothing when the render mode is not text', () => {
      const mockLogger = {
        debug: jest.fn(),
      } as unknown as pino.Logger;
      const mockPlayer = {
        currentRoom: {
          title: 'Test Room',
          description: 'Room Description',
          playersInRoom: [],
          exits: [],
        },
        sendMessage: jest.fn(),
      } as unknown as PlayerModel;

      lookCommand(mockLogger, mockPlayer, 'JSON');
      expect(mockPlayer.sendMessage).not.toHaveBeenCalled()
    });
  });
  describe('renderLook', () => {
    test('it renders all data correctly', () => {
      const mockLookData: LookData = {
        title: 'Test Room',
        description: 'Room Description',
        numPlayersInRoom: 1,
        exitDirections: ['N', 'E', 'S', 'W', 'U', 'D'],
      };
      const renderString = renderLook(mockLookData);

      expect(renderString).toEqual(`Test Room
Room Description

There are 1 players here.

Exits: N,E,S,W,U,D`);
    });
  });
  describe('getRoomData', () => {
    it('returns structured data of the players current room', () => {
      const mockRoom = {
        title: 'Test Room',
        description: 'Test Description',
        playersInRoom: [{}],
        exits: [{ direction: 'N', roomId: 1 }]
      } as RoomModel;
      const roomData = getRoomData(mockRoom);

      expect(roomData).toStrictEqual({
        title: 'Test Room',
        description: 'Test Description',
        numPlayersInRoom: 1,
        exitDirections: ['N']
      })
    });
  });
});
