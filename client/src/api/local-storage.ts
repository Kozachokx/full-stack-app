enum LocalStorageEnum {
  Tokens = "tokens",
  User = "user",
}

interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

const LocalStorage = {
  getUser() {
    let user = null;
    const temp = localStorage.getItem(LocalStorageEnum.User);
    if (temp) {
      user = JSON.parse(temp);
    }

    return user;
  },
  setUser(params) {
    if (
          typeof params === 'object' &&
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
