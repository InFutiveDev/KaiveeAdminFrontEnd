// // ** User List Component
// import Table from "./Table";
// import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

// // ** Styles
// import "@styles/react/apps/app-users.scss";

// // ** Redux Hooks
// import { useSelector } from "react-redux";

// const CouponList = () => {
//   const store = useSelector((state) => state);
//   const { globalLoading } = store.loading;
//   return (
//     <div className="app-user-list">
//       {globalLoading && <Spinner />}
//       <Table />
//     </div>
//   );
// };
// export default CouponList;


import React from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

const CouponList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;

  return (
    <div className="app-user-list">
      <Table />
      {globalLoading && <Spinner />}
    </div>
  );
};

export default CouponList;

