export interface PlayerData {
  id: number;
  currentRoomId: number;
}

const mockPlayerData: PlayerData[] = [
  {
    id: 1,
    currentRoomId: 1,
  },
];

export default class PlayerDao {
  fetchPlayerById(playerId: number): PlayerData | null {
    const playerData = mockPlayerData.find(
      (playerData) => playerData.id === playerId
    );
    if (!playerData) return null;
    return playerData;
  }
}
