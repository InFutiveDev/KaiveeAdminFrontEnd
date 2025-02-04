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
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

import {
  GET_BIOWASTE_BY_ID_ADMIN,
  UPDATE_BIOWASTE_TEST,
} from "../../../../redux/actions/biowaste";

const EditLandingPageData = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { bioWaste } = store.biowaste;
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
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
  useEffect(() => {
    dispatch(GET_BIOWASTE_BY_ID_ADMIN(id));
  }, [id]);
  console.log("payload", payload);
  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await dispatch(UPDATE_BIOWASTE_TEST(payload, id));
    if (res?.success) {
      history.push("/apps/bio-waste/all");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  console.log("bioWaste", bioWaste, "payload", payload);

  useEffect(() => {
    if (bioWaste?.data && bioWaste?.data.length) {
      let copyData = {
        ...bioWaste.data[0],
      };
      delete copyData?._id;
      delete copyData?.updatedAt;
      delete copyData?.createdAt;
      delete copyData?.__v;
      setPayload({ ...copyData });
    }
  }, [bioWaste?.data]);

  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Edit BioWaste</h4>
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
                  <Label for="title">Centre name</Label>
                  <Input
                    type="text"
                    name="centre_name"
                    id="centre_name"
                    placeholder="Enter Centre Name"
                    value={payload?.centre_name}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Blue card board box</Label>
                  <Input
                    type="text"
                    name="blue_card_board_box"
                    id="blue_card_board_box"
                    placeholder="Enter Blue Card"
                    value={payload?.blue_card_board_box}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="6">
                <FormGroup>
                  <Label for="title">Red bag</Label>
                  <Input
                    type="text"
                    name="red_bag"
                    id="red_bag"
                    placeholder="Enter Red Bag"
                    value={payload?.red_bag}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Sharp box</Label>
                  <Input
                    type="text"
                    name="sharp_box"
                    id="sharp_box"
                    placeholder="Enter Sharp Box"
                    value={payload?.sharp_box}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="6">
                <FormGroup>
                  <Label for="title">Yellow bag</Label>
                  <Input
                    type="text"
                    name="yellow_bag"
                    id="yellow_bag"
                    placeholder="Enter Yellow Bag"
                    value={payload?.yellow_bag}
                    onChange={hanleInputBase}
                  />
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
              </Col>

              <Col md="12" sm="12">
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
                      <span>Update BioWaste</span>
                    )}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
export default memo(EditLandingPageData);
