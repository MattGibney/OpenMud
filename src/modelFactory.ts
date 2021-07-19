import ConnectionModel from './models/connectionModel';

export default class ModelFactory {
  public connection: typeof ConnectionModel;

  constructor() {
    this.connection = ConnectionModel;
  }
}
