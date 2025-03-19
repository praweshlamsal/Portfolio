'use client';
import React, { JSX, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/admin/components/forms/theme-elements/CustomTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/lib/validation.schema";
import { signIn, useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";


interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const {handleSubmit,formState:{errors},control} = useForm<{email:string,password:string}>({
    resolver: yupResolver(loginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const {  status } = useSession();
  useEffect(()=>{
    if (status == "authenticated") {
        router.replace("/admin")
      }
    },[status,router])
  // console.log(status)
  if(status == "loading"){
    return <>Loading</>
  }

  console.log(status)
 
  
  const onSubmit = async ({email,password}:{email:string,password:string})=>{
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result)
    if (result?.error) {
    
      // setError(result.error);
    } else {
      router.push("/admin"); // Redirect on successful login
    }
  }

  return(
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
        >
          Email
        </Typography>
        <CustomTextField 
        control={control}
        name="email"
        errorMessage={errors.email?.message}
        variant="outlined" 
        fullWidth />
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Password
        </Typography>
        <CustomTextField 
          errorMessage={errors.password?.message}  
          control={control}
          name="password"
          type={showPassword?"text":"password"} 
          variant="outlined"
          fullWidth
          InputProps={{
              endAdornment:(    
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }} 
      />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Button}
        // href="/admin"
        type="submit"
      >
        Sign In
      </Button>
    </Box>
    </form>

    {subtitle}
  </>
)};

export default AuthLogin;
