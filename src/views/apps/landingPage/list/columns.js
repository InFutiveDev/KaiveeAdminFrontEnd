// ** React Imports
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, Edit } from "react-feather";
import DeleteLanding from "../delete";
export const DeleteFun = (row) => {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <DeleteLanding row={row} />
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/landing-page/update/${row?._id}`}
            className="w-100"
          >
            <Edit size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
const renderHTML = (htmlString) => {
  return { __html: htmlString };
};
export const columns = [
  // {
  //   name: "Name",
  //   width: "150px",
  //   selector: "Name",
  //   sortable: true,
  //   cell: (row) => row.name,
  // },
  // {
  //   name: "Title",
  //   width: "150px",
  //   selector: "Title",
  //   sortable: true,
  //   cell: (row) => row.title,
  // },
  {
    name: "Landing Page image",
    width: "200px",
    selector: "Landing Page image",
    sortable: true,
    cell: (row) => (
      <div>
        <img
          src={row.landingpageimage}
          style={{ height: "100px", width: "150px" }}
        />
      </div>
    ),
  },
  {
    name: "url",
    width: "200px",
    selector: "Url",
    sortable: true,
    cell: (row) => row.url,
  },
  // {
  //   name: "Landing Page Article",
  //   width: "200px",
  //   selector: "Landing Page Article",
  //   sortable: true,
  //   cell: (row) => (
  //     <div dangerouslySetInnerHTML={renderHTML(row.landingPageArticle)} />
  //   ),
  // },
  {
    name: "Mange Faqs",
    width: "150px",
    sortable: true,
    cell: (row) => (
      <Link to={`/apps/manage/faqs?itemId=${row?._id}`}>Manage Faqs</Link>
    ),
  },
  {
    name: "Landing Page",
    width: "150px",
    sortable: true,
    cell: (row) => <span>page {row?.landing_page_model}</span>,
  },
  {
    name: "View page",
    width: "100px",
    selector: "View page",
    sortable: true,
    cell: (row) => (
      <a
       href={`https://www.kaiveehealthcare.com/${row?.landing_page_model === 1 ? "ads" : "ads-two"}/${row?.url || ""}`}

        target="_blank"
      >
        {" "}
        view
      </a>
    ),
  },
  {
    name: "Actions",
    minWidth: "50px",
    width: "50px",
    cell: (row) => DeleteFun(row),
  },
];
