import "./index.css"
import App from "./App.tsx"
import Theme from "./Styles/Theme.ts"
import ContextProvider from "./Data/Context.tsx"
import AuthCheck from "./Components/AuthCheck.tsx"

import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={Theme}>
    <AuthCheck>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AuthCheck>
  </ChakraProvider>,
)

