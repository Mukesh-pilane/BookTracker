import React, { useState } from 'react'

// form
import { useForm } from "react-hook-form";

// validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


// icons
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Login.module.scss"
import { emailRegex } from '../../utility/regex';
import Input from '../../components/shared/Input/Input'
import Buttons from '../../components/shared/Buttons/Buttons';
import useAuthStore from '../../store/authStore';


const schema = yup.object().shape({
  email: yup.string().email().required().matches(
    emailRegex,
    'Invalid email format'
  ),
  password: yup.string().min(1).max(32).required(),
});

const Login = () => {
  
  const { user, login, loading, error } = useAuthStore();
  const [show, setShow] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleLogin = async(data) => {
    await login(data)
    reset();
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.left}>
      </div>
      <div className={styles.right}>
        <div className={styles.formContainer}>
          <h1>Create an Account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Input
              onboard={true}
              name="email"
              placeholder="Email"
              register={register}
              errors={errors}
              icon={<MdOutlineEmail />}
              type="text"
            />
            <div className={styles?.passwordWrapper}>
              <Input
                onboard={true}
                name="password"
                placeholder="Password"
                register={register}
                errors={errors}
                icon={<RiLockPasswordFill />}
                type={
                  show ? "text" : "password"
                }
              />
              <span onClick={() => setShow(!show)} className={styles?.eye}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <Buttons content={isSubmitting ? "Logging in..." : "Login"} />
          </form>
          <span>Don't have account? </span>
        </div>
      </div>
    </div>
  )
}

export default Login