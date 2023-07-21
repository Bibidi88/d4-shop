import axios from "axios";


const base_url = 'http://localhost:5000'
const auth_url = 'http://localhost:4000'


const refreshToken = () => {
    axios.get(`${auth_url}/refresh`, {withCredentials: true})
      .then((res) => {
        setTimeout(() => {
            refreshToken()
          }, (res.data.expires_in * 1000) - 500)
    
          this.$store.commit("setUser", res.data.user);
      })
      .catch(console.log)
  };


export { base_url, auth_url, refreshToken};
