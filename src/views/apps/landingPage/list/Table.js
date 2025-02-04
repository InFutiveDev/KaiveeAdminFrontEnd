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
import { GET_ALL_LANDINGS } from "../../../../redux/actions/ladningPage";

// ** Table Header
const CustomHeader = ({ searchTerm, handleSearch }) => {
  const history = useHistory();

  return (
    <div className="w-100">
      <Row>
        <Col md="7" sm="8">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search Landing"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>
        <Col md="5" sm="5">
          <div className="d-flex justify-content-end">
            <Button.Ripple
              onClick={() => {
                history.push("/apps/landing-page/add");
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

const LandingList = () => {
  // ** Store Vars
  const history = useHistory();
  const dispatch = useDispatch();
  const { landing } = useSelector((state) => state.landing);
  // ** States
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  const searchname = searchParams.get("searchname");
  const [searchTerm, setSearchTerm] = useState(searchname || "");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (page) => {
    dispatch(GET_ALL_LANDINGS(page.selected + 1, searchname));
    setCurrentPage(page.selected + 1);
  };

  const handleSearch = (val) => {
    setSearchTerm(val);
    const debounceTimer = setTimeout(() => {
      dispatch(GET_ALL_LANDINGS(1, val));
      history.push(`${window.location.pathname}?searchname=${val}`);
    }, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  };

  useEffect(() => {
    dispatch(GET_ALL_LANDINGS(1, searchname));
  }, []);

  const CustomPagination = () => {
    const count = Number(Math.ceil(landing?.pageData?.pagination?.total / 10));

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
  console.log("landing", landing);
  return (
    <Fragment>
      <Card>
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
          data={landing?.pageData || []}
          subHeaderComponent={
            <CustomHeader searchTerm={searchTerm} handleSearch={handleSearch} />
          }
        />
      </Card>
    </Fragment>
  );
};

export default LandingList;
