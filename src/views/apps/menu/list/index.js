// ** User List Component
import MenuTable from "./Table";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

// ** Styles
import "@styles/react/apps/app-users.scss";

// ** Redux Hooks
import { useSelector } from "react-redux";
// import { useEffect } from "react";

const MenuList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;
  // useEffect(() => {}, []);
  return (
    <div className="app-user-list">
      {globalLoading && <Spinner />}
      <MenuTable />
    </div>
  );
};
export default MenuList;
