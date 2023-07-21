<template>
  <div class="root">
    <teleport to="body">
      <Transition name="modal">
      <div v-if="this.$store.state.loginModal" class="modal">
        <div class="registerForm">
          <div class="align body">
            <div class="grid align__item bg-black rounded">
              <span @click="closeModal" class="close-icon">
                <i class="fa-regular fa-circle-xmark"></i>
              </span>
              <div v-if="!registerActive" class="login">
                <img alt="Vue logo" src="@/assets/DiabloIV.png" />
                <h2>SIGN IN</h2>

                <form action="" method="post" class="form">
                  <span style="color: red;" v-if="msg.errorLogin">{{
                    msg.errorLogin
                  }}</span>
                  <div class="form__field">
                    <input
                    name="username"
                      v-model="login.email"
                      type="email"
                      placeholder="info@mailaddress.com"
                      required
                    />
                  </div>

                  <div class="form__field">
                    <input
                    name="password"
                      v-model="login.password"
                      type="password"
                      placeholder="••••••••••••"
                      required
                    />
                  </div>

                  <div class="form__field">
                    <input type="submit" value="Login" @click="doLogin" />
                  </div>
                </form>

                <p>
                  Don't have an account?
                  <a
                    href="#"
                    @click="
                      (registerActive = !registerActive), (emptyFields = false)
                    "
                    >Sign up here</a
                  >
                </p>
              </div>
              <div v-if="registerActive" class="register">
                <img alt="Vue logo" src="@/assets/DiabloIV.png" />
                <h2>SIGN UP</h2>
                <span style="color: red;" v-if="msg.error">{{
                  msg.error
                }}</span>
                <form action="" method="post" class="form">
                  <div class="form__field">
                    <input
                      v-model="register.email"
                      :class="{ error: msg.email }"
                      type="email"
                      placeholder="info@mailaddress.com"
                    />
                    <span style="color: red;" v-if="msg.email">{{
                      msg.email
                    }}</span>
                  </div>

                  <div class="form__field">
                    <input
                      v-model="register.password"
                      :class="{ error: msg.password }"
                      type="password"
                      placeholder="Password"
                    />
                    <span style="color: red;" v-if="msg.password">{{
                      msg.password
                    }}</span>
                  </div>

                  <div class="form__field">
                    <input
                      v-model="register.confirm"
                      :class="{ error: msg.confirm }"
                      type="password"
                      class="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                    <span style="color: red;" v-if="msg.password">{{
                      msg.confirm
                    }}</span>
                  </div>

                  <div class="form__field">
                    <input
                      v-model="register.discordid"
                      :class="{ error: msg.discordid }"
                      type="text"
                      placeholder="Discord ID"
                    />
                    <span style="color: red;" v-if="msg.discordid">{{
                      msg.discordid
                    }}</span>
                  </div>

                  <div class="form__field">
                    <input type="submit" value="SIGN UP" @click="doRegister" />
                  </div>
                </form>
                <p>
                  Already have an accout?
                  <a
                    href="#"
                    @click="
                      (registerActive = !registerActive), (emptyFields = false)
                    "
                    >Sign in here</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    </teleport>
  </div>
</template>

<script>
import axios from "axios";
import { auth_url, base_url } from "@/variables";

export default {
  data() {
    return {
      accessToken: "",
      msg: [],
      toggleRegister: false,
      registerActive: false,
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        confirm: "",
        discordid: "",
        isValid: true,
      },
      emptyFields: false,
    };
  },
  name: "modal-Register",
  components: {},
  props: {
    isLoginOpen: Boolean,
    trade: Object,
    to: {
      type: String,
    },
  },
  computed: {
  },
  methods: {
    toggleReg() {
      this.toggleRegister = !this.toggleRegister;
    },
    closeModal() {
      this.$store.commit("setLoginModal", false);
    },
    validate() {
      if (
        /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.register.email)
      ) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
        console.log("email");
        this.register.isValid = false;
      }

      let difference = 8 - this.register.password.length;
      if (this.register.password.length < 8) {
        this.msg["password"] =
          "Must be 8 characters! " + difference + " characters left";
        console.log("password");
        this.register.isValid = false;
      } else {
        this.msg["password"] = "";
      }

      if (
        this.register.password == this.register.confirm &&
        this.register.confirm != ""
      ) {
        this.msg["confirm"] = "";
      } else if (this.register.confirm === "") {
        this.msg["confirm"] = `Confirm Password is empty`;
        console.log("passwordconfirm");
        this.register.isValid = false;
      } else {
        this.msg["confirm"] = `Password's are not equal`;
        console.log("passwordconfirm");
        this.register.isValid = false;
      }

      if (/^[0-9]{18}$/g.test(this.register.discordid)) {
        this.msg["discordid"] = "";
      } else {
        this.msg["discordid"] = `Discord ID must be an 18-digit number`;
        console.log("discordid");
        this.register.isValid = false;
      }
    },
    async doLogin(e) {
      e.preventDefault();
      if (this.login.email === "" || this.login.password === "") {
        this.emptyFields = true;
      } else {
        axios
          .post(`${auth_url}/login`, {
            username: this.login.email,
            password: this.login.password,
          })
          .then((res) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
            this.$store.commit("setUser", res.data.user);
            this.$store.commit("setLoginModal", false);
            this.msg["errorLogin"] = "";
          })
          .catch(() => {
            this.msg["errorLogin"] =
              "Something went wrong or email does not match password";
          });
      }
    },

    doRegister(e) {
      e.preventDefault();
      this.validate();
      if (!this.register.isValid) {
        this.emptyFields = true;
      } else {
        axios
          .post(`${base_url}/users`, {
            username: this.register.email,
            password: this.register.password,
            confirm: this.register.confirm,
            discordid: this.register.discordid,
          })
          .catch(() => {
            this.msg["error"] =
              "Something went wrong or the email address is already in use.";
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);
}
.root {
  position: relative;
}
.modal {
  display: none;
  position: fixed;
  top: 1vh;
  left: 1vw;
  width: 80vw;
  height: 80vw;
  z-index: 3;


  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: transparent;
  padding: 50px;
  border-radius: 10px;
}

$base-color: #7e8ba3;
$base-font-weight: 300;
$base-font-size: 1rem;
$base-line-height: 1.5;
$base-font-family: Helvetica Neue;
$base-font-family-fallback: sans-serif;

* {
  box-sizing: border-box;
}

.bg-black {
  background-color: #0f0f12;
}

.rounded {
  border-radius: 15px;
}
.registerForm {
  height: 98vh;
}

img {
  width: 336px;
}

.body {
  color: $base-color;
  font: $base-font-weight #{$base-font-size}/#{$base-line-height}
      $base-font-family,
    $base-font-family-fallback;
  margin: 0;
  min-height: 100%;
}

.align {
  align-items: center;
  display: flex;
  flex-direction: row;

  &__item {
    position: relative;
    &--start {
      align-self: flex-start;
    }

    &--end {
      align-self: flex-end;
    }
  }
}

.site {
  &__logo {
    margin-bottom: 2rem;
  }
}

$input-placeholder-color: #7e8ba3;

input {
  border: 0;
  font: inherit;

  &::placeholder {
    color: $input-placeholder-color;
  }
}

.form {
  &__field {
    margin-bottom: 1rem;
  }

  input {
    outline: 0;
    padding: 0.5rem 1rem;

    &[type="email"],
    &[type="password"] {
      width: 100%;
    }
  }
}

$grid-max-width: 25rem;
$grid-width: 100%;

.grid {
  margin: 0 auto;
  max-width: $grid-max-width;
  width: $grid-width;
}

h2 {
  font-size: 2.75rem;
  font-weight: 100;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

svg {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}

$link-color: #7e8ba3;

a {
  color: $link-color;
}

.register,
.login {
  border-radius: 15px;
  box-shadow: 0 0 250px #000;
  text-align: center;
  padding: 4rem 2rem;

  .error {
    border: 1px solid red;
  }

  input,
  select,
  textarea {
    color: #fff;
  }

  textarea:focus,
  input:focus {
    color: #fff;
  }

  input {
    border: 1px solid #242c37;
    border-radius: 999px;
    background-color: transparent;
    text-align: center;

    &[type="email"],
    &[type="password"] {
      background-repeat: no-repeat;
      background-size: 1.5rem;
      background-position: 1rem 50%;
    }

    &[type="email"] {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#242c37"><path d="M256.017 273.436l-205.17-170.029h410.904l-205.734 170.029zm-.034 55.462l-205.983-170.654v250.349h412v-249.94l-206.017 170.245z"/></svg>');
    }

    &[type="password"] {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#242c37"><path d="M195.334 223.333h-50v-62.666c0-61.022 49.645-110.667 110.666-110.667 61.022 0 110.667 49.645 110.667 110.667v62.666h-50v-62.666c0-33.452-27.215-60.667-60.667-60.667-33.451 0-60.666 27.215-60.666 60.667v62.666zm208.666 30v208.667h-296v-208.667h296zm-121 87.667c0-14.912-12.088-27-27-27s-27 12.088-27 27c0 7.811 3.317 14.844 8.619 19.773 4.385 4.075 6.881 9.8 6.881 15.785v22.942h23v-22.941c0-5.989 2.494-11.708 6.881-15.785 5.302-4.93 8.619-11.963 8.619-19.774z"/></svg>');
    }

    &[type="submit"] {
      background-image: linear-gradient(160deg, #8ceabb 0%, #378f7b 100%);
      color: #fff;
      margin-bottom: 2rem;
      width: 100%;
    }
  }
}
</style>
