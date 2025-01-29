import {
    Anchor,
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from './Register.module.css';
import { Link } from 'react-router-dom';
  
  const Register = () => {
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Create an Account
          </Title>
  
          <TextInput label="Full Name" placeholder="John Doe" size="md" />
          <TextInput label="Email address" placeholder="hello@example.com" mt="md" size="md" />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
          <PasswordInput label="Confirm Password" placeholder="Confirm your password" mt="md" size="md" />
          
          <Checkbox label="I agree to the terms and conditions" mt="xl" size="md" />
          
          <Button fullWidth mt="xl" size="md">
            Register
          </Button>
  
          <Text ta="center" mt="md">
            Already have an account?{' '}
            <Anchor component={Link} to="/login" fw={700}>
              Login
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }
  
  export default Register;
  