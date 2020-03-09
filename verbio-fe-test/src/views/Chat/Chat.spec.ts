import Chat from "@/views/Chat/Chat.vue";
import { createLocalVue } from "vue-test-utils";
import router from "../../router";
import { shallowMount } from "@vue/test-utils";
import api from "../../apis/Api";

const chat: any = shallowMount(Chat, {
  localVue: createLocalVue(),
  propsData: {}
});

const fakeMessage = "message";
const fakePromise = new Promise<any>(() => {});
const enterEvent = {
  key: "Enter",
  keyCode: 13
};
describe("Chat", () => {
  describe("HTML", () => {
    it("should show logout button", () => {
      expect(chat.html()).toContain('<div class="logout">Logout</div>');
    });

    it("should show the messages container", () => {
      expect(chat.html()).toContain('<div id="messages" class="messages">');
    });

    it("should show input", () => {
      expect(chat.html()).toContain('<input id="input" type="text">');
    });
  });

  describe("Methods", () => {
    describe("mounted()", () => {
      it("should redirect to login if not logged in", () => {
        //given
        sessionStorage.removeItem("sessionId");
        spyOn(router, "push");
        //when
        shallowMount(Chat, {});
        //expect
        expect(router.push).toHaveBeenCalledWith("/login");
      });
      it("should show welcomeMessage and not redirect to login if logged in", () => {
        //given
        sessionStorage.sessionId = "sessionId";
        spyOn(router, "push");
        //when
        shallowMount(Chat, {});
        //expect
        expect(router.push).not.toHaveBeenCalledWith("/login");
      });
    });
    describe("newMessage()", () => {
      it("should send message and add user message, when user press enter", () => {
        //given
        chat.vm.input = fakeMessage;
        spyOn(chat.vm, "sendMessage");
        spyOn(chat.vm, "newMessagesHandling");
        //when
        chat.vm.newMessage(enterEvent);
        //expect
        expect(chat.vm.sendMessage).toHaveBeenCalledWith(fakeMessage);
        expect(chat.vm.newMessagesHandling).toHaveBeenCalled();
      });
      it("should not send message nor add user message, when user press enter if input is empty", () => {
        //given
        chat.vm.input = "";
        spyOn(chat.vm, "sendMessage");
        spyOn(chat.vm, "newMessagesHandling");
        //when
        chat.vm.newMessage(enterEvent);
        //expect
        expect(chat.vm.sendMessage).not.toHaveBeenCalled();
        expect(chat.vm.newMessagesHandling).not.toHaveBeenCalled();
      });
    });
    describe("sendMessage()", () => {
      it("should put waiting to true", () => {
        //given
        chat.vm.isWaiting = false;
        spyOn(api, "sendMessage").and.returnValue(fakePromise);
        //when
        chat.vm.sendMessage(fakeMessage);
        //expect
        expect(chat.vm.isWaiting).toBeTruthy();
      });
      it("should call sendMessage API", () => {
        //given
        spyOn(api, "sendMessage").and.returnValue(fakePromise);
        //when
        chat.vm.sendMessage(fakeMessage);
        //expect
        expect(api.sendMessage).toHaveBeenCalledWith(fakeMessage);
      });
      it("should call newMessagesHandling and put isWaiting to false when success", () => {
        //given
        chat.vm.isWaiting = false;
        spyOn(api, "sendMessage").and.returnValue(fakePromise);
        spyOn(chat.vm, "newMessagesHandling");
        //when
        chat.vm.sendMessage(fakeMessage);
        //expect
        setTimeout(() => {
          expect(chat.vm.isWaiting).toBeFalsy();
          expect(chat.vm.newMessagesHandling).toHaveBeenCalled();
        }, 1500);
      });
    });
    describe("welcomeMessage()", () => {
      it("should call getWelcomeMessage API", () => {
        //given
        spyOn(api, "getWelcomeMessage").and.returnValue(fakePromise);
        //when
        chat.vm.welcomeMessage();
        //expect
        expect(api.getWelcomeMessage).toHaveBeenCalled();
      });
      it("should call newMessagesHandling", () => {
        //given
        spyOn(api, "getWelcomeMessage").and.returnValue(fakePromise);
        spyOn(chat.vm, "newMessagesHandling").and.returnValue(fakePromise);
        //when
        chat.vm.welcomeMessage();
        //expect
        setTimeout(() => {
          expect(chat.vm.newMessagesHandling).toHaveBeenCalled();
        }, 500);
      });
    });
    describe("newMessagesHandling()", () => {
      it("should add the messages to messages array", () => {
        //given
        chat.vm.messages = [];
        //when
        chat.vm.newMessagesHandling("USER", [
          {
            type: "text",
            text: fakeMessage
          }
        ]);
        //expect
        expect(chat.vm.messages).toHaveLength(1);
      });
    });
    describe("errorHandling()", () => {
      it("should call logout", () => {
        //given
        spyOn(chat.vm, "logout");
        //when
        chat.vm.errorHandling();
        //expect
        expect(chat.vm.logout).toHaveBeenCalled();
      });
    });
    describe("logout()", () => {
      it("should remove storage and redirect", () => {
        //given
        sessionStorage.sessionId = "sessionId";
        spyOn(router, "push");
        //when
        chat.vm.logout();
        //expect
        expect(sessionStorage.sessionId).toBeUndefined();
        expect(router.push).toHaveBeenCalledWith("/login");
      });
    });
  });
});
