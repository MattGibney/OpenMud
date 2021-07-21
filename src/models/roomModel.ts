import ModelFactory from '../modelFactory';
import DaoFactory from '../daoFactory';
import { RoomData } from '../daos/roomDao';
import Game from '../game';
import PlayerModel from './playerModel';

export type RoomExitDirection = 'U' | 'D' | 'N' | 'E' | 'S' | 'W';

export default class RoomModel {
  private ModelFactory: ModelFactory;
  private DaoFactory: DaoFactory;
  private gameInstance: Game;
  public id: number;
  public title: string;
  public description: string;

  public exits: { direction: RoomExitDirection; roomId: number }[];

  constructor(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    gameInstance: Game,
    roomData: RoomData
  ) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.gameInstance = gameInstance;

    this.id = roomData.id;
    this.title = roomData.title;
    this.description = roomData.description;

    this.exits = roomData.exits;
  }

  get playersInRoom(): PlayerModel[] {
    return this.gameInstance.players.filter(
      (player) => player.currentRoom === this
    );
  }

  static fetchAllRooms(
    ModelFactory: ModelFactory,
    DaoFactory: DaoFactory,
    gameInstance: Game
  ): RoomModel[] {
    const roomsData = DaoFactory.room.fetchAllRooms();
    return roomsData.map(
      (roomData) =>
        new RoomModel(ModelFactory, DaoFactory, gameInstance, roomData)
    );
  }
}
