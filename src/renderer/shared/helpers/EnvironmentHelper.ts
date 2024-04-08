const isDevelopment = () => {
  return process.env.NODE_ENV === "development";
};

const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

export const EnvironmentHelper = {
  isDevelopment,
  isProduction,
};
