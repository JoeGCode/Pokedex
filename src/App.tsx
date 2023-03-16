import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";

import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Detail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
