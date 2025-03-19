import * as yup from "yup";

const baseSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
})

export const signupSchema = baseSchema.shape({
  name: yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
});

export const loginSchema = baseSchema
