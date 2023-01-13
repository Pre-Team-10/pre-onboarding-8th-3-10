import React from "react";
import { ToastContainer } from "react-toastify";
import SearchPage from "./pages/SearchPage";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ToastContainer pauseOnHover={false} />
      <SearchPage />
    </div>
  );
}

export default App;
