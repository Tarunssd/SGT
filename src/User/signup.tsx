import React, { useRef, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { literal, object, string, TypeOf } from "zod";
import { useForm } from "react-hook-form";

const registerSchema = object({
  name: string()
    .min(1, "Name is required")
    .max(32, "Name must be less than 100 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
  terms: literal(true, {
    invalid_type_error: "Accept Terms is required",
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export function FormPage() {
  return <SignupForm />;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (hiddenFileInput && hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  function handleFileUpload(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log(target.files);
    setUploadedFile(target.files[0].name);
  }

  // function handleFirstName(value: string) {
  //   setFirstName(value);
  //   console.log(value);
  // }

  const onSubmit = (data: any) => {
    console.log(data); // Submit your form data here
  };

  // function handlePassword(value: string) {
  //   console.log(value);
  // }

  // function handleSubmit(event: any) {
  //   console.log(event);
  // }

  // const handlePasswordChange = (target: any) => {
  //   const passwordInputValue = target.input;
  //   const passwordInputFieldName = target.name;
  //   const NewPasswordInput = {
  //     ...passwordInput,
  //     [passwordInputFieldName]: passwordInputValue,
  //   };
  //   setPasswordInput(NewPasswordInput);
  // };

  // const handleValidation = (target: any) => {
  //   const passwordInputValue = target.value;
  //   const passwordInputFieldName = target.name;
  //   //for password
  //   if (passwordInputFieldName === "password") {
  //     const uppercaseRegExp = /(?=.*?[A-Z])/;
  //     const lowercaseRegExp = /(?=.*?[a-z])/;
  //     const digitsRegExp = /(?=.*?[0-9])/;
  //     const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  //     const minLengthRegExp = /.{8,}/;
  //     const passwordLength = passwordInputValue.length;
  //     const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
  //     const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
  //     const digitsPassword = digitsRegExp.test(passwordInputValue);
  //     const specialCharPassword = specialCharRegExp.test(passwordInputValue);
  //     const minLengthPassword = minLengthRegExp.test(passwordInputValue);
  //     let errMsg = "";
  //     if (passwordLength === 0) {
  //       errMsg = "Password is empty";
  //     } else if (!uppercasePassword) {
  //       errMsg = "At least one Uppercase";
  //     } else if (!lowercasePassword) {
  //       errMsg = "At least one Lowercase";
  //     } else if (!digitsPassword) {
  //       errMsg = "At least one digit";
  //     } else if (!specialCharPassword) {
  //       errMsg = "At least one Special Characters";
  //     } else if (!minLengthPassword) {
  //       errMsg = "At least minumum 8 characters";
  //     } else {
  //       errMsg = "";
  //     }
  //     setPasswordErr(errMsg);
  //   }
  //   // for confirm password
  //   if (
  //     passwordInputFieldName === "confirmPassword" ||
  //     (passwordInputFieldName === "password" &&
  //       passwordInput.confirmPassword.length > 0)
  //   ) {
  //     if (passwordInput.confirmPassword !== passwordInput.password) {
  //       setConfirmPasswordError("Confirm password is not matched");
  //     } else {
  //       setConfirmPasswordError("");
  //     }
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <TextField
          {...register("firstName", { required: true })}
          id="outlined-required"
          label="First Name"
          margin="normal"
          // onChange={({ target }) => {
          //   handleFirstName(target.value);
          // }}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert">First name is required</p>
        )}
        <TextField
          {...register("lastName", { required: true })}
          aria-invalid={errors.firstName ? "true" : "false"}
          id="outlined-required"
          label="Last Name"
          margin="normal"
        />
        {errors.lastName?.type === "required" && (
          <p role="alert">Last name is required</p>
        )}
        <TextField
          {...register("email", { required: true })}
          aria-invalid={errors.mail ? "true" : "false"}
          id="outlined-required"
          type="email"
          label="Email"
          margin="normal"
        />
        {errors.mail && <p role="alert">Email Address is required</p>}
        <TextField
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/, // Change the regex as per your phone number format
              message: "Invalid phone number format",
            },
          })}
          aria-invalid={errors.phoneNumber ? "true" : "false"}
          id="outlined-required"
          label="Phone Number"
          margin="normal"
        />
        {errors.phoneNumber && <p role="alert">Phone number is required</p>}
        {errors.mail && <p role="alert">Email Address is required</p>}
        <TextField
          {...register("password", { required: true, minLength: 8 })}
          aria-invalid={errors.password ? "true" : "false"}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          // value={passwordInput}
          // onChange={({ target }) => {
          //   handlePasswordChange(target);
          // }}
          // onKeyUp={({ target }) => {
          //   handleValidation(target);
          // }}
        />
        {errors.password && <p role="alert">Password is required</p>}
        {}
        <p>{uploadedFile}</p>
        <Button
          variant="outlined"
          startIcon={<UploadFile />}
          onClick={handleClick}
        >
          Upload Your Certificate
        </Button>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
          ref={hiddenFileInput}
        />
      </FormControl>
      <button type="submit">Submit</button>
    </form>
  );
}
