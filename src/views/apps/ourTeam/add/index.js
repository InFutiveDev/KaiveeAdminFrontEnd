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
import { CheckObjectValidation } from "../../../../utility/Utils";
import EditorCom from "../../../../@core/components/editor";
import { ADD_OURTEAM_ADMIN } from "../../../../redux/actions/ourTeam";

const AddOurTeam = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [errorKeyName, setErrorKeyName] = useState("");
  const [payload, setPayload] = useState({
    team_name: "",
    team_qualification: "",
    team_image: "",
    team_description: "",
  });
  const getContent = (htmlContentProp, name) => {
    setPayload({ ...payload, [name]: htmlContentProp });
  };

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    if (name === "team_image") {
      setPayload({ ...payload, [name]: files[0], image_url: imageUrl });
    }
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    delete payload.image_url;
    // delete payload.landingpageimage;
    const checkValidation = CheckObjectValidation(payload, []);
    setErrorKeyName(checkValidation.keyname);
    if (checkValidation.isvalid) {
      setLoading(true);
      const res = await dispatch(ADD_OURTEAM_ADMIN(payload));
      if (res?.success) {
        history.push("/apps/our-team/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add Our-Team</h4>
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
                <Label for="title">
                  Doctor name
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="team_name"
                  id="name"
                  placeholder="Enter Doctor name"
                  value={payload?.team_name}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "team_name" ? (
                  <span className="text-danger">Doctor name is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="image">
                  Doctor image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="team_image"
                  id="team_image"
                  placeholder="doctor image"
                  onChange={handleFiles}
                />
                {payload.team_image ? (
                  <div>
                    <span>Doctor image: </span>
                    <img
                      src={payload?.image_url}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
                {errorKeyName === "team_image" ? (
                  <span className="text-danger">Doctor image is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="title">
                  Doctor specialisation{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="team_qualification"
                  id="team_qualification"
                  placeholder="Enter Doctor specialisation"
                  value={payload?.team_qualification}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "team_image" ? (
                  <span className="team_qualification">
                    Doctor image is Required
                  </span>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="12" sm="12">
              <FormGroup>
                <Label for="title">
                  Doctor qualification{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <EditorCom getContent={getContent} name="team_description" />
                {errorKeyName === "team_description" ? (
                  <span className="text-danger">
                    Doctor qualification is Required
                  </span>
                ) : null}
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
                    <span>Add Our-Team Page</span>
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
export default memo(AddOurTeam);
