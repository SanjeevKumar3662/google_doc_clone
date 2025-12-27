import TextEditor from "./component/TextEditor";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { v4 as uuidVR } from "uuid";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate to={`/document/${uuidVR()}`}></Navigate>}
          >
            {" "}
          </Route>
          <Route
            path="/document/:id"
            element={<TextEditor></TextEditor>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
