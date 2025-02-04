import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../@core/components/spinner/Fallback-spinner";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { Button, Card, Col, Input, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import moment from "moment";
import {
  GET_ALL_PRESCRIPTIONS,
  GET_ALL_PRESCRIPTIONS_EXPORT,
} from "../../../../redux/actions/prescription";
import { CSVLink } from "react-csv";
const openImageInNewTab = (url) => {
  const newTab = window.open();
  newTab.document.body.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 100%;" />`;
};
export const columns = [
  {
    name: "Patient Name",
    width: "200px",
    selector: "patient_name",
    sortable: true,
    cell: (row) => row.patient_name,
  },
  {
    name: "Phone number",
    width: "150px",
    selector: "memberId",
    sortable: true,
    cell: (row) => row?.user_mobile,
  },
  {
    name: "Prescription",
    width: "150px",
    selector: "dob",
    sortable: true,
    cell: (row) => (
      <div className="d-flex flex-wrap ">
        {row?.add_prescription
          ? row?.add_prescription.map((item, index) => (
              <a
                key={item}
                href={item || ""}
                rel="noopener noreferrer"
                download={false}
                className="me-3"
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  openImageInNewTab(item || "");
                }}
              >
                dowonload file {index + 1}
              </a>
            ))
          : "NA"}
      </div>
    ),
  },
  {
    name: "Date Of Birth",
    width: "150px",
    selector: "dob",
    sortable: true,
    cell: (row) => row.dob,
  },
  {
    name: "Age",
    width: "100px",
    selector: "age",
    sortable: true,
    cell: (row) => row.age,
  },
  {
    name: "gender",
    width: "150px",
    selector: "gender",
    sortable: true,
    cell: (row) => row.gender,
  },
  {
    name: "Created At",
    cell: (row) => (
      <div className="text-secondary d-flex justify-content-left align-items-center">
        <span>{moment(row.createdAt).format("dddd, Do MMMM, h:mm a")}</span>
      </div>
    ),
  },
];

// ** Table Header
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
    dispatch(
      GET_ALL_PRESCRIPTIONS_EXPORT(1, searchTerm, startDate, endDate)
    ).then((res) => {
      if (res?.data?.prescriptionData) {
        setDownloadTest(res?.data?.prescriptionData);
        setTimeout(() => {
          csvLinkExport.current?.link?.click();
        }, 600);
      }
    });
  };
  return (
    <div className="w-100">
      <Row>
        <Col md="4" sm="8">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search by Patient Name,dob"
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
      </Row>
    </div>
  );
};

const SubscriberPageList = () => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  //   const { subscriber } = useSelector((state) => state.subscriber);
  const { prescription } = useSelector((state) => state.prescription);
  const handlePagination = (page) => {
    dispatch(
      GET_ALL_PRESCRIPTIONS(page.selected + 1, searchTerm, startDate, endDate)
    );
    setCurrentPage(page.selected + 1);
  };

  const handleSearch = (val) => {
    setSearchTerm(val);
  };
  const handleSubmitSearch = () => {
    setCurrentPage(1);
    dispatch(GET_ALL_PRESCRIPTIONS(1, searchTerm, startDate, endDate));
  };
  const handleRest = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setStartDate("");
    setEndDate("");

    dispatch(GET_ALL_PRESCRIPTIONS(1, "", "", ""));
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(prescription?.pagination?.total / 10));

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
  useEffect(() => {
    dispatch(GET_ALL_PRESCRIPTIONS(1, searchTerm, "", ""));
  }, []);
  return (
    <div className="app-user-list">
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
          subHeaderComponent={
            <CustomHeader
              searchTerm={searchTerm}
              handleSubmitSearch={handleSubmitSearch}
              handleRest={handleRest}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              endDate={endDate}
              startDate={startDate}
              handleSearch={handleSearch}
            />
          }
          id="_id"
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={prescription?.prescriptionData || []}
        />
      </Card>
      {globalLoading && <Spinner />}
    </div>
  );
};

export default SubscriberPageList;
