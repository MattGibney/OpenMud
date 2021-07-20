/**
 * This interface provides the ConnectionModel with a way of sending data to the
 * connected client.
 */
export type MessageWriterFunction = (message: string) => void;

export default class ConnectionModel {
  private clientMessageWriter: MessageWriterFunction;

  constructor(messageWriter: MessageWriterFunction) {
    this.clientMessageWriter = messageWriter;
  }

  clientInputHandler(data: string): void {
    this.sendMessage('RESPONSE!' + data);
  }

  sendMessage(message: string): void {
    this.clientMessageWriter(message);
  }
}
