// ** React Imports
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

// ** Third Party Components
import { Disc, X, Circle } from "react-feather";

import Logo from "../../../../../assets/images/logo/logo.png";
// ** Config
// import themeConfig from '@configs/themeConfig'

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div className="navbar-header" style={{ height: "100px" }}>
      <NavLink
        to="/admin"
        className="w-100 d-flex justify-content-center align-items-center navbar-brand"
      >
        <span className="brand-logo">
          <img src={Logo} alt="logo" />
        </span>
      </NavLink>
    </div>
  );
};

export default VerticalMenuHeader;
