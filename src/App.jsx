import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JsonFormatter from './formatter/JsonFormatter';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JsonFormatter />} />
      </Routes>
    </Router>
  )
}
