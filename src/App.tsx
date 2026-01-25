import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Join from "./Pages/Join";
import LT1 from "./Pages/LT1";
import LT1Register from "./Pages/LT1Register";
import VotePresenter from "./Pages/VotePresenter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/events/lt-1" replace />} />
        <Route path="/join" element={<Join />} />
        <Route path="/events/lt-1" element={<LT1 />} />
        <Route path="/events/lt-1/register" element={<LT1Register />} />
        <Route path="/events/lt-1/vote/presenter" element={<VotePresenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
