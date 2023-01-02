import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";

export default function App() {
  return <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </Router>
}

