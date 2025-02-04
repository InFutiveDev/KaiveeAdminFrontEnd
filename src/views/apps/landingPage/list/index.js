import React from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

const LandingPageList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;

  return (
    <div className="app-user-list">
      <Table />
      {globalLoading && <Spinner />}
    </div>
  );
};

export default LandingPageList;
