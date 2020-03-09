import { shallowMount } from "@vue/test-utils";
import { createLocalVue } from "vue-test-utils";
import WaitingMessage from "./WaitingMessage.vue";

const waitingMessage: any = shallowMount(WaitingMessage, {
  localVue: createLocalVue(),
  propsData: {}
});

describe("WaitingMessage", () => {
  describe("HTML", () => {
    it("should renders points", () => {
      expect(waitingMessage.html()).toContain("<p>·");
    });
  });
  describe("Methods", () => {
    describe("mounted()", () => {
      it("start interval", () => {
        //given
        waitingMessage.vm.points = "·";
        //when
        //expect
        setTimeout(() => {
          expect(waitingMessage.vm.points).toBe("··");
        }, 450);
      });
    });
  });
});
