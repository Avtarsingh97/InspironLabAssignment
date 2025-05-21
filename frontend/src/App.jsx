import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <>
      <div className='mx-auto max-w-screen-3xl'>
        {/* Toast notifications (for success, error, etc.) */}
        <Toaster />

        {/* Routing setup */}
        <Router>
          <Routes>

            {/* Loop through each route from routes.js */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteElement route={route} />}
              />
            ))}
          </Routes>
        </Router>
      </div>
    </>
  );
}

// Helper component to wrap protected routes
const RouteElement = ({ route }) => {
  return route.isProtected ? <ProtectedRoute>{route.element}</ProtectedRoute> : <>{route.element}</>;
};

export default App;
