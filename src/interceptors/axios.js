
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.withCredentials= false

/*var refresh = true;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

    axios.get(`${base_url}/refresh`).then((res) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        this.$store.commit("setUser", res.data.user);
        this.$store.commit("setLoginModal", false);
      }
      );


    }
    refresh = false;
    return error;
  }
); */
