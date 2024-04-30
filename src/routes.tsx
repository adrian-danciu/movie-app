import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, ProtectedRoute } from "./components";
import { Favorites, Home, Login, Movie, NotFound, Register } from "./pages";
import UserProfile from "./pages/UserProfile/UserProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
