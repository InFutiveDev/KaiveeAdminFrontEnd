import { memo, useState, Fragment, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
  Spinner,
} from "reactstrap";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { ADD_BIOWASTE_ADMIN } from "../../../../redux/actions/biowaste";

const AddBioWaste = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [payload, setPayload] = useState({ year: "", months: "" });

  const monthsData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var thisYear = new Date().getFullYear();
  let yearData = [];
  for (var i = 0; i <= 30; i++) {
    var year = thisYear - i;
    yearData.push(year);
  }
  const handleFiles = async (e) => {
    const { name, files } = e.target;
    // const imageUrl = URL.createObjectURL(files[0]);
    setFile(files[0]);
  };
  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const handleSubmit = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const arrayOfObjects = XLSX.utils.sheet_to_json(sheet);
        console.log("dkjfkdkfj", arrayOfObjects);
        let copyArray = arrayOfObjects.map((item) => {
          return {
            ...item,
            year: payload?.year || "",
            months: payload?.months || "",
          };
        });
        setLoading(true);
        const res = await dispatch(ADD_BIOWASTE_ADMIN(copyArray));
        if (res?.success) {
          history.push("/apps/bio-waste/all");
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add BioWaste</h4>
            <Button.Ripple
              onClick={() => {
                history.goBack();
              }}
              color="primary"
              outline
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button.Ripple>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="6" sm="6">
              <FormGroup>
                <Label for="Months">Months</Label>
                <Input
                  type="select"
                  name="months"
                  id="months"
                  placeholder="Enter Months"
                  value={payload?.months}
                  onChange={hanleInputBase}
                >
                  <option
                    value="January"
                    className="text-[14px] font-normal font-source-pro"
                  >
                    Select Month
                  </option>
                  {monthsData.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      className="text-[14px] font-normal font-source-pro"
                    >
                      {item}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="year">year</Label>
                <Input
                  type="select"
                  name="year"
                  id="year"
                  placeholder="Enter Year"
                  value={payload?.year}
                  onChange={hanleInputBase}
                >
                  <option
                    value="January"
                    className="text-[14px] font-normal font-source-pro"
                  >
                    Select Year
                  </option>
                  {yearData.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      className="text-[14px] font-normal font-source-pro"
                    >
                      {item}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="file">
                  Excel Upload
                  {/* <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span> */}
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  //   placeholder="Enter name"
                  //   value={payload?.name}
                  onChange={handleFiles}
                />
              </FormGroup>
            </Col>

            <Col sm="12">
              <FormGroup className="d-flex mb-0">
                <Button
                  type="submit"
                  disabled={loading}
                  className="mr-1"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Fragment>
                      <Spinner size="sm" />
                      <span className="ml-50">Loading...</span>
                    </Fragment>
                  ) : (
                    <span>Add BioWaste</span>
                  )}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default memo(AddBioWaste);
