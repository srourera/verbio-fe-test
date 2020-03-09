<template src="./Login.html"></template>
<style scoped src="./Login.css"></style>
<script lang="ts">
import api from "../../apis/Api";
import router from "../../router";
import { Component, Vue } from "vue-property-decorator";
import { LoginForm, LoginErrors } from "../../models/Login.model";
import { BootstrapVue } from "bootstrap-vue";

Vue.use(BootstrapVue);

@Component
export default class Login extends Vue {
  protected form: LoginForm = {
    username: "",
    password: ""
  };
  protected error: LoginErrors = {
    credentials: false,
    username: {
      required: false
    },
    password: {
      required: false
    }
  };

  mounted() {
    if (sessionStorage.sessionId) {
      router.push("/");
    }
  }

  onSubmit(evt: any) {
    evt.preventDefault();
    if (this.isValid()) {
      api
        .login(this.form.username, this.form.password)
        .then((response: any) => {
          sessionStorage.sessionId = response.data["session_id"];
          router.push("/");
        })
        .catch(() => {
          this.error.credentials = true;
        });
    }
  }

  isValid() {
    let error = false;
    if (this.form.username.length === 0) {
      error = true;
      this.error.username.required = true;
    }
    if (this.form.password.length === 0) {
      error = true;
      this.error.password.required = true;
    }
    return !error;
  }

  resetErrors() {
    this.error.credentials = false;
    this.error.username.required = false;
    this.error.password.required = false;
    return;
  }
}
</script>
