import PlayerModel from '../../src/app/models/playerModel';
import pino = require('pino');
import playerCountCommand from '../..//src/app/commands/playerCountCommand';

describe('Command: playerCountCommand', () => {
  it('sends a message to the player with a number of players online', () => {
    const mockLogger = {
      debug: jest.fn(),
    } as unknown as pino.Logger;
    const mockPlayerModel = {
      sendMessage: jest.fn(),
      gameInstance: {
        players: [
          this
        ]
      }
    } as unknown as PlayerModel;

    playerCountCommand(mockLogger, mockPlayerModel, 'TEXT');

    expect(mockLogger.debug).toHaveBeenCalledWith('Player Count Command');
    expect(mockPlayerModel.sendMessage).toHaveBeenCalledWith(
      'There are 1 players online'
    );
  });
});
