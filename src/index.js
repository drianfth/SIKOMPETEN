import React from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM, { createRoot } from "react-dom/client";
// import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

// const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
