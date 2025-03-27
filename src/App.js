import React, { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { setAuthToken } from "./api/api";
import ErrorBoundary from "./components/ErrorBoundary";

function AppInitializer() {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  return <AppRoutes />;
}

function App() {
  return (
    <BrowserRouter basename="/BACTrack_frontend">
      <AuthProvider>
        <ErrorBoundary>
          <AppInitializer />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
