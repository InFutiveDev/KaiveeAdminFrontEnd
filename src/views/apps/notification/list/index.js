// ** Notification List Component
import Table from "./Table";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

// ** Styles
import "@styles/react/apps/app-users.scss";

// ** Redux Hooks
import { useSelector } from "react-redux";

const NotificationList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;
  return (
    <div className="app-user-list">
      {globalLoading && <Spinner />}
      <Table />
    </div>
  );
};
export default NotificationList;