import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App1 from "./App1";
import App from "./App";
import App2 from "./App2"

// ReactDOM.render(<App1 />, document.getElementById('root'))

ReactDOM.render(
    <Router>
    <Routes>
      <Route path="/reviews" element={<App />} />
      <Route path="/distance" element={<App2 />} />
      <Route path="/" element={<App1 />} />
    </Routes>
    </Router>,
    document.getElementById('root')
  );