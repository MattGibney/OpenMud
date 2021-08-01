import * as pino from 'pino';
import ConnectionModel from '../models/connectionModel';

export default class BaseScreen {
  protected connection: ConnectionModel;
  // protected commandFactory: CommandFactory;
  protected logger: pino.Logger;

  constructor(connectionModel: ConnectionModel, logger: pino.Logger) {
    this.connection = connectionModel;
    this.logger = logger;
  }

  // inputHandler(data: string): void {
  //   return;
  // }
}
