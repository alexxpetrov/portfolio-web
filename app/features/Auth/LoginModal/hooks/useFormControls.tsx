import type {
  ChangeEventHandler,
  FormEventHandler,
} from 'react'
import type { LoginDtoType, RegisterDtoType, User } from 'types/user'
import { notification } from 'antd'
import { useUserContext } from 'hooks/useUserContext'
import {
  useCallback,
  useState,
} from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { AuthType, SignUpType } from '../types'

interface FormData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export function useFormControls() {
  const { login, register, handleWebAuthRegister } = useUserContext()

  const [authType, setAuthType] = useState<AuthType>(AuthType.biometry)
  const [formState, setFormState] = useState<SignUpType>(SignUpType.login)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    },
    [],
  )

  const handleBiometricAuth = useCallback(async () => {
    try {
      const response = await handleWebAuthRegister()
      const name = [response?.firstName, response?.lastName]
        .filter(Boolean)
        .join(' ')

      notification.success({
        description: 'Success',
        message: name ? `Welcome ${name}!` : 'Welcome!',
        icon: <FiCheckCircle />,
        type: 'success',
      })
    }
    catch {
      notification.error({
        description: `Error during biometric authentication`,
        message: 'Authentication failed',
      })
    }
  }, [handleWebAuthRegister])

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault()

      try {
        let response: User | null = null

        if (formState === 'login') {
          const authDto: LoginDtoType = {
            email: formData.email,
            password: formData.password,
          }
          response = await login(authDto)
        }
        else if (formState === 'register') {
          const authDto: RegisterDtoType = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }
          response = await register(authDto)
        }

        if (response) {
          const name = [response.firstName, response.lastName]
            .filter(Boolean)
            .join(' ')
          notification.success({
            description: 'Success',
            message: `Welcome ${name}!`,
            icon: <FiCheckCircle />,
            type: 'success',
          })
        }
      }
      catch {
        notification.error({
          description: 'Authentication failed',
          message: 'Please check your credentials and try again',
        })
      }
    },
    [formState, formData, login, register],
  )

  return {
    handleInputChange,
    handleBiometricAuth,
    handleSubmit,
    setFormState,
    authType,
    setAuthType,
    formState,
    formData,
  }
}
