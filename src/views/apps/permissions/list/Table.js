// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import { ChevronDown, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, Input, Row, Col, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useHistory } from "react-router-dom";
import { GET_ADMIN_ROLE } from "../../../../redux/actions/adminRole";

// ** Table Header
const CustomHeader = ({ searchTerm, handleSearch }) => {
  const history = useHistory();

  return (
    <div className="w-100 mb-2">
      <Row>
        <Col className="p-0" md="4" sm="8">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search User"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>
        <Col className="p-0" md="8" sm="4">
          <div className="d-flex justify-content-end">
            <Button.Ripple
              onClick={() => {
                history.push("/admin/apps/permissions/add");
              }}
              color="primary"
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ADMINROLELIST = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory()
  const { adminRoleList } = useSelector((state) => state.adminRoleReducer);
  // ** States
  const searchParams = new URLSearchParams(window?.location.search.split('?')[1])
  const searchname = searchParams.get('searchname')
  const [searchTerm, setSearchTerm] = useState(searchname || '')
  const [currentPage, setCurrentPage] = useState(1);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(GET_ADMIN_ROLE(page.selected + 1, searchname));
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on search query change
  const handleSearch = (val) => {
    setSearchTerm(val);
    const debounceTimer = setTimeout(() => {
      dispatch(GET_ADMIN_ROLE(1, val))
      history.push(`${window.location.pathname}?searchname=${val}`)
    }, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  };

  useEffect(() => {
    dispatch(GET_ADMIN_ROLE(1, searchname));
  }, []);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(
      Math.ceil(adminRoleList?.data?.pagination?.total / 10)
    );

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pr-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Card className="pr-1" style={{ borderRadius: "6px" }}>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          noDataComponent={
            <div>
              <img src="/Nodatacomponent.png" />
            </div>
          }
          paginationServer
          id="_id"
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={adminRoleList?.data?.data || []}
          subHeaderComponent={
            <CustomHeader searchTerm={searchTerm} handleSearch={handleSearch} />
          }
        />
      </Card>
    </Fragment>
  );
};

export default ADMINROLELIST;
