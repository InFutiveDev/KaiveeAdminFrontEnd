// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_INQUIRIES,
  GET_ALL_INQUIRIES_EXPORT,
} from "../../../../redux/actions/inquiry";
// **  Components
// import DatePicker from './datePicker'
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import { ChevronDown, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, Input, Row, Col, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";

// ** Table Header
const CustomHeader = ({
  searchTerm,
  handleSearch,
  handleSubmitSearch,
  endDate,
  startDate,
  setStartDate,
  setEndDate,
  selectValue,
  handleRest,
  setSelectValue,
}) => {
  const dispatch = useDispatch();

  const [downloadTest, setDownloadTest] = useState([
    {
      data: "no found",
    },
  ]);

  const csvLinkExport = useRef();

  const handleExport = () => {
    dispatch(GET_ALL_INQUIRIES_EXPORT(1, searchTerm, startDate, endDate)).then(
      (res) => {
        setDownloadTest(res?.data?.inquiryData);
        setTimeout(() => {
          csvLinkExport.current?.link?.click();
        }, 600);
      }
    );
  };
  return (
    <div className="w-100">
      <Row>
        <Col md="4" sm="8">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>
        {/* <Col md="4" sm="8">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col> */}

        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple color="primary" onClick={() => handleSubmitSearch()}>
              Search
            </Button.Ripple>
          </div>
        </Col>

        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple color="primary" onClick={() => handleExport()}>
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
            <Button.Ripple color="primary" onClick={() => handleRest()}>
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
              placeholder="start date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              // onBlur={handleBlur}
            />
          </div>
        </Col>
        <Col md="4" sm="8">
          <div>
            <label>Select Type</label>
            <Input
              type="select"
              name="landingPageStatus"
              id="landingPageStatus"
              value={selectValue}
              onChange={(e) => {
                setSelectValue(e.target.value);   
                handleSearch(e.target.value);
              }}
            >
              <option>select type</option>
              <option value={"google ads"}>landing page</option>
              <option value={"website"}>website</option>
            </Input>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const InquiryList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector((state) => state.inquiry);
  const { inquiries } = store;
  // ** States
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  // const searchname = searchParams.get("searchname");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      GET_ALL_INQUIRIES(page.selected + 1, searchTerm, startDate, endDate)
    );
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on search query change
  const handleSearch = (val) => {
    setSearchTerm(val);
  };

  const handleSubmitSearch = () => {
    setCurrentPage(1);
    dispatch(GET_ALL_INQUIRIES(1, searchTerm, startDate, endDate));
  };
  const handleRest = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    dispatch(GET_ALL_INQUIRIES(1, "", "", ""));
  };
  useEffect(() => {
    dispatch(GET_ALL_INQUIRIES(1, searchTerm, "", ""));
  }, []);
  console.log("inquiries", inquiries);
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(inquiries?.data?.pagination?.total / 10));

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
          data={inquiries?.data.inquiryData || []}
          subHeaderComponent={
            <CustomHeader
              searchTerm={searchTerm}
              handleSubmitSearch={handleSubmitSearch}
              handleSearch={handleSearch}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              handleRest={handleRest}
              endDate={endDate}
              startDate={startDate}
              setSelectValue={setSelectValue}
              selectValue={selectValue}
            />
          }
        />
      </Card>
    </Fragment>
  );
};

export default InquiryList;
