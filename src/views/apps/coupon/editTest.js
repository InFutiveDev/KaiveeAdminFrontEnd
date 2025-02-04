import { Button, Col, Label, Row } from "reactstrap";
import AsyncSelect from "react-select";
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TEST } from "@store/actions/test";
import { memo, useEffect, useState } from "react";
import SpinnerComponent from "@components/spinner/Fallback-spinner";

const EditTest = ({ setFieldValue, value }) => {
  const store = useSelector((state) => state.test);
  const [selectedTest, setSelectedTest] = useState(value);
  const [newSearchValue, setNewSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTest(value);
  }, [value]);

  useEffect(() => {
    if (newSearchValue?.trim() !== "") {
      const debounceTimer = setTimeout(() => {
        dispatch(GET_ALL_TEST(1, newSearchValue));
      }, 1000);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [newSearchValue, dispatch]);

  const dataOptions = () => {
    return (
      store?.tests?.data?.testData?.map((item) => ({
        label: item?.test_name,
        value: item?._id,
      })) || []
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(dataOptions());
    }, 1900);
  };

  const handleInputChange = (inputValue) => {
    setNewSearchValue(inputValue);
  };

  const handleSelectedValue = (selectedOption) => {
    setSelectedTest(selectedOption);
    setFieldValue("editTest", selectedOption);
  };

  return (
    <Row>
      <Col sm="10" md="10" lg="10">
        <Label>Edit Test</Label>
        <AsyncSelect
          isClearable={false}
          theme={selectThemeColors}
          value={selectedTest}
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={handleInputChange}
          options={dataOptions()}
          onChange={handleSelectedValue}
          className="react-select"
          classNamePrefix="select"
        />
      </Col>
    </Row>
  );
};

export default memo(EditTest);
