import { createContext, useContext } from "react";

const defaultValue: any = {};
const CognitoClient = createContext(defaultValue)

export const useCognito = () => {
  return useContext(CognitoClient);
};

export default CognitoClient;
