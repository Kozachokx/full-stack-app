enum LocalStorageEnum {
  Tokens = "tokens",
  User = "user",
  Pagination = "pagination",
  Filters = "filters",
}

interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

interface StoredUserDTO { 
  id?: string;
  assignedId?: string;
  username?: string;
  lastName?: string;
  firstName?: string;
  isAdmin?: boolean;
}

const LocalStorage = {
  setFilters(params) {
    if (
      typeof params === "object"
    ) {
      localStorage.setItem(LocalStorageEnum.Filters, JSON.stringify(params));
    }
  },
  getFilters() {
    let filters = {};
    const temp = localStorage.getItem(LocalStorageEnum.Filters);
    if (temp) {
      filters = JSON.parse(temp);
    }

    return filters;
  },
  pagination: {
    defaultPagination: { pageSize: 4, page: 1 },

    getPagination() {
      const paginationStr = localStorage.getItem(LocalStorageEnum.Pagination);

      if (!paginationStr) return this.defaultPagination; 
      
      const pagination = JSON.parse(paginationStr);

      if (typeof pagination !== 'object') return this.defaultPagination; 

      return { ...this.defaultPagination, ...pagination };
    },
    setPagination({ page, pageSize }) {
      const data = {
        page: page || 1,
        pageSize: pageSize || 4,
      }
      localStorage.setItem(LocalStorageEnum.Pagination, JSON.stringify(data))
    },
  },

  getUser(): StoredUserDTO {
    let user = null;
    const temp = localStorage.getItem(LocalStorageEnum.User);
    if (temp) {
      user = JSON.parse(temp);
    }

    return user as unknown as StoredUserDTO;
  },
  setUser(params) {
    if (
      typeof params === "object" &&
      !Array.isArray(params) &&
      params !== null
    ) {
      localStorage.setItem(LocalStorageEnum.User, JSON.stringify(params));
    }
  },
  deleteUserData() {
    localStorage.removeItem(LocalStorageEnum.User);
  },

  setTokens({ accessToken, refreshToken }: TokensDto) {
    if (!accessToken || !refreshToken) {
      throw new Error(
        `[setTokens] Set token error! Both tokens (accessToken and refreshToken) are requeired!`
      );
    }

    const tokens: TokensDto = {
      accessToken,
      refreshToken,
    };

    localStorage.setItem(LocalStorageEnum.Tokens, JSON.stringify(tokens));

    return tokens;
  },

  setAccessToken({ accessToken }: { accessToken: string }) {
    const tokensOld = this.getTokens();

    if (!accessToken || !tokensOld.refreshToken) {
      throw new Error(
        `[setAccessToken] Set token error! Both tokens (accessToken and refreshToken) are requeired!`
      );
    }

    const tokens: TokensDto = {
      accessToken,
      refreshToken: tokensOld.refreshToken,
    };

    localStorage.setItem(LocalStorageEnum.Tokens, JSON.stringify(tokens));

    return tokens;
  },

  getTokens(): TokensDto | null {
    const storageString = localStorage.getItem(LocalStorageEnum.Tokens);

    if (!storageString) {
      return null;
    }

    try {
      const { accessToken, refreshToken } = JSON.parse(storageString);
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(
        `[getTokens] Storage.Token probably has not valid json format!`
      );

      return null;
    }
  },

  deleteTokens(): void {
    localStorage.removeItem(LocalStorageEnum.Tokens);
  },
};

export { LocalStorage };
