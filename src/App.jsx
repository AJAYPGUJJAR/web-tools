import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JsonFormatterApp from './formatter/JsonFormatterApp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JsonFormatterApp />} />
      </Routes>
    </Router>
  )
}
