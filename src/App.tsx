import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.page";
import Watchlist from "./pages/watchlist/watchlist.page";
import Navbar from "./components/navbar/navbar.component";
import { StockProvider } from "./contexts/stockContext/stock.context";
import { ModalProvider } from "./contexts/modalContext/modal.context";

const App: React.FC = () => {
  return (
    <ModalProvider>
      <StockProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </StockProvider>
    </ModalProvider>
  );
};

export default App;
