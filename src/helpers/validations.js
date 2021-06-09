import * as yup from "yup";


export const loginSchema = yup.object().shape({
    identifier: yup.string().required("email or username is required"),
    password: yup.string().required("password is required"),
  });


export const registerSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  email: yup.string().email().required('email is required'),
  password: yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
            'at least 8 characters, one uppercase and one special character')
          .required(),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match')
  .required('passwords must match'),
});