import '../../envConfig.ts';

// const getEnvironmentVariable = (environmentVariable: string): string => {
//   const unvalidatedEnvironmentVariable = process.env[environmentVariable];

//   if (!unvalidatedEnvironmentVariable) {
//     if (process.env.NODE_ENV !== 'development') {
//       // throw new Error(
//       //   `Couldn't find environment variable: ${environmentVariable}`,
//       // );
//       return '';
//     }
//     console.error(`Couldn't find environment variable: ${environmentVariable}`);
//     return '';
//   } else {
//     return unvalidatedEnvironmentVariable;
//   }
// };

export const config = {
  // ENDPOINT: getEnvironmentVariable('NEXT_PUBLIC_HOST') || 'http://localhost:4500',
  // WEBAUTHN_ENDPOINT: getEnvironmentVariable('NEXT_PUBLIC_WEBAUTHN_ENDPOINT') || 'http://localhost:4500',
  // CHAT_ENDPOINT: getEnvironmentVariable('NEXT_PUBLIC_CHAT_ENDPOINT') || 'http://localhost:4000',
  // CHAT_GRPC_ENDPOINT: getEnvironmentVariable('NEXT_PUBLIC_CHAT_GRPC_ENDPOINT') || 'http://localhost:4600',
  // IS_DEVELOPMENT: (getEnvironmentVariable('NEXT_PUBLIC_ENV') || 'development') === 'development',
  ENDPOINT: process.env.NEXT_PUBLIC_HOST || 'http://localhost:4500',
  WEBAUTHN_ENDPOINT: process.env.NEXT_PUBLIC_WEBAUTHN_ENDPOINT || 'http://localhost:4500',
  CHAT_ENDPOINT: process.env.NEXT_PUBLIC_CHAT_ENDPOINT || 'http://localhost:4000',
  CHAT_GRPC_ENDPOINT: process.env.NEXT_PUBLIC_CHAT_GRPC_ENDPOINT || 'http://localhost:4600',
  IS_DEVELOPMENT: (process.env.NEXT_PUBLIC_ENV || 'development') === 'development',
};
