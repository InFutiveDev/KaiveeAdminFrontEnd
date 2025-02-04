// ** React Imports
import { Fragment, createRef, useEffect, useRef, useState } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_TEST,
  GET_ALL_TEST_EXPORT,
  GET_ALL_TEST_UPDATE,
  PUT_TEST_STATUS,
} from "../../../../redux/actions/test";
// **  Components
import { columns } from "./columns";
import ReactPaginate from "react-paginate";
import { ChevronDown, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import { GLOBAL_LOADING } from "../../../../redux/actions/loading";

// ** Table Header
const CustomHeader = ({ searchTerm, handleSearch }) => {
  const store = useSelector((state) => state);
  const { globalLoading } = store.loading;
  const [open, setOpen] = useState(false);
  const [openU, setOpenU] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [openUpdate, setOpenUpdate] = useState(false);
  const dispatch = useDispatch();
  const [downloadTest, setDownloadTest] = useState([
    {
      data: "no found",
    },
  ]);

  const csvLinkExport = useRef();

  const history = useHistory();

  const handleExport = () => {
    dispatch(GET_ALL_TEST_EXPORT(1, "")).then((res) => {
      setDownloadTest(res?.data?.testData);
      setTimeout(() => {
        csvLinkExport.current?.link?.click();
        setOpen(false);
      }, 600);
    });
  };

  const handleUpdateAll = () => {
    setLoading(true);
    dispatch(GET_ALL_TEST_UPDATE()).then((res) => {
      setLoading(false);
      setOpenU(false);
    });
    setTimeout(() => {
      dispatch(GLOBAL_LOADING(false));
      setOpenU(false);
    }, 600);
  };
  return (
    <div className="w-100">
      <Row>
        <Col md="6" sm="6">
          <div>
            <Input
              id="search-user"
              className="w-50"
              placeholder="Search Test By Name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Col>
        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple color="primary" onClick={() => setOpen(!open)}>
              {/* <Plus className="mr-1" size={16} /> */}
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
        <Modal isOpen={open} toggle={() => setOpen(!open)}>
          <ModalHeader toggle={() => setOpen(!open)}>Download Test</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to download Test</p>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={globalLoading}
              onClick={handleExport}
              // color="danger"
            >
              {globalLoading ? (
                <Fragment>
                  <Spinner size="sm" />
                  <span className="ml-50">Loading...</span>
                </Fragment>
              ) : (
                <span>yes</span>
              )}
            </Button>
          </ModalFooter>
        </Modal>
        <Col md="2" sm="1">
          <div className="d-flex justify-content-end">
            <Button.Ripple
              color="primary"
              onClick={() => {
                setOpenU(!openU);
              }}
            >
              {loading ? (
                <Fragment>
                  <Spinner size="sm" />
                  <span className="ml-50">Loading...</span>
                </Fragment>
              ) : (
                <span>Update All</span>
              )}
            </Button.Ripple>
          </div>
        </Col>
        <Modal isOpen={openU} toggle={() => setOpenU(!openU)}>
          <ModalHeader toggle={() => setOpenU(!openU)}>Update Test</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to update Test</p>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={globalLoading}
              onClick={handleUpdateAll}
              // color="danger"
            >
              {globalLoading ? (
                <Fragment>
                  <Spinner size="sm" />
                  <span className="ml-50">Loading...</span>
                </Fragment>
              ) : (
                <span>yes</span>
              )}
            </Button>
          </ModalFooter>
        </Modal>
        <Col md="2" sm="2">
          <div className="d-flex justify-content-end">
            <Button.Ripple
              onClick={() => {
                history.push("/apps/test/add");
              }}
              color="primary"
            >
              <Plus className="mr-1" size={16} />
              Add
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const TestList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector((state) => state.test);
  const { tests } = store;
  // ** States
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  const searchname = searchParams.get("searchname");
  const [searchTerm, setSearchTerm] = useState(searchname || "");
  const [currentPage, setCurrentPage] = useState(1);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(GET_ALL_TEST(page.selected + 1, searchname));
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on search query change
  const handleSearch = (val) => {
    setSearchTerm(val);
    const debounceTimer = setTimeout(() => {
      dispatch(GET_ALL_TEST(1, val));
      history.push(`${window.location.pathname}?searchname=${val}`);
    }, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  };
  const handleStatusChange = (row) => {
    dispatch(
      PUT_TEST_STATUS(row._id, {
        test_status: !row.test_status,
      })
    ).then((res) => {
      if (res) {
        dispatch(GET_ALL_TEST(currentPage, searchname));
      }
    });
  };

  useEffect(() => {
    dispatch(GET_ALL_TEST(1, searchname));
  }, []);

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(tests?.data?.pagination.total / 10));

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
              <img src="/Nodatacomponent.png" alt="no data placeholder" />
            </div>
          }
          paginationServer
          id="_id"
          columns={columns(handleStatusChange)}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={tests?.data?.testData || []}
          subHeaderComponent={
            <CustomHeader searchTerm={searchTerm} handleSearch={handleSearch} />
          }
        />
      </Card>
    </Fragment>
  );
};

export default TestList;
