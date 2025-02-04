// ** React Imports
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ** Dropdowns Imports
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

// ** Third Party Components
import * as Icon from "react-feather";
import { NavItem, NavLink, Spinner, Tooltip } from "reactstrap";
import { GET_ADMIN_BALANCE } from "../../../../redux/actions/dashboard";

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  const store = useSelector((state) => state);
  const [tooltip, setTooltip] = useState(false);
  const { dashboard, loading } = store;
  const { globalLoading } = loading;

  const dispatch = useDispatch();

  const toggle = () => {
    setTooltip(!tooltip);
  };

  const refreshBalance = () => {
    dispatch(GET_ADMIN_BALANCE());
  };

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <ul className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu mr-auto">
            <NavLink
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={() => setMenuVisibility(true)}
            >
              <Icon.Menu className="ficon" />
            </NavLink>
          </NavItem>
        </ul>
      </div>
      <h2 className="m-0">Admin Panel</h2>
      <ul className="nav navbar-nav align-items-center ml-auto">
        {/* <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem> */}

        {/* {dashboard.adminBalance?.balance &&
          <div className={`d-flex justify-start align-items-center ${Number(dashboard.adminBalance?.balance) <= 0.1 ? 'text-danger' : ''}`}>
            <p className='mb-0'><strong>Balance: </strong><span href="#" id="TooltipExample"> {Number(dashboard.adminBalance?.balance).toFixed(3)} {dashboard.adminBalance?.crypto}</span></p>
            <Tooltip placement="right" isOpen={tooltip} target="TooltipExample" toggle={toggle}>
              {dashboard.adminBalance?.balance} {dashboard.adminBalance?.crypto}
            </Tooltip>
          </div>

        } */}
        {/* {globalLoading ? <Spinner className='ml-1' size='sm' /> : <Icon.RefreshCcw onClick={refreshBalance} className='ml-1' size={18} color='gray' />} */}

        {/* <div className={dashboard.adminBalance?.balance <= 0.1 ? 'text-danger': ''}>
          {dashboard.adminBalance?.balance && 
          <>
            <strong>Balance:</strong> {dashboard.adminBalance?.balance} {dashboard.adminBalance?.crypto}
            <strong>Balance:</strong> {dashboard.adminBalance?.balance} {dashboard.adminBalance?.crypto}
          </>
          }
        </div> */}
        <NotificationDropdown />
        <UserDropdown />
      </ul>
    </Fragment>
  );
};

export default ThemeNavbar;
