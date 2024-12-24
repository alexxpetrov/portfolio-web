import { Tooltip } from '@components/Tooltip/Tooltip';
import { useFormControls } from './hooks/useFormControls';
import { AuthType, SignUpType } from './types';

export function LoginModal() {
  const {
    handleInputChange,
    handleBiometricAuth,
    handleSubmit,
    setFormState,
    formState,
    authType,
    setAuthType,
    formData,
  } = useFormControls();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-95">
      <div className="w-full max-w-md rounded-md bg-slate-800 p-6 text-slate-200">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-xl font-bold text-teal-300 ">
            {formState === SignUpType.login ? 'Log In' : 'Sign Up'}
          </h2>
          <Tooltip
            title={(
              <span className="text-slate-400">
                Authentication is managed by a dedicated Auth microservice,
                utilizing JWT auth strategy, with gRPC API for
                registration/login and token refresh. It supports both
                email/password login and biometric WebAuthn, with data securely
                stored in a standalone PostgreSQL database.
                <a
                  className="font-medium text-white hover:text-teal-300 focus-visible:text-teal-300"
                  rel="noreferrer noopener"
                  href="https://github.com/alexxpetrov/identia-be"
                  target="_blank"
                >
                  {' '}
                  GitHub
                </a>
              </span>
            )}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authType === AuthType.default
            ? (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-teal-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md bg-slate-700 p-2 text-slate-200 outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1 block text-sm font-medium text-teal-300"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-md bg-slate-700 p-2 text-slate-200 outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  {formState === 'register' && (
                    <>
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-1 block text-sm font-medium text-teal-300"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-md bg-slate-700 p-2 text-slate-200 outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-1 block text-sm font-medium text-teal-300"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-md bg-slate-700 p-2 text-slate-200 outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setFormState(
                          formState === SignUpType.login
                            ? SignUpType.register
                            : SignUpType.login,
                        )}
                      className="text-teal-300 hover:underline"
                    >
                      {formState === 'login'
                        ? 'Create an account'
                        : 'Already a member?'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthType(AuthType.biometry)}
                      className="flex w-full items-center justify-center space-x-2 rounded-md bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-800"
                    >
                      I want to see the future
                    </button>
                  </div>
                </>
              )
            : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleBiometricAuth}
                    className="w-full rounded-md bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500"
                  >
                    <span>Click me</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthType(AuthType.default)}
                    className="flex w-full items-center justify-center space-x-2 rounded-md bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-800"
                  >
                    Back to old school
                  </button>
                </div>
              )}
        </form>
      </div>
    </div>
  );
}
