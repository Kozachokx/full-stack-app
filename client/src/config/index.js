const env = import.meta.env;

const CONFIG = {
  inDevMode: env?.VITE_IN_DEV_MODE?.toLowerCase() === 'true' ? true : false,
}

export default CONFIG;
