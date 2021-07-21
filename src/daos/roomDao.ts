export interface RoomData {
  id: number;
}

const roomData: RoomData[] = [{ id: 1 }];

export default class RoomDao {
  // constructor() {}
  fetchAllRooms(): RoomData[] {
    return roomData;
  }
}
