import { Endpoints } from "../enums/api/Endpoints";
import { IGame } from "../interfaces/Game/IGameList.interface";
import Http from "../utils/Http";

const GameService = {
  GetAllGameList: async (
    params = ""
  ): Promise<{ data: IGame.IGameDetail[] }> => {
    const result = await Http.GET(Endpoints.GetAllGameList + params);
    return result;
  },
};

export default GameService;
