import { memo, useState, Fragment, useEffect } from "react";

// ** Bootsrap components
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
  CustomInput,
} from "reactstrap";

import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";

// ** redux hools and store
import { useDispatch, useSelector } from "react-redux";

import EditorCom from "../../../../@core/components/editor";
import { CheckObjectValidation } from "../../../../utility/Utils";
import {
  ADD_CATEGORY_BY_ADMIN,
  GET_ALL_CATEGORIES,
} from "../../../../redux/actions/category";

// ** Utils funtion to check validation

const AddCategory = () => {
  // ** redux hools and store
  const dispatch = useDispatch();
  // ** states
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // const store = useSelector((state) => state.category);
  // const { categories } = store;
  const [errorKeyName, setErrorKeyName] = useState("");
  const [payload, setPayload] = useState({
    perent_category_name: null,
    category_name: "",
    category_url: "",
    image: "",
    status: "",
    category_menu_active: "",
    category_desc: "",
    category_article: "",
    position: "",
    // meta_desc:'',
    // meta_keyword:'',
    // meta_title:''
  });

  const getContent = (htmlContentProp, name) => {
    setPayload({ ...payload, [name]: htmlContentProp });
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    if (name === "category_name") {
      setPayload({
        ...payload,
        [name]: value,
        category_url: value.replaceAll(" ", "-"),
      });
    } else {
      setPayload({ ...payload, [name]: value });
    }
  };

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setPayload({ ...payload, [name]: files[0], [`${name}_base64`]: imageUrl });
  };

  const handleRadioButtons = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async (e) => {
    delete payload?.home_image_base64;
    delete payload?.image_base64;
    delete payload?.mobile_banner_base64;
    const checkValidation = CheckObjectValidation(payload, [
      "image",
      "status",
      "category_name",
      "perent_category_name",
    ]);
    setErrorKeyName(checkValidation.keyname);

    if (checkValidation.isvalid) {
      setLoading(true);

      const res = await dispatch(ADD_CATEGORY_BY_ADMIN(payload));
      if (res?.success) {
        history.push("/apps/category/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    dispatch(GET_ALL_CATEGORIES(1, 100, ""));
  }, []);
  console.log("payload", payload);
  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add Category</h4>
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
                <Label for="userName">
                  Category{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="category_name"
                  id="category_name"
                  placeholder="Enter Category Name"
                  value={payload?.category_name}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="Category">
                  Category Url{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="category_url"
                  id="category_url"
                  placeholder="Enter Category Url"
                  value={payload?.category_url}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label htmlFor="position">
                  Position
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="number"
                  name="position"
                  id="position"
                  placeholder="Position"
                  value={payload?.position}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Status
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                {errorKeyName === "status" ? (
                  <span className="text-danger">Select Any Status</span>
                ) : null}
                <Row>
                  <Col md="3" sm="12">
                    <CustomInput
                      type="radio"
                      id="status-active"
                      name="status"
                      value={1}
                      onChange={handleRadioButtons}
                      label="Active"
                    />
                  </Col>
                  <Col md="3" sm="12">
                    <CustomInput
                      type="radio"
                      id="status-inactive"
                      name="status"
                      value={0}
                      onChange={handleRadioButtons}
                      label="Inactive"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Menu Link
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                {errorKeyName === "category_menu_active" ? (
                  <span className="text-danger">Select Any Category</span>
                ) : null}
                <Row>
                  <Col md="3" sm="12">
                    <CustomInput
                      type="radio"
                      id="menu-active"
                      name="category_menu_active"
                      value={1}
                      onChange={handleRadioButtons}
                      label="Active"
                    />
                  </Col>
                  <Col md="3" sm="12">
                    <CustomInput
                      type="radio"
                      id="menu-inactive"
                      name="category_menu_active"
                      value={0}
                      onChange={handleRadioButtons}
                      label="Inactive"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="Description">
                  Description{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <EditorCom getContent={getContent} name="category_desc" />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Category Image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Category Image"
                  onChange={handleFiles}
                />
                {payload.image_base64 ? (
                  <div>
                    <span>Image Preview: </span>
                    <img
                      src={payload?.image_base64}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Mobile Banner (350*190)
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="mobile_banner"
                  id="image"
                  placeholder="Mobile Banner"
                  onChange={handleFiles}
                />
                {payload.mobile_banner_base64 ? (
                  <div>
                    <span>Image Preview: </span>
                    <img
                      src={payload?.mobile_banner_base64}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="category_image_altTag">
                  Category Image Alt{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="category_image_altTag"
                  id="category_image_altTag"
                  placeholder="Category Image Alt "
                  value={payload?.category_image_altTag}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  Home Page Image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="home_image"
                  id="home_image"
                  placeholder="Home Page"
                  onChange={handleFiles}
                />
                {payload?.home_image_base64 ? (
                  <div>
                    <span>Image Preview: </span>
                    <img
                      src={payload?.home_image_base64}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="home_image_altTag">
                  Home Image Alt
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="home_image_altTag"
                  id="home_image_altTag"
                  placeholder="Category Image Alt "
                  value={payload?.home_image_altTag}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup className="mt-2">
                <Label for="Article">
                  Article{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <EditorCom getContent={getContent} name="category_article" />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagtile">
                  Meta Tag Title
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="meta_title"
                  id="meta_title"
                  placeholder="Enter Meta Title"
                  value={payload?.meta_title}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagdescription">
                  Meta Tag Description
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="meta_desc"
                  id="meta_desc"
                  placeholder="Enter Meta Description"
                  value={payload?.meta_desc}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label>
                  Meta Tag Keywords
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="meta_keyword"
                  id="meta_keyword"
                  placeholder="Enter Meta Keywords"
                  value={payload?.meta_keyword}
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
                    <span>Add Category</span>
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
export default memo(AddCategory);
