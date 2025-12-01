import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  return (
    <BrowserRouter>
      <Routes>
        {!jwt ? (
          <>
            <Route path="/" element={<Login onLogin={setJwt} />} />
            <Route path="/login" element={<Login onLogin={setJwt} />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home jwt={jwt} setJwt={setJwt} />} />
            <Route path="/login" element={<Home jwt={jwt} setJwt={setJwt} />} />
            <Route path="/register" element={<Home jwt={jwt} setJwt={setJwt} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
