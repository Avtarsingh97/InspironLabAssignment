import AxiosInstances from "./index";

// Function to sign in a user
const signin = (data) => {
  return AxiosInstances.post("/auth/signin", data);
};

// Function to sign up a new user
const signup = (data) => {
  return AxiosInstances.post("/auth/signup", data);
};

export default { signin, signup };
