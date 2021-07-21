import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import { RoomData } from '../daos/roomDao';

export default class RoomModel {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  public id: number;

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    roomData: RoomData
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;

    this.id = roomData.id;
  }

  static fetchAllRooms(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory
  ): RoomModel[] {
    const roomsData = DaoFactory.room.fetchAllRooms();
    return roomsData.map(
      (roomData) => new RoomModel(ModelFactory, DaoFactory, roomData)
    );
  }
}
