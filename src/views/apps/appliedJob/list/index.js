// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../../../../@core/components/spinner/Fallback-spinner";
// import ReactPaginate from "react-paginate";
// import { ChevronDown } from "react-feather";
// import { Card } from "reactstrap";
// import DataTable from "react-data-table-component";
// import moment from "moment";
// import { GET_ALL_PRESCRIPTIONS } from "../../../../redux/actions/prescription";
// import { GET_ALL_APPLIEDJOBS } from "../../../../redux/actions/appliedJob";

// export const columns = [
//   {
//     name: "First Name",
//     width: "100px",
//     selector: "First_name",
//     sortable: true,
//     cell: (row) => row.First_name,
//   },
//   {
//     name: "Last Name",
//     width: "100px",
//     selector: "Last_name",
//     sortable: true,
//     cell: (row) => row.Last_name,
//   },
//   {
//     name: "Phone number",
//     width: "150px",
//     selector: "Mobile",
//     sortable: true,
//     cell: (row) => row?.Mobile,
//   },
//   {
//     name: "Email",
//     width: "150px",
//     selector: "Email",
//     sortable: true,
//     cell: (row) => row?.Email,
//   },
//   {
//     name: "Job Applied",
//     width: "150px",
//     selector: "job_applied",
//     sortable: true,
//     cell: (row) => row?.job_applied,
//   },
//   {
//     name: "Expected Salary",
//     width: "150px",
//     selector: "Expected_salary",
//     sortable: true,
//     cell: (row) => row?.Expected_salary,
//   },
//   {
//     name: "Experince",
//     width: "150px",
//     selector: "Experince",
//     sortable: true,
//     cell: (row) => row?.Experince,
//   },
//   {
//     name: "Cv document",
//     width: "150px",
//     selector: "Cv_document",
//     sortable: true,
//     cell: (row) => (
//       <div className="d-flex flex-wrap ">
//         {row?.Cv_document ? (
//           <a
//             href={row?.Cv_document || ""}
//             rel="noopener noreferrer"
//             download={false}
//             className="me-3"
//             target="_blank"
//           >
//             dowonload file
//           </a>
//         ) : (
//           "NA"
//         )}
//       </div>
//     ),
//   },
//   {
//     name: "City",
//     width: "150px",
//     selector: "City",
//     sortable: true,
//     cell: (row) => row.City,
//   },
//   {
//     name: "State",
//     width: "150px",
//     selector: "State",
//     sortable: true,
//     cell: (row) => row.State,
//   },
//   {
//     name: "Current Salary",
//     width: "100px",
//     selector: "Current_salary",
//     sortable: true,
//     cell: (row) => row.Current_salary,
//   },
//   {
//     name: "Current Company",
//     width: "100px",
//     selector: "Current_company",
//     sortable: true,
//     cell: (row) => row.Current_company,
//   },

//   {
//     name: "Created At",
//     cell: (row) => (
//       <div className="text-secondary d-flex justify-content-left align-items-center">
//         <span>{moment(row.createdAt).format("dddd, Do MMMM, h:mm a")}</span>
//       </div>
//     ),
//   },
// ];
// const SubscriberPageList = () => {
//   const store = useSelector((state) => state);
//   const { globalLoading } = store.loading;
//   const [currentPage, setCurrentPage] = useState(1);
//   const dispatch = useDispatch();
//   //   const { subscriber } = useSelector((state) => state.subscriber);
//   const { data } = useSelector((state) => state.appliedJob);

//   const handlePagination = (page) => {
//     dispatch(GET_ALL_APPLIEDJOBS(page.selected + 1));
//     setCurrentPage(page.selected + 1);
//   };

//   const CustomPagination = () => {
//     const count = Number(Math.ceil(data?.pagination?.total / 10));

//     return (
//       <ReactPaginate
//         previousLabel={""}
//         nextLabel={""}
//         pageCount={count || 1}
//         activeClassName="active"
//         forcePage={currentPage !== 0 ? currentPage - 1 : 0}
//         onPageChange={(page) => handlePagination(page)}
//         pageClassName={"page-item"}
//         nextLinkClassName={"page-link"}
//         nextClassName={"page-item next"}
//         previousClassName={"page-item prev"}
//         previousLinkClassName={"page-link"}
//         pageLinkClassName={"page-link"}
//         containerClassName={
//           "pagination react-paginate justify-content-end my-2 pr-1"
//         }
//       />
//     );
//   };
//   useEffect(() => {
//     dispatch(GET_ALL_APPLIEDJOBS(1));
//   }, []);
//   return (
//     <div className="app-user-list">
//       <Card>
//         <DataTable
//           noHeader
//           pagination
//           subHeader
//           responsive
//           noDataComponent={
//             <div>
//               <img src="/Nodatacomponent.png" />
//             </div>
//           }
//           paginationServer
//           id="_id"
//           columns={columns}
//           sortIcon={<ChevronDown />}
//           className="react-dataTable"
//           paginationComponent={CustomPagination}
//           data={data?.ApplicationData || []}
//         />
//       </Card>
//       {globalLoading && <Spinner />}
//     </div>
//   );
// };

// export default SubscriberPageList;

import React from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

const SubscriberPageList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;

  return (
    <div className="app-user-list">
      <Table />
      {globalLoading && <Spinner />}
    </div>
  );
};

export default SubscriberPageList;
