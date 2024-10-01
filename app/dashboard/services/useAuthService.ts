import { AuthService } from "@/gen/auth/v1/auth_connect";
import { useClient } from "../hooks/useAuthClient";
import { LoginDtoType, RegisterDtoType, User } from "../types/User";
import { jwtDecode } from "jwt-decode";

const checkCreds = async (challenge: Uint8Array) => {
  try {
    const credential = await navigator.credentials.get({
      mediation: "required",
      publicKey: {
        challenge, // Random challenge, modify as needed
        userVerification: "required", // Require user verification (biometric, PIN, etc.)
        allowCredentials: [
          {
            type: "public-key",
            id: Uint8Array.from(challenge), // The credential ID stored during registration
            transports: ["internal"], // Force internal transport (e.g., platform authenticator like fingerprint)
          },
        ],
        timeout: 60000,
      },
    });

    if (credential) {
      // Credentials exist and are ready to use, proceed to authentication
      console.log("Credentials found, authenticating...", credential);
      return credential;
      // Handle successful authentication here
    } else {
      // No credentials available or user consent is needed
      console.log("No credentials available, consider registration.");
      // Fall back to registration or show a login button
    }
  } catch (error) {
    console.error("Error checking credentials:", error);
  }
};
export const useAuthService = () => {
  const client = useClient(AuthService);

  const webAuthRegister = async (): Promise<User> => {
    const response = await client.beginRegistration({});

    const regResponse = await checkCreds(response.challenge);
    console.log(regResponse);
    if (regResponse) {
      return webAuthLoginFinish(
        regResponse as Credential & {
          response: {
            attestationObject: Uint8Array;
            clientDataJSON: Uint8Array;
            authenticatorData: Uint8Array;
            signature: Uint8Array;
          };
        }
      );
    }

    // Receive from server
    const credOptions: CredentialCreationOptions = {
      publicKey: {
        challenge: response.challenge,
        rp: {
          id: response.rpId,
          name: "Example Corp", // Replace with your relying party name
        },
        user: {
          id: new Uint8Array(16), // Random user ID, modify as needed
          name: "Yourwebsite", // Can be empty for now
          displayName: "Unknown User", // Can be empty
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform", // To use the fingerprint sensor
          userVerification: "required",
        },
        attestation: "none", // Direct attestation
      },
    };

    const credential = await navigator.credentials.create(credOptions);

    if (!credential) {
      return {} as User;
    }
    // Prepare the finish request
    return webAuthRegisterFinish(
      credential as Credential & {
        response: {
          attestationObject: ArrayBuffer;
          clientDataJSON: ArrayBuffer;
        };
      }
    );
    // Send the credential back to the server to complete registration
  };

  const webAuthRegisterFinish = async (
    credential: Credential & {
      response: { attestationObject: ArrayBuffer; clientDataJSON: ArrayBuffer };
    }
  ): Promise<User> => {
    const finishRequest = {
      credentialId: credential.id,
      attestationObject: new Uint8Array(credential.response.attestationObject),
      clientDataJson: new Uint8Array(credential.response.clientDataJSON),
    };

    const data = await client.finishRegistration(finishRequest);

    return {
      ...(jwtDecode(data.accessToken) as User),
      accessToken: data.accessToken,
    };
  };

  const webAuthLoginFinish = async (
    credential: Credential & {
      response: {
        attestationObject: Uint8Array;
        clientDataJSON: Uint8Array;
        authenticatorData: Uint8Array;
        signature: Uint8Array;
      };
    }
  ): Promise<User> => {
    const finishRequest = {
      credentialId: credential.id,
      authenticatorData: credential.response.authenticatorData,
      clientDataJson: credential.response.clientDataJSON,
      signature: credential.response.signature,
    };

    const data = await client.finishLogin(finishRequest);

    return {
      ...(jwtDecode(data.accessToken) as User),
      accessToken: data.accessToken,
    };
  };

  const login = async ({ email, password }: LoginDtoType): Promise<User> => {
    const data = await client.login({
      email,
      password,
    });
    console.log(data);
    return {
      ...(jwtDecode(data.accessToken) as User),
      accessToken: data.accessToken,
    };
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterDtoType): Promise<User> => {
    const data = await client.register({
      email,
      password,
      firstName,
      lastName,
    });
    console.log(data);
    return {
      ...(jwtDecode(data.accessToken) as User),
      accessToken: data.accessToken,
    };
  };

  return { login, register, webAuthRegister };
};
