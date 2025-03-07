// ** React Imports
import { useEffect } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@store/actions/auth";

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { Power } from "react-feather";
import { useHistory } from "react-router-dom";

// ** Default Avatar
const renderUserAvatar = (row) => {
  if (row?.name === undefined) {
    return (
      <Avatar
        className="mr-1"
        img={
          "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
        }
        width="32"
        height="32"
      />
    );
  } else {
    return <Avatar color={"primary"} className="mr-1" content={"Admin" || row?.name} initials />;
  }
};

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory();
  const profileInfo = useSelector((state) => state.auth?.profileInfo);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        {renderUserAvatar(profileInfo)}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem className="w-100" tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
