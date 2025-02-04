import { Button, Col, Label, Row } from "reactstrap";
import AsyncSelect from "react-select";
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TEST } from "@store/actions/test";
import { UPDATE_LANDING_TEST } from "@store/actions/ladningPage";
import { memo, useEffect, useState } from "react";
import SpinnerComponent from "@components/spinner/Fallback-spinner";

const AddTestMultiSelect = ({ payload, id }) => {
  const store = useSelector((state) => state.test);
  const [loading, setLoading] = useState(false);
  const { tests } = store;
  const [selectedTest, setSelectedTest] = useState([]);
  const [newSearchValue, setNewSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (newSearchValue?.trim() !== "") {
      const debounceTimer = setTimeout(() => {
        dispatch(GET_ALL_TEST(1, newSearchValue));
      }, 1000);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [newSearchValue]);

  useEffect(() => {
    if (payload?.testInfo?.length > 0) {
      const rows = payload?.testInfo?.map((item) => {
        item["label"] = item?.test_name;
        item["value"] = item?._id;

        return {
          label: item?.test_name,
          value: item?._id,
        };
        // return item;
      });
      setSelectedTest(rows || []);
    }
  }, [payload?.testInfo]);

  const dataOptions = () => {
    const modifiedData = tests?.data?.testData?.map((item) => {
      item["label"] = item?.test_name;
      item["value"] = item?._id;
      return item;
    });
    return modifiedData;
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(dataOptions());
    }, 1900);
  };

  const handleInputChange = (inputValue) => {
    setNewSearchValue(inputValue);
  };

  const handleSelectedValue = (rows) => {
    setSelectedTest(rows);
  };

  const handleUpdate = async () => {
    setLoading(true);
    let ids = [];
    for (let id of selectedTest) {
      ids.push(id?.value);
    }
    let res = await dispatch(UPDATE_LANDING_TEST({ addTest: ids }, id));
    setLoading(false);
  };
  console.log("selectedTest", selectedTest);
  return (
    <Row>
      <Col sm="10" md="10" lg="10">
        <Label>Add Tests</Label>
        {/* {selectedTest.length ? ( */}
        <AsyncSelect
          isClearable={false}
          theme={selectThemeColors}
          // defaultValue={selectedTest}
          value={selectedTest}
          isMulti
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={handleInputChange}
          name="colors"
          options={dataOptions()}
          onChange={handleSelectedValue}
          className="react-select"
          classNamePrefix="select"
        />
        {/* ) : (
          ""
        )} */}
      </Col>
      <Col sm="2" md="2" lg="2">
        <Button
          disabled={loading}
          style={{ height: "3rem" }}
          className="mt-2"
          color="primary"
          onClick={handleUpdate}
        >
          {loading ? (
            <>
              <span className="ml-50">Loading...</span>
            </>
          ) : (
            <span>Update Test</span>
          )}
        </Button>
      </Col>
    </Row>
  );
};

export default memo(AddTestMultiSelect);
