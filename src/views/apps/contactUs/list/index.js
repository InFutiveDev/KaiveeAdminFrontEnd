// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../../../../@core/components/spinner/Fallback-spinner";
// import ReactPaginate from "react-paginate";
// import { ChevronDown } from "react-feather";
// import { Card } from "reactstrap";
// import DataTable from "react-data-table-component";
// import moment from "moment";
// import { GET_ALL_CONTACTS } from "../../../../redux/actions/contactUs";
// export const columns = [  
//   {
//     name: "First Name",
//     width: "170px",
//     selector: "first_name",
//     sortable: true,
//     cell: (row) => row.first_name,
//   },
//   {
//     name: "Last Name",
//     width: "150px",
//     selector: "last_name",
//     sortable: true,
//     cell: (row) => row.last_name,
//   },

//   {
//     name: "Email",
//     width: "200px",
//     selector: "emailId",
//     sortable: true,
//     cell: (row) => row.emailId,
//   },
//   {
//     name: "Mobile",
//     width: "150px",
//     selector: "mobile",
//     sortable: true,
//     cell: (row) => row.mobile,
//   },
//   {
//     name: "Message",
//     width: "150px",
//     selector: "message",
//     sortable: true,
//     cell: (row) => row.message,
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
// const ContactPageList = () => {
//   const store = useSelector((state) => state);
//   const { globalLoading } = store.loading;
//   const [currentPage, setCurrentPage] = useState(1);
//   const dispatch = useDispatch();
//   const { contact } = useSelector((state) => state.contact);
//   console.log("prescription", contact);
//   const handlePagination = (page) => {
//     dispatch(GET_ALL_CONTACTS(page.selected + 1));
//     setCurrentPage(page.selected + 1);
//   };

//   const CustomPagination = () => {
//     const count = Number(Math.ceil(contact?.pagination?.total / 10));

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
//     dispatch(GET_ALL_CONTACTS(1));
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
//           data={contact?.contactList || []}
//         />
//       </Card>
//       {globalLoading && <Spinner />}
//     </div>
//   );
// };

// export default ContactPageList;

import React from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";

const ContactPageList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;

  return (
    <div className="app-user-list">
      <Table />
      {globalLoading && <Spinner />}
    </div>
  );
};

export default ContactPageList;
