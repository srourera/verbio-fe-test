import { shallowMount } from "@vue/test-utils";
import Message from "./Message.vue";
import { Msg } from "../../models/Msg.model";
import { createLocalVue } from "vue-test-utils";

const msgText: Msg = new Msg("USER", {
  type: "text",
  text: "message"
});
const msgImg: Msg = new Msg("USER", {
  type: "image",
  url: "url"
});

const textMessage: any = shallowMount(Message, {
  localVue: createLocalVue(),
  propsData: { message: msgText }
});
const imgMessage: any = shallowMount(Message, {
  localVue: createLocalVue(),
  propsData: { message: msgImg }
});

describe("Message", () => {
  describe("HTML", () => {
    it("should render text message from props", () => {
      expect(textMessage.html()).toContain("<p>" + msgText.content + "</p>");
    });
    it("should render img message from props", () => {
      expect(imgMessage.html()).toContain('<img src="' + msgImg.content + '">');
    });
  });
});
