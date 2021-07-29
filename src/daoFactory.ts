import PlayerDao from './daos/playerDao';
import RoomDao from './daos/roomDao';

export default class DaoFactory {
  public player: PlayerDao;
  public room: RoomDao;

  constructor() {
    this.player = new PlayerDao();
    this.room = new RoomDao();
  }
}
