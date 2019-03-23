import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import P5SketchLibrary from "./components/P5SketchLibrary";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "./components/Jumbotron";

const App = () => (
  <div>
    <Jumbotron />
    <P5SketchLibrary />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
