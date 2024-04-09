import { resolve } from "path";
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { getSecurityCookies } from "./webstrings/Security"

declare const __dirname: string;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
			"(Base)": resolve(__dirname, "node_modules/any3-ui-components/src/Base"),
			"(SRC)": resolve(__dirname, "node_modules/any3-ui-components/src"),
      "(ReactQueryModels)": resolve(__dirname, "node_modules/any3-ui-components/src/Base/ReactQueryModels"),
			"(DataFilter)": resolve(__dirname, "node_modules/any3-ui-components/src/DataFilter"),
      "react": resolve(__dirname, "node_modules/react")
    }
  },
  server: {
    proxy: {
      "^/reports/index.cfm/api/v(1|2)/": {
        target: "https://localhost:773",
        changeOrigin: true,
        secure: false,
        headers: {
          'cookie': getSecurityCookies()
        },
      },
      "^/(reports|images|userfiles|admin)/\\w+": {
        target: "https://dev.any-survey.com",
        changeOrigin: true,
        secure: false,
        headers: {
          'cookie': getSecurityCookies()
        },
      }
    },
    fs: {
      // @ts-expect-error: d
      allow: [searchForWorkspaceRoot(process.cwd()), "/Users/dominikjelinek/home/dev.ccb.any-survey.com/survey/components/node_modules/primeicons/fonts"]
    }
  }
})
