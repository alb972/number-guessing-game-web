/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import Home from "./containers/Home";
import NotFoundPage from "./containers/NotFoundPage";
// import du reducer global (combined reducer)
import { allReducers } from "../reducers/indexReducers";

const store = createStore(allReducers);
export type StoreApp = typeof store;
export type StoreDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
