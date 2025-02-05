import { AlertCircle } from "react-feather";
import { Slide, toast } from "react-toastify";
import ToastContent from "../views/components/toastContent";
import * as yup from "yup";
import ibanCheck from "iban";
// ** Checks if an object is empty (returns boolean)
const { REACT_APP_REDUCEIMAGE_AWS, REACT_APP_S3BUCKETPATH } = process.env;

export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return "/";
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#00B0ED1a", // for option hover bg-color
    primary: "#D41958", // for selected option bg-color
    neutral10: "#D41958", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});

// ** This fucntion is to convert object to formdata
export const getObjectFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
// ** In this funtion we have to pass 2 arguments 1st is object and 2nd is list of not required fileds anme
export const CheckObjectValidation = (data, notRequired) => {
  for (let keyname in data) {
    if (keyname === "email") {
      if (!validateEmail(data[keyname])) {
        toast.error(
          <ToastContent
            type={"danger"}
            icon={<AlertCircle size={12} />}
            text={`Email format is not valid !`}
            title={`Invalid email address`}
          />,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        );
        return { isvalid: false, keyname };
      }
    } else if (keyname == "test_url") {
      if (data.test_url.length === 24) {
        return { isvalid: false, keyname };
      }
    } else if (
      !notRequired.includes(keyname) &&
      (data[keyname] === undefined ||
        data[keyname] === null ||
        data[keyname].length === 0 ||
        data[keyname] === "\r\n" ||
        data[keyname] === "\n" ||
        data[keyname] === "")
    ) {
      toast.error(
        <ToastContent
          type={"danger"}
          icon={<AlertCircle size={12} />}
          text={`${keyname} is required please cross check you all fields`}
          title={`${keyname} is required`}
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      );
      return { isvalid: false, keyname };
    }
  }
  return { isvalid: true, keyname: "" };
};

// ** checking validation for bank account details input
const name = yup
  .string()
  .required("Name is required")
  .matches(
    /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
    "Name can contain only alpha and space"
  )
  .min(3, "Name must be 3 characters at minimum!")
  .max(150, "Name can have maximum of 150 characters");

const bankName = yup
  .string()
  .required("Bank Name is required")
  .trim()
  .max(60, "Bank Name can have maximum of 60 characters")
  .matches(
    /^(([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+)*$/,
    "Please enter valid bank name"
  );

const accountNumber = yup
  .string()
  .required("Account Number is required")
  .matches(/^[0-9]*$/, "Account can contain only numeric")
  .min(9, "Account Number should have minimum of 9 characters")
  .max(18, "Account Number can have maximum of 18 characters");

const confirmAccountNumber = yup
  .string()
  .required("Enter confirm account number")
  .oneOf(
    [yup.ref("accountNumber"), null],
    "Confirm account number and Account number should match"
  );

const IFSC = yup
  .string()
  .required("IFSC code is required")
  .matches(
    /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
    "IFSC code can contain only alphanumeric characters (ex, ABCD0001231)"
  )
  .min(11, "IFSC should have exactly 11 characters")
  .max(11, "IFSC should have exactly 11 characters");

const IBAN = yup
  .string()
  .optional()
  .nullable()
  .max(36, "IBAN can have maximum of 36 characters")
  .test("is-valid-iban", "Please enter valid IBAN", (value) =>
    value ? ibanCheck.isValid(value) : true
  );

const additionalDetails = yup
  .string()
  .trim()
  .optional()
  .min(15, "Additional details should have minimum of 15 characters")
  .max(250, "Additional details can have maximum of 250 characters");

const swiftCode = yup
  .string()
  .trim()
  .required("Swift Code is required")
  .matches(
    /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
    "Please enter valid Swift Code"
  )
  .min(8, "Swift Code should have minimum of 8 characters")
  .max(11, "Swift Code can have maximum of 11 characters");

export const CheckBankDetailsValidation = async (data) => {
  const newForm = {};

  for (const keyname in data) {
    newForm[keyname] = data[keyname].val;
  }

  const bankDetailsSchema = yup.object().shape({
    name,
    bankName,
    accountNumber,
    confirmAccountNumber,
    IFSC,
    IBAN,
    additionalDetails,
    swiftCode,
  });

  const nameSchema = yup.object().shape({
    name,
  });

  const bankNameSchema = yup.object().shape({
    bankName,
  });
  const accountNumberSchema = yup.object().shape({
    confirmAccountNumber,
    accountNumber,
  });
  const IFSCSchema = yup.object().shape({
    IFSC,
  });
  const IBANSchema = yup.object().shape({
    IBAN,
  });
  const additionalDetailsSchema = yup.object().shape({
    additionalDetails,
  });
  const swiftCodeSchema = yup.object().shape({
    swiftCode,
  });

  const dal = bankDetailsSchema
    .isValid(newForm)
    .then(async (valid) => {
      if (!valid) {
        let reSce = null;
        for (const keyname in newForm) {
          if (keyname === "name") {
            reSce = await nameSchema
              .validate({ name: newForm[keyname] })
              .catch((err) => {
                toast.error(
                  <ToastContent
                    type={"danger"}
                    icon={<AlertCircle size={12} />}
                    text={err.errors}
                    title={err.name}
                  />,
                  { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                );
                // errValue = keyname
                return { isvalid: false, keyname };
              });
            if (reSce?.keyname) break;
          }
          if (keyname === "bankName") {
            reSce = await bankNameSchema
              .validate({ bankName: newForm[keyname] })
              .catch((err) => {
                toast.error(
                  <ToastContent
                    type={"danger"}
                    icon={<AlertCircle size={12} />}
                    text={err.errors}
                    title={err.name}
                  />,
                  { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                );
                // errValue = keyname
                return { isvalid: false, keyname };
              });
            if (reSce?.keyname) break;
          }
          if (
            keyname === "accountNumber" ||
            keyname === "confirmAccountNumber"
          ) {
            reSce = await accountNumberSchema
              .validate({
                confirmAccountNumber: newForm["confirmAccountNumber"],
                accountNumber: newForm["accountNumber"],
              })
              .catch((err) => {
                toast.error(
                  <ToastContent
                    type={"danger"}
                    icon={<AlertCircle size={12} />}
                    text={err.errors}
                    title={err.name}
                  />,
                  { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                );
                // errValue = keyname
                return { isvalid: false, keyname };
              });
            if (reSce?.keyname) break;
          }
          if (keyname === "IFSC") {
            reSce = await IFSCSchema.validate({ IFSC: newForm[keyname] }).catch(
              (err) => {
                toast.error(
                  <ToastContent
                    type={"danger"}
                    icon={<AlertCircle size={12} />}
                    text={err.errors}
                    title={err.name}
                  />,
                  { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                );
                // errValue = keyname
                return { isvalid: false, keyname };
              }
            );
            if (reSce?.keyname) break;
          }
          if (keyname === "IBAN") {
            reSce = await IBANSchema.validate({ IBAN: newForm[keyname] }).catch(
              (err) => {
                toast.error(
                  <ToastContent
                    type={"danger"}
                    icon={<AlertCircle size={12} />}
                    text={err.errors}
                    title={err.name}
                  />,
                  { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                );
                // errValue = keyname
                return { isvalid: false, keyname };
              }
            );
            if (reSce?.keyname) break;
          }
          if (keyname === "additionalDetails") {
            if (newForm[keyname].length > 0) {
              reSce = await additionalDetailsSchema
                .validate({ additionalDetails: newForm[keyname] })
                .catch((err) => {
                  toast.error(
                    <ToastContent
                      type={"danger"}
                      icon={<AlertCircle size={12} />}
                      text={err.errors}
                      title={err.name}
                    />,
                    {
                      transition: Slide,
                      hideProgressBar: true,
                      autoClose: 3000,
                    }
                  );
                  return { isvalid: false, keyname };
                });
              if (reSce?.keyname) break;
            }
          }
          if (keyname === "swiftCode") {
            reSce = await swiftCodeSchema
              .validate({ swiftCode: newForm[keyname] })
              .catch((err) => {
                toast.error(
                  <ToastContent
                    type={"danger"}
                    icon={<AlertCircle size={12} />}
                    text={err.errors}
                    title={err.name}
                  />,
                  { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                );
                // errValue = keyname
                return { isvalid: false, keyname };
              });
            if (reSce?.keyname) break;
          }
        }
        return reSce;
      }
    })
    .catch((error) => console.log(error.message));
  const res = await dal;

  if (res?.keyname) return res;
  // bankDetailsSchema.validate(newForm).catch((err) => console.log(err.name, err.errors))
  return { isvalid: true, keyname: "" };
};

// ** Check validation of number max length

export const MaxLengthValidation = (e) => {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
};

export const fileExtension = (fileName) => {
  if (fileName) {
    const url = fileName.split("?")[0];
    const extension = url.split(".").pop();
    return extension || "";
  }
  return "";
};

export const accessImagesOrVideo = (size, path) => {
  if (path?.endsWith(".gif")) {
    return `${REACT_APP_S3BUCKETPATH}/${path}`;
  }
  return `${REACT_APP_REDUCEIMAGE_AWS}/${size}/${path}`;
};

export const getVideoPath = (path) => {
  return `${REACT_APP_S3BUCKETPATH}/${path}`;
};

export const getInitial = (name = "") => {
  return name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join(" ");
};
