import Table from "./Table";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";
import "@styles/react/apps/app-users.scss";
import { useSelector } from "react-redux";

const UsersList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;
  return (
    <div className="app-user-list">
      <Table />
      {globalLoading && <Spinner />}
    </div>
  );
};
export default UsersList;
