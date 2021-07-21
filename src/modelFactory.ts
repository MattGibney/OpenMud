import ConnectionModel from './models/connectionModel';
import PlayerModel from './models/playerModel';

export default class ModelFactory {
  public connection: typeof ConnectionModel;
  public player: typeof PlayerModel;

  constructor() {
    this.connection = ConnectionModel;
    this.player = PlayerModel;
  }
}
