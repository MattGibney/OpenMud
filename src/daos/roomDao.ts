import { RoomExitDirection } from '../models/roomModel';

export interface RoomData {
  id: number;
  title: string;
  description: string;
  exits: { direction: RoomExitDirection; roomId: number }[];
}

const roomData: RoomData[] = [
  {
    id: 1,
    title: 'Hallway',
    description: 'Hallway Description',
    exits: [
      { direction: 'N', roomId: 2 },
      { direction: 'W', roomId: 3 },
      { direction: 'U', roomId: 5 },
    ],
  },
  {
    id: 2,
    title: 'Kitchen',
    description: 'Kitchen Description',
    exits: [
      { direction: 'S', roomId: 1 },
      { direction: 'W', roomId: 4 },
    ],
  },
  {
    id: 3,
    title: 'Living Room',
    description: 'Living Room Description',
    exits: [
      { direction: 'E', roomId: 1 },
      { direction: 'N', roomId: 4 },
    ],
  },
  {
    id: 4,
    title: 'Dining Room',
    description: 'Dining Room Description',
    exits: [
      { direction: 'S', roomId: 3 },
      { direction: 'E', roomId: 2 },
    ],
  },
  {
    id: 5,
    title: 'Upper Hallway',
    description: 'Upper Hallway Description',
    exits: [
      { direction: 'D', roomId: 1 },
      { direction: 'N', roomId: 6 },
      { direction: 'E', roomId: 8 },
      { direction: 'S', roomId: 9 },
      { direction: 'W', roomId: 7 },
    ],
  },
  {
    id: 6,
    title: 'Bathroom',
    description: 'Bathroom Description',
    exits: [{ direction: 'S', roomId: 5 }],
  },
  {
    id: 7,
    title: 'Bedroom One',
    description: 'Bedroom One Description',
    exits: [{ direction: 'E', roomId: 5 }],
  },
  {
    id: 8,
    title: 'Bedroom Two',
    description: 'Bedroom Two Description',
    exits: [{ direction: 'W', roomId: 5 }],
  },
  {
    id: 9,
    title: 'Bedroom Three',
    description: 'Bedroom Three Description',
    exits: [{ direction: 'N', roomId: 5 }],
  },
];

export default class RoomDao {
  // constructor() {}
  fetchAllRooms(): RoomData[] {
    return roomData;
  }
}
