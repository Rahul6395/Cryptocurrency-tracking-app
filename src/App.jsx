import Home from "./pages/Home";
import CoinDetails from "./pages/CoinDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderLayout from "./layout/HeaderLayout";
import CryptoContext from "./components/context/CryptoContext";

function App() {
  return (
    <CryptoContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderLayout />}>
            <Route index element={<Home />} />
            <Route path="coins/:id" element={<CoinDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CryptoContext>
  );
}

export default App;
