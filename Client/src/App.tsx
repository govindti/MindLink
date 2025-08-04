import Auth from "./pages/Auth";
import { Provider } from "react-redux";
import NotFound from "./pages/NotFound";
import store from "./config/redux/store";
import Dashboard from "./pages/Dashboard";
import SharedMind from "./pages/SharedMind";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<ProtectedRoute><Auth /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/mind/:hash" element={<SharedMind />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
