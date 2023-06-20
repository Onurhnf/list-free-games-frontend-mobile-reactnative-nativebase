import { Endpoints } from "../enums/api/Endpoints";

const Helpers = {
  /**
   *
   * @param platform filter by platform
   * @param category filter by category
   * @param sortBy sort
   * @returns returns an url for request
   */
  generateAPIURLParams: (
    platform?: string,
    category?: string,
    sortBy?: string
  ): string => {
    let url = ``;

    if (platform) {
      url += `?platform=${platform}`;
    }

    if (category) {
      url += `${platform ? "&" : "?"}category=${category}`;
    }

    if (sortBy) {
      url += `${platform || category ? "&" : "?"}sort-by=${sortBy}`;
    }

    return url;
  },
};

export default Helpers;
