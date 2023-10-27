import { createContext, useContext } from "react";

const defaultValue: any = {};
const S3Client = createContext(defaultValue)

export const useS3 = () => {
  return useContext(S3Client);
};

export default S3Client;
