export interface RoomData {
  id: number;
  title: string;
  description: string;
}

const roomData: RoomData[] = [
  { id: 1, title: 'Room One', description: 'This is a description.' },
];

export default class RoomDao {
  // constructor() {}
  fetchAllRooms(): RoomData[] {
    return roomData;
  }
}
