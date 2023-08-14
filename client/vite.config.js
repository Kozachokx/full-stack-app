import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    plugins: [react()],
    server: {
        // Env PORT is avaliable at this step. 
        port: parseInt(env.PORT) || 3000,
    },
    // Wrap env in JSON.stringify if error shows that ENV is not define
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      // __API_URL__: `${env.BACK_API_URL}`
    },
  }
})
