<template>
  <div class="container login-page">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <card class="card-login card-white">
        <template slot="header">
          <img src="img//card-primary.png" alt="" />
          <h1 class="card-title">Log In</h1>
        </template>

        <div>
          <base-input
            name="email"
            v-model="user.email"
            placeholder="Email"
            addon-left-icon="tim-icons icon-email-85"
          >
          </base-input>

          <base-input
            name="password"
            v-model="user.password"
            type="password"
            placeholder="Password"
            addon-left-icon="tim-icons icon-lock-circle"
          >
          </base-input>
        </div>

        <div slot="footer">
          <base-button
            native-type="submit"
            type="primary"
            class="mb-3"
            size="lg"
            @click="onLogin()"
            block
          >
            Login
          </base-button>
          <div class="pull-left">
            <h6>
              <nuxt-link class="link footer-link" to="/register">
                Create Account
              </nuxt-link>
            </h6>
          </div>

          <div class="pull-right"></div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  middleware: "notAuthenticated",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onLogin() {
      this.$axios
        .post("/login", this.user)
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            this.$notify({
              type: "success",
              icon: "tim-icons icon-check-2",
              message: "Success! Welcome " + res.data.userData.name,
            });

            const auth = {
              token: res.data.token,
              userData: res.data.userData,
            };

            //token to Store
            this.$store.commit("setAuth", auth);

            //set auth object in localstorage
            localStorage.setItem("auth", JSON.stringify(auth));
            if (auth.userData.rol == "ADMIN") {
              $nuxt.$router.push("/admin/");
              return;
            }
            $nuxt.$router.push("/");
            return;
          }
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.message == 'Please verify your email') {
            this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: "First, verify your email",
          });
          return;
          }
          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Email or password incorrect",
          });
          return;
        });
    },
  },
};
</script>

<style>
</style>