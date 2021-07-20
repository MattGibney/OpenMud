import sinon from 'sinon';
import ConnectionModel from '../../src/models/connectionModel';

describe('ConnectionModel', function () {
  describe('clientInputHandler', function () {
    /**
     * This functionality will be replaced in the future with something more
     * useful.
     */
    it('responds with the data it was given', () => {
      const mockMessageWriter = sinon.stub();
      const connection = new ConnectionModel(mockMessageWriter);

      const stubSendMessage = sinon.stub(connection, 'sendMessage');

      connection.clientInputHandler('This is a test');

      sinon.assert.calledWith(stubSendMessage, 'RESPONSE!This is a test');
    });
  });
  describe('sendMessage', function () {
    it('uses the callback to send a message to the connected client.', function () {
      const mockMessageWriter = sinon.stub();
      const connection = new ConnectionModel(mockMessageWriter);

      connection.sendMessage('This is a test');

      sinon.assert.calledWith(mockMessageWriter, 'This is a test');
    });
  });
});
