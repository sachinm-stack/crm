import { FiSettings, FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <div className="top-header">
      <div></div>
      <div className="header-icons">
        <FiSettings />
        <FiSearch />
      </div>
    </div>
  );
};

export default Header;