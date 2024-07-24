import { base64 } from "multiformats/bases/base64";

export const calculateBirthDate = (age: number) => {
  const currentDate = new Date();
  const birthYear = currentDate.getFullYear() - age;
  const birthDate = new Date(
    birthYear,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  return birthDate.toISOString().split("T")[0];
};

export const createBase64JsonString = (params: {
  [key: string]: any;
}): string => {
  const jsonString = JSON.stringify(params);
  const uint8Array = new TextEncoder().encode(jsonString); // Convert to Uint8Array
  return base64.encode(String.fromCharCode.apply(null, Array.from(uint8Array)));
};
