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
import {
  GET_HABIT_BY_ID_ADMIN,
  HABIT_UPDATE_ADMIN,
} from "../../../../redux/actions/habit";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";

const EditHabit = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { Habits } = store.habit;
  const { habitId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState(null);
  const [changImg, setChangeImg] = useState();

  useEffect(() => {
    dispatch(GET_HABIT_BY_ID_ADMIN(habitId));
  }, [habitId]);

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setChangeImg(imageUrl);
    setPayload({ ...payload, [name]: files[0], hebit_image: files[0] });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    delete payload.image_url;
    setLoading(true);

    const res = await dispatch(HABIT_UPDATE_ADMIN(habitId, payload));
    if (res?.success) {
      history.push("/apps/habit/all");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Habits?.data && Habits?.data.length) {
      setPayload({
        hebitName: Habits?.data[0].hebitName,
        hebit_image: Habits?.data[0].hebit_image,
        description: Habits?.data[0].description,
        image_url: Habits.data[0].hebit_image,
      });
    }
  }, [Habits?.data]);
  return (
    <div>
      {!payload ? (
        <SpinnerComponent />
      ) : (
        <Card>
          <CardHeader className="w-100">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h4>Edit Habit</h4>
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
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="Habit Name">
                    Habit Name <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="text"
                    name="hebitName"
                    id="healthRiskTitle"
                    placeholder="Enter Habit Name"
                    value={payload?.hebitName}
                    onChange={hanleInputBase}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">
                    Description <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="healthRiskTitle"
                    placeholder="Enter Habit Name"
                    value={payload?.description}
                    onChange={hanleInputBase}
                    rows="8"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image">
                    Health Risk Image
                    <span className="text-danger"></span>
                  </Label>
                  <Input
                    type="file"
                    name="hebit_image"
                    id="hebit_image"
                    placeholder="Hebit Image"
                    onChange={handleFiles}
                  />
                  <span>Image Preview: </span>
                  <img
                    src={changImg ? changImg : payload?.hebit_image}
                    style={{ height: "100px", width: "100px" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Hebit Image Alt Text</Label>
                  <Input
                    type="text"
                    name="hebit_image_alt"
                    id="hebit_image_alt"
                    placeholder="Enter Alt Text for Image"
                    value={payload?.hebit_image_alt}
                    onChange={hanleInputBase}
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
                      <span>Update Habit</span>
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
export default memo(EditHabit);
