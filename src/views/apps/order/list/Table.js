// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";

//**for making call to Api Request */
import axios from "axios";

// **  Components
// import DatePicker from './datePicker'
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import { ChevronDown, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, Input, Row, Col, Label, FormGroup, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useHistory } from "react-router-dom";
import {
  GET_ALL_ORDER,
  GET_ALL_ORDER_EXPORT,
  PUT_PAYMENT_STATUS,
} from "../../../../redux/actions/order";
import { CSVLink } from "react-csv";

// ** Table Header
const CustomHeader = ({
  searchTerm,
  handleSearch,
  hadleEndDate,
  hadleStartDate,
  endDate,
  startDate,
}) => {
  const dispatch = useDispatch();
  const [downloadTest, setDownloadTest] = useState([
    {
      data: "no found",
    },
  ]);

  const csvLinkExport = useRef();
  const handleExport = () => {
    dispatch(GET_ALL_ORDER_EXPORT(1, searchTerm, startDate, endDate)).then(
      (res) => {
        const formattedData = res.data.bookingData.map((item,index) => ({
          S_No: index+1,
          Order_Id: item.id,
          Booking_details: `test name ${index + 1}: ${item?.test_name || "N/A"}`,
          Booked_By: `Name: ${item.userName}\nEmail: ${item.userEmail}\nMobile: ${item.userMobile}`,
          Member: `Full Name: ${item.memberData?.fullName}\nGender: ${item.memberData?.gender}\nPhone: ${item.memberData?.phone}\nRelation: ${item.memberData?.relation}`,
          User_Mobile: item.memberData?.phone,
          User_Adress: `${item.addressData?.address1}\n${item.addressData?.city}`,
          Order_date: item.totalAmount,
          Amount: item.paymentAmount,
          Collection_Date_Time: item.sampleCollectionDateTime,
          Time_slot: item.timeslot,
          Payment: item.is_paid,
        }));
          setDownloadTest(formattedData);
        setTimeout(() => {
          csvLinkExport.current?.link?.click();
        }, 600);
      }
    );
  };
  return (
    <div className="w-100 mb-2">
      <Row className={"gap-3 justify-content-between align-items-center"}>
        <Col className="p-2" md="4" sm="8">
          <div>
            <Input
              id="search-user"
              className="w-100"
              placeholder="Search order"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>

        <Col className="p-2" md="4" sm="8">
          <FormGroup>
            <Label for="exampleDate">Filter By Start Date</Label>
            <Input
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="date"
              value={startDate}
              onChange={(e) => hadleStartDate(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col className="p-2" md="4" sm="8">
          <FormGroup>
            <Label for="exampleDate">Filter By End Date</Label>
            <Input
              id="exampleDate"
              name="date"
              placeholder="date placeholder"
              type="date"
              value={endDate}
              onChange={(e) => hadleEndDate(e.target.value)}
            />
          </FormGroup>
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
      </Row>
    </div>
  );
};

const OrderTable = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory();

  const { menuAllList } = useSelector((state) => state.orderReducer);
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  const searchname = searchParams.get("searchname");
  const [searchTerm, setSearchTerm] = useState(searchname || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(GET_ALL_ORDER(page.selected + 1, searchname, startDate, endDate));
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on search query change
  const handleSearch = (val) => {
    setSearchTerm(val);
    const debounceTimer = setTimeout(() => {
      dispatch(GET_ALL_ORDER(1, val, startDate, endDate));
      history.push(`${window.location.pathname}?searchname=${val}`);
    }, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  };

  const hadleStartDate = (date) => {
    setStartDate(date);
    dispatch(GET_ALL_ORDER(1, searchTerm, date, endDate));
  };

  const handleStatusChange = (row) => {
    dispatch(
      PUT_PAYMENT_STATUS(row._id, {
        is_paid: !row.is_paid,
      })
    ).then((res) => {
      if (res) {
        dispatch(GET_ALL_ORDER(currentPage, searchname, startDate, endDate));
      }
    });
  };
  const hadleEndDate = (date) => {
    setEndDate(date);
    dispatch(GET_ALL_ORDER(1, searchname, startDate, date));
  };

  useEffect(() => {
    dispatch(GET_ALL_ORDER(1, searchname, "", ""));
  }, []);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(menuAllList?.data?.pagination?.total / 10));

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
          // expandableRows
          noDataComponent={
            <div>
              <img src="/Nodatacomponent.png" />
            </div>
          }
          paginationServer
          id="_id"
          columns={columns(handleStatusChange)}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={menuAllList?.data?.bookingData || []}
          // expandableRowsComponent={ExpandedComponent}
          paginationComponent={CustomPagination}
          subHeaderComponent={
            <CustomHeader
              handleSearch={(e) => handleSearch(e)}
              searchTerm={searchTerm}
              startDate={startDate}
              endDate={endDate}
              hadleStartDate={(e) => hadleStartDate(e)}
              hadleEndDate={(e) => hadleEndDate(e)}
            />
          }
        />
      </Card>
    </Fragment>
  );
};

export default OrderTable;
