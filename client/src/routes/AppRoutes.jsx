import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/Welcome";

function AppRoutes() {
  return (
    <Routes>

      {/* Welcome Page */}
      <Route path="/welcome" element={<Welcome />} />

    </Routes>
  );
}

export default AppRoutes;