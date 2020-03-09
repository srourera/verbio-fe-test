import Login from "@/views/Login/Login.vue";
import { createLocalVue } from "vue-test-utils";
import router from "../../router";
import { shallowMount } from "@vue/test-utils";
import api from "../../apis/Api";

const login: any = shallowMount(Login, {
  localVue: createLocalVue(),
  propsData: {}
});

const fakePromise = new Promise<any>(() => {});
const evt = { preventDefault: () => {} };
const username = "username";
const password = "password";

describe("Login", () => {
  describe("HTML", () => {
    it("should not show logout button", () => {
      expect(login.html()).not.toContain('<div class="logout">Logout</div>');
    });
    it("should show login card", () => {
      expect(login.html()).toContain('class="login-card mt-3"');
    });
  });
  describe("Methods", () => {
    describe("mounted()", () => {
      it("should not redirect to chat if not logged in", () => {
        //given
        sessionStorage.removeItem("sessionId");
        spyOn(router, "push");
        //when
        shallowMount(Login, {});
        //expect
        expect(router.push).not.toHaveBeenCalledWith("/");
      });
      it("should redirect to chat if logged in", () => {
        //given
        sessionStorage.sessionId = "sessionId";
        spyOn(router, "push");
        //when
        shallowMount(Login, {});
        //expect
        expect(router.push).toHaveBeenCalledWith("/");
      });
    });
    describe("onSubmit()", () => {
      it("should preventDefault the event", () => {
        //given
        spyOn(evt, "preventDefault");
        //when
        login.vm.onSubmit(evt);
        //expect
        expect(evt.preventDefault).toHaveBeenCalled();
      });
      it("should call login API if the form isValid", () => {
        //given
        login.vm.form.username = username;
        login.vm.form.password = password;
        spyOn(login.vm, "isValid").and.returnValue(true);
        spyOn(api, "login").and.returnValue(fakePromise);
        //when
        login.vm.onSubmit(evt);
        //expect
        expect(api.login).toHaveBeenCalledWith(username, password);
      });
      it("should not call login API if the form is not Valid", () => {
        //given
        login.vm.form.username = username;
        login.vm.form.password = password;
        spyOn(login.vm, "isValid").and.returnValue(false);
        spyOn(api, "login").and.returnValue(fakePromise);
        //when
        login.vm.onSubmit(evt);
        //expect
        expect(api.login).not.toHaveBeenCalledWith(username, password);
      });
      it("should redirect to chat when success", () => {
        //given
        login.vm.form.username = username;
        login.vm.form.password = password;
        spyOn(login.vm, "isValid").and.returnValue(true);
        spyOn(api, "login").and.returnValue(fakePromise);
        spyOn(router, "push");
        //when
        login.vm.onSubmit(evt);
        //expect
        setTimeout(() => {
          expect(router.push).toHaveBeenCalledWith("/");
        }, 500);
      });
    });
    describe("isValid()", () => {
      it("should return true if both username and password are not empty", () => {
        //given
        login.vm.form.username = username;
        login.vm.form.password = password;
        //when
        const result = login.vm.isValid();
        //expect
        expect(result).toBeTruthy();
      });
      it("should return false and set errors if username is empty", () => {
        //given
        login.vm.form.username = "";
        login.vm.form.password = password;
        //when
        const result = login.vm.isValid();
        //expect
        expect(result).toBeFalsy();
        expect(login.vm.error.username.required).toBeTruthy();
      });
      it("should return false and set errors if password is empty", () => {
        //given
        login.vm.form.username = username;
        login.vm.form.password = "";
        //when
        const result = login.vm.isValid();
        //expect
        expect(result).toBeFalsy();
        expect(login.vm.error.password.required).toBeTruthy();
      });
    });
    describe("resetErrors()", () => {
      it("should reset all errors", () => {
        //given
        login.vm.error.credentials = true;
        login.vm.error.username.required = true;
        login.vm.error.password.required = true;
        //when
        login.vm.resetErrors();
        //expect
        expect(login.vm.error.credentials).toBeFalsy();
        expect(login.vm.error.username.required).toBeFalsy();
        expect(login.vm.error.password.required).toBeFalsy();
      });
    });
  });
});
