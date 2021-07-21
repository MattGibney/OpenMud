import RoomDao from './daos/roomDao';

export default class DaoFactory {
  public room: RoomDao;
  constructor() {
    this.room = new RoomDao();
  }
}
