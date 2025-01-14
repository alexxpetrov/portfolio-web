import type {
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import type { LoginDtoType, RegisterDtoType, User } from 'types/user';
import { useUserContext } from 'hooks/useUserContext';
import {
  useState,
} from 'react';
import { AuthType, SignUpType } from '../types';

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export function useFormControls() {
  const { login, register, handleWebAuthRegister } = useUserContext();

  const [authType, setAuthType] = useState<AuthType>(AuthType.biometry);
  const [formState, setFormState] = useState<SignUpType>(SignUpType.login);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBiometricAuth = async () => {
    try {
      await handleWebAuthRegister();
      // const name = [response?.firstName, response?.lastName]
      //   .filter(Boolean)
      //   .join(' ');

      // notification.success({
      //   description: 'Success',
      //   message: name ? `Welcome ${name}!` : 'Welcome!',
      //   icon: <FiCheckCircle />,
      //   type: 'success',
      // });
    } catch {
      // notification.error({
      //   description: `Error during biometric authentication`,
      //   message: 'Authentication failed',
      // });
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement>
    = async (e) => {
      e.preventDefault();

      try {
        let response: User | null = null;

        if (formState === 'login') {
          const authDto: LoginDtoType = {
            email: formData.email,
            password: formData.password,
          };
          response = await login(authDto);
        } else if (formState === 'register') {
          const authDto: RegisterDtoType = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          };
          response = await register(authDto);
        }

        if (response) {
          // const name = [response.firstName, response.lastName]
          //   .filter(Boolean)
          //   .join(' ');
          // notification.success({
          //   description: 'Success',
          //   message: `Welcome ${name}!`,
          //   icon: <FiCheckCircle />,
          //   type: 'success',
          // });
        }
      } catch {
        // notification.error({
        //   description: 'Authentication failed',
        //   message: 'Please check your credentials and try again',
        // });
      }
    };

  return {
    handleInputChange,
    handleBiometricAuth,
    handleSubmit,
    setFormState,
    authType,
    setAuthType,
    formState,
    formData,
  };
}
