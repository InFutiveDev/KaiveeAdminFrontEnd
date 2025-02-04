// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_FEEDBACK } from "../../../../redux/actions/feedBack";
// **  Components
// import DatePicker from './datePicker'
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import { ChevronDown, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, Input, Row, Col, Button } from "reactstrap";
import { CSVLink } from "react-csv";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useHistory } from "react-router-dom";
import { GET_ALL_FRANCHISES ,GET_ALL_FRANCHISES_EXPORT } from "../../../../redux/actions/franchises";

const CustomHeader = ({
  searchTerm,
  handleSearch,
  handleSubmitSearch,
  handleRest,
  endDate,
  startDate,
  setStartDate,
  setEndDate,
}) => {
  const dispatch = useDispatch();

  const [downloadTest, setDownloadTest] = useState([
    {
      data: "no found",
    },
  ]);

  const csvLinkExport = useRef();

  const handleExport = () => {
    dispatch(GET_ALL_FRANCHISES_EXPORT(1, searchTerm, startDate, endDate)).then(
      (res) => {
        if (res?.data?.franchiseData) {
          setDownloadTest(res?.data?.franchiseData);
          setTimeout(() => {
            csvLinkExport.current?.link?.click();
          }, 600);
        }
      }
    );
  };

  return (
    <div className="w-100">
      <Row>
        <Col md="6" sm="6">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search by Your Name, Your Email"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>
        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple color="primary" onClick={handleSubmitSearch}>
              Search
            </Button.Ripple>
          </div>
        </Col>
        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple color="primary" onClick={handleExport}>
              Download All
            </Button.Ripple>
            <CSVLink
              data={downloadTest}
              ref={csvLinkExport}
              filename="data.csv"
              target="_blank"
            />
          </div>
        </Col>
        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple color="primary" onClick={handleRest}>
              Reset
            </Button.Ripple>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="4" sm="8">
          <div>
            <label>Start Date</label>
            <Input
              type="date"
              placeholder="start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </Col>
        <Col md="4" sm="8">
          <div>
            <label>End Date</label>
            <Input
              type="date"
              placeholder="end date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const CorporateHealthEnquiryList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector((state) => state.franchises);
  const { franchises } = store;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(GET_ALL_FRANCHISES(page.selected + 1, searchTerm, startDate, endDate)); 
    setCurrentPage(page.selected + 1);
  };

  const handleSearch = (val) => {
    setSearchTerm(val);
  };

  const handleSubmitSearch = () => {
    setCurrentPage(1);
    dispatch(GET_ALL_FRANCHISES(1, searchTerm, startDate, endDate));
  };

  const handleRest = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    dispatch(GET_ALL_FRANCHISES(1, "", "", ""));
  };


  useEffect(() => {
    dispatch(GET_ALL_FRANCHISES(1,searchTerm, "", ""));
  }, []);
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(franchises?.data?.pagination?.total / 10));

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

  console.log("franchises--->>", franchises);

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
          subHeaderComponent={
            <CustomHeader
              searchTerm={searchTerm}
              handleSubmitSearch={handleSubmitSearch}
              handleSearch={handleSearch}
              handleRest={handleRest}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              endDate={endDate}
              startDate={startDate}
            />
          }
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={franchises?.data?.franchiseData || []}
        />
      </Card>
    </Fragment>
  );
};

export default CorporateHealthEnquiryList;
