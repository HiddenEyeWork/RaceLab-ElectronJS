import packagejson from "../../../package.json";
import { EnvironmentHelper } from "../shared/helpers/EnvironmentHelper";
import { TRACKJSTOKEN } from "../consts";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { TrackJS } from "trackjs";

if (EnvironmentHelper.isProduction()) {
  TrackJS.install({
    token: TRACKJSTOKEN,
    application: "overlayhost",
    version: packagejson.version,
    // for more configuration options, see https://docs.trackjs.com
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
