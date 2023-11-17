import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App1 from "./App1";
import App from "./App";

// ReactDOM.render(<App1 />, document.getElementById('root'))

ReactDOM.render(
    <Router>
    <Routes>
      <Route path="/reviews" element={<App />} />
      {/* <Route path="/distance-calculator" element={<DistanceCalculator />} /> */}
      <Route path="/" element={<App1 />} />
    </Routes>
    </Router>,
    document.getElementById('root')
  );