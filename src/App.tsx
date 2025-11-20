import "./App.css";
import { BrowserRouter } from "react-router";
import RoutesSetup from "./routes/RoutesSetup";

function App() {
  return (
    <BrowserRouter>
      <RoutesSetup />
    </BrowserRouter>
  );
}

export default App;
