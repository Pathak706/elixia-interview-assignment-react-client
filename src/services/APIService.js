import axios from "axios";

export class APIService {
  /**
   * *************************
   * *** CURD Apis *********
   * *************************
   */
  create(uri, payload) {
    return axios
      .post(
        `v1/${uri}`,
        { ...payload },
        {
          headers: {
            Authorization: localStorage.usertoken,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(uri, paylaod, id) {
    return axios
      .put(
        `v1/${uri}/${id}`,
        { ...paylaod },
        {
          headers: {
            Authorization: localStorage.usertoken,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAll(uri) {
    return axios
      .get(`v1/${uri}`, {
        headers: {
          Authorization: localStorage.usertoken,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOne(uri, id) {
    return axios
      .get(`v1/${uri}/${id}`, {
        headers: {
          Authorization: localStorage.usertoken,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(uri, id) {
    return axios
      .delete(`v1/${uri}/${id}`, {
        headers: {
          Authorization: localStorage.usertoken,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
