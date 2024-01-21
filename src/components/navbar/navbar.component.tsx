import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import SearchBar from "../search-bar/search-bar.component";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["brand-title"]}>
        <Link to="/">Dow Jones Stocks</Link>
      </div>
      <SearchBar />
      <div className={styles["navbar-links"]}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </div>
      <button className={styles["btn-navbar-collapse"]}>&#9776;</button>
    </nav>
  );
};

export default Navbar;
