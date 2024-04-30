import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { UserProvider } from "./providers/UserProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <AppRoutes></AppRoutes>
      </UserProvider>
    </>
  );
}

export default App;
