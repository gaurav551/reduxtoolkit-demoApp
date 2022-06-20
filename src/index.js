import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from './store/store';
import { Provider } from "react-redux";
import NavigationContainer from "./components/containers/Navigation/NavigationContainer";
import { FooterContainer } from "./components/containers/Footer/FooterContainer";
import { Container } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOMClient.createRoot(document.getElementById("root"));
// MUI theme customization
const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
         
            <NavigationContainer />
            <Container>
              <App />
            </Container>
            <FooterContainer />
         
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
