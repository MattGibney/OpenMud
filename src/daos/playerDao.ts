export interface PlayerData {
  id: number;
  currentRoomId: number;
  username: string;
  password: string;
}

const mockPlayerData: PlayerData[] = [
  {
    id: 1,
    currentRoomId: 1,
    username: 'Moppler',
    password: '',
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

  fetchPlayerByUsername(username: string): PlayerData | null {
    const playerData = mockPlayerData.find(
      (playerData) => playerData.username === username
    );
    if (!playerData) return null;
    return playerData;
  }
}
