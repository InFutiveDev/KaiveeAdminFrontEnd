import React, { useEffect } from "react";
import Logo from "../../../../assets/images/logo/logo.png";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Phone } from "react-feather";
import Footer   from "./footer"; "./"
// import ImageOne from "/home/Frame 1410144203.png";
import ImageOne from "../../../../assets/images/home/Frame 1410144203.png";
import ImageTwo from "../../../../assets/images/home/Frame 1410144203 (1).png";
import ImageThree from "../../../../assets/images/home/Frame 1410144203 (2).png";
import ImageFour from "../../../../assets/images/home/Frame 1410144203 (3).png";
import ImageFive from "../../../../assets/images/home/Frame 1410144203 (7).png";
import ImageSix from "../../../../assets/images/home/Frame 1410144203 (4).png";
import ImageSeven from "../../../../assets/images/home/Frame 1410144203 (5).png";
import ImageEight from "../../../../assets/images/home/Frame 1410144203 (6).png";
import ImageNine from "../../../../assets/images/home/Frame 1410144204.png";
import { GET_LANDING_BY_ID_ADMIN } from "../../../../redux/actions/ladningPage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ViewLandingPage = () => {
  const { id } = useParams();
  const store = useSelector((state) => state);
  const { landing } = store.landing;
  const dispatch = useDispatch();
  console.log("landing---->>", landing);
  useEffect(() => {
    dispatch(GET_LANDING_BY_ID_ADMIN(id));
  }, [id]);
  return (
    <div>
      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <img src={Logo} />
          </div>
          <div>
            <div className="d-flex justify-content-end">
              <Button.Ripple
                // onClick={() => {
                //   history.push("/apps/landing-page/add");
                // }}
                color="primary"
              >
                <Phone size={16} className="mr-1" />
                {landing?.data[0]?.phone}
              </Button.Ripple>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* {landing?.data[0]?.landingpageimage && ( */}
        <div className="background-image-covid d-flex justify-content-between align-items-start ">
          <div className="bg-div">
            <img
              src={landing?.data[0]?.landingpageimage}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="px-5 mt-3">
            <h2 style={{ color: "black" }}>{landing?.data[0]?.title}</h2>
            {/* <p style={{ color: "black" }}>{landing?.data[0]?.bannerContant}</p> */}
            {/* <div className="flex gap-2">
              <button className="flex gap-x-2 justify-center items-center text-orange bg-white rounded py-[12px] lg:px-[24px] px-[12px] lg:text-[18px] text-[14px]">
                <CallYellowImg />
                Call To Action
              </button>
            </div> */}
          </div>
        </div>
        {/* )} */}
      </div>
      <div className="container py-5">
        <Row>
          <Col lg={8}>
            <p className="main-title">Description</p>
            <p
              className="sub-p"
              dangerouslySetInnerHTML={{
                __html:
                  landing?.data[0]?.testArticle ||
                  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet",
              }}
            ></p>
          </Col>
          <Col lg={4}>
            <div className=" p-2 card">
              <div className=" rounded-3xl p-[33px] enquiry-from">
                <div className="">
                  {/* <FacilitesBooksSvg /> */}
                  <p className="">Enquiry Form</p>
                </div>
              </div>
              <div className="mt-2">
                <FormGroup>
                  <Label for="title">Customer Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Customer Name"
                    // value={payload?.name}
                    // onChange={hanleInputBase}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="title">Phone Number</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Phone Number"
                    // value={payload?.name}
                    // onChange={hanleInputBase}
                  />
                </FormGroup>

                <div className="mt-2">
                  <Button.Ripple
                    // onClick={() => {
                    //   history.push("/apps/landing-page/add");
                    // }}
                    color="primary"
                  >
                    {/* <Phone size={16} className="mr-1" /> */}
                    submit
                  </Button.Ripple>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="bg-white">
        <div className={`container py-5 `}>
          <p className="why-chose-test">Why Choose Us</p>
          <div className="mt-2">
            {/* grid lg:grid-cols-5 md:grid-cols-3  sm:grid-cols-2  grid-cols-1 items-center justify-center  place-content-center */}
            <div
              className="row justify-content-center "
              style={{ gap: "30px" }}
            >
              {data?.map((item, index) => (
                <div
                  key={index}
                  style={{ height: "100%" }}
                  className="col-lg-2 col-md-3 col-sm-5 col-8 p-0"
                >
                  <div className="image-div">
                    <div className="d-flex justify-content-center">
                      <img src={item?.image} />
                      {/* <AboutExprienced /> */}
                    </div>
                  </div>
                  <div className="title-main">
                    <div style={{ height: "70px" }}>
                      <p className="p-tag-title ">{item?.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer ></Footer >
    </div>
   
  );
};

export default ViewLandingPage;
const data = [
  {
    title: "Team of Experienced Doctors & Staffs",
    image: ImageOne,
  },
  {
    title: "10M+ Happy Patients",
    image: ImageTwo,
  },
  {
    title: "30 Years of Excellence in Diagnostic Healthcare",
    image: ImageThree,
  },
  {
    title: "World Class Technology",
    image: ImageFour,
  },
  {
    title: "Fast & Accurate Results",
    image: ImageFive,
  },
  {
    title: "Affordable",
    image: ImageSix,
  },
  {
    title: "Free Home Sample Collection",
    image: ImageSeven,
  },
  {
    title: "NABL & NABH Certified Centre",
    image: ImageEight,
  },
  {
    title: "Large Menu of Tests Available ",
    image: ImageNine,
  },
];
