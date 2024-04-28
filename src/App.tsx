import "./App.css";
import { UserProvider } from "./providers/UserProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <UserProvider>
        <AppRoutes></AppRoutes>
      </UserProvider>
    </>
  );
}

export default App;
