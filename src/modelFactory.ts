import ConnectionModel from './models/connectionModel';
import PlayerModel from './models/playerModel';
import RoomModel from './models/roomModel';

export default class ModelFactory {
  public connection: typeof ConnectionModel;
  public player: typeof PlayerModel;
  public room: typeof RoomModel;

  constructor() {
    this.connection = ConnectionModel;
    this.player = PlayerModel;
    this.room = RoomModel;
  }
}
