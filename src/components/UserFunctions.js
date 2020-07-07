import axios from "axios";

/**
 * *************************
 * *** User Login Apis *****
 * *************************
 */
export const register = (newUser) => {
  return axios
    .post("v1/users", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("v1/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data.token);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const profile = () => {
  return axios
    .get("v1/users", {
      headers: {
        Authorization: localStorage.usertoken,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * *************************
 * *** Excel Apis **********
 * *************************
 */
