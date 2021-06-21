import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Router, Switch } from "react-router";
import { browserHistory } from "./history";
import Home from "./Home";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Switch>
          <Route
            path={`/:walletAddress`}
            render={(props) => {
              return <Home></Home>;
            }}
          ></Route>
          <Route
            path={`/`}
            render={(props) => {
              return <Home></Home>;
            }}
          ></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
