import pino = require('pino');
import PlayerModel from '../../src/app/models/playerModel';
import { moveInDirection } from '../../src/app/commands/moveCommand';

describe('Command: move', () => {
  describe('moveInDirection', () => {
    const mockLogger = {
      debug: jest.fn(),
    } as unknown as pino.Logger;
    const mockPlayer = {
      id: 111,
      currentRoom: {
        id: 222,
        exits: [{ direction: 'S', roomId: 1 }, { direction: 'E', roomId: 2 }]
      },
      sendMessage: jest.fn(),
      gameInstance: {
        rooms: [
          { id: 2 },
        ]
      }
    } as unknown as PlayerModel;
    it('sends an error if the player attempts to go a direction that is not valid', () => {
      moveInDirection(mockLogger, mockPlayer, 'N');

      expect(mockPlayer.sendMessage).toHaveBeenCalledWith('You cannot go that way');
    });
    it('throws if a valid exit points to a non-existant room', () => {
      expect(() => {
        moveInDirection(mockLogger, mockPlayer, 'S');
      }).toThrow('Room exit mapped to non existant room');
    });
    it('moves the player to the new room and logs', () => {
      moveInDirection(mockLogger, mockPlayer, 'E');
      expect(mockLogger.debug).toHaveBeenCalledWith('Player 111 moving from room 222 to 2');
      expect(mockPlayer.currentRoom).toEqual({ id: 2 });
    });
  });
});
