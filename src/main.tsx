import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// styles
import './styles/index.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
