import { Button, Card, CardBody, Col, Input } from "reactstrap";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GET_FAQS_BY_ID } from "@store/actions/faqs";
import { useHistory } from "react-router-dom";

const CustomHeader = ({ searchTerm, handleSearch }) => {
  return (
    <Col md="4" sm="4">
      <div>
        <Input
          id="search-user"
          className="w-100"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </Col>
  );
};

const FaqsListingById = () => {
  const getFaqsById = useSelector((state) => state?.FaqsReducer?.getFaqsById);
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(
    window?.location.search.split("?")[1]
  );
  const itemId = searchParams.get("itemId");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const handlePagination = (page) => {
    dispatch(GET_FAQS_BY_ID(itemId, page.selected + 1));
    setCurrentPage(page.selected + 1);
  };
  // ** Function in get data on search query change
  const handleSearch = (val) => {
    setSearchTerm(val);
    const debounceTimer = setTimeout(() => {
      dispatch(GET_FAQS_BY_ID(itemId, currentPage, 10, val));
    }, 1200);

    return () => {
      clearTimeout(debounceTimer);
    };
  };

  useEffect(() => {
    dispatch(GET_FAQS_BY_ID(itemId, currentPage));
  }, []);
  console.log("getFaqsById", getFaqsById);
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(getFaqsById?.data?.pagination.total / 10));

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
    <div>
      {getFaqsById?.data?.faqTestIdData?.length > 0 && (
        <Card>
          <CardBody>
            <Button.Ripple color="primary" onClick={() => history.goBack()}>
              Back
            </Button.Ripple>
            <DataTable
              pagination
              noHeader={true}
              subHeader
              responsive
              noDataComponent={
                <div>
                  <img src="/Nodatacomponent.png" alt="no data placeholder" />
                </div>
              }
              paginationServer
              id="_id"
              columns={columns}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              data={getFaqsById?.data?.faqTestIdData || []}
              subHeaderComponent={
                <CustomHeader
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                />
              }
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default FaqsListingById;
