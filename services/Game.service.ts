import { Endpoints } from "../enums/api/Endpoints";
import { IGame } from "../interfaces/Game/IGameList.interface";
import Http from "../utils/Http";

const GameService = {
  GetAllGameList: async (): Promise<{ data: IGame.IGameDetail[] }> => {
    const result = await Http.GET(Endpoints.GetAllGameList);
    return result;
  },
};

export default GameService;
