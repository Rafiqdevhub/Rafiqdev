export const getEnv = (key, fallback = "") => {
  if (import.meta.env[key] === undefined && fallback === "") {
    console.warn(
      `Environment variable ${key} is not defined and no fallback provided.`
    );
  }
  return import.meta.env[key] || fallback;
};

export const validateEnv = (required = []) => {
  let valid = true;

  required.forEach((key) => {
    if (import.meta.env[key] === undefined) {
      console.error(`Required environment variable ${key} is not defined.`);
      valid = false;
    }
  });

  return valid;
};
