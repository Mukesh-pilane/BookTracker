import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import classes from './Login.module.scss';
import { Link } from 'react-router-dom';
import { loginUser } from '../../store/server/services/authService';
import { useAuthStore } from '../../store/client/authStore';
import { persistToken, setUserData } from '../../utility';
import { toast } from 'react-toastify';

const Login = () => {
  const { setAuth } = useAuthStore((state) => state);
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(5, { message: 'Password must have at least 6 characters' }),
    termsOfService: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms of service',
    }),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: "",
      termsOfService: false,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      persistToken(data.data.authToken)
      setUserData({ email: values.email })
      setAuth({ isAuthenticated: true, email: values.email });
    } catch (error) {
      toast.error(error.response.data.message || "Invalid Credentials")
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper component='form' onSubmit={form.onSubmit(handleSubmit)} className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to BookTracker!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          {...form.getInputProps('email')}
          size="md"
        />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"
          {...form.getInputProps('password')}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" {...form.getInputProps('termsOfService', { type: 'checkbox' })} />
          <Anchor size="sm" component={Link} to="/forgotpassword">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" size="md" type="submit" loading={form.submitting} loaderProps={{ type: 'dots' }}>
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor component={Link} to="/register" fw={700}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Login
