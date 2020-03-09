<template src="./Chat.html"></template>
<style scoped src="./Chat.css"></style>
<script lang="ts">
import Message from "@/components/Message/Message.vue";
import WaitingMessage from "@/components/WaitingMessage/WaitingMessage.vue";
import api from "../../apis/Api";
import router from "../../router";
import { Component, Vue } from "vue-property-decorator";
import { Msg } from "../../models/Msg.model";

@Component({
  components: {
    Message,
    WaitingMessage
  }
})
export default class Chat extends Vue {
  protected messages: Msg[] = [];
  protected isWaiting = false;

  protected input = "";

  mounted() {
    if (!sessionStorage.sessionId) {
      this.errorHandling();
    } else {
      this.welcomeMessage();
      const input = document.getElementById("input");
      if (input) input.focus();
    }
  }

  newMessage(event: any) {
    if (this.input !== "" && (event.key === "Enter" || event.keyCode === 13)) {
      const message = this.input;
      this.sendMessage(message);
      this.input = "";
      this.newMessagesHandling("USER", [
        {
          type: "text",
          text: message
        }
      ]);
    }
  }

  sendMessage(message: string) {
    this.isWaiting = true;
    api
      .sendMessage(message)
      .then((response: any) => {
        /*
         * Wrapping this into a setTimeout to be able to see the typing animation.
         * Otherwise, the API response is too fast to see it. (Just need to move it out for real mode)
         */
        setTimeout(() => {
          this.newMessagesHandling("BOT", response.data["response"]);
          this.isWaiting = false;
        }, 1000);
      })
      .catch(() => {
        this.errorHandling();
      });
  }

  welcomeMessage() {
    api
      .getWelcomeMessage()
      .then((response: any) => {
        this.newMessagesHandling("BOT", response.data["response"]);
      })
      .catch(() => {
        this.errorHandling();
      });
  }

  newMessagesHandling(from: string, messages: any[]) {
    messages.forEach(message => {
      this.messages.push(new Msg(from, message));
    });
    setTimeout(() => {
      const messagesElement = document.getElementById("messages");
      if (messagesElement) {
        messagesElement.scrollTo({
          top: messagesElement.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 0);
  }

  errorHandling() {
    this.logout();
  }

  logout() {
    sessionStorage.removeItem("sessionId");
    router.push("/login");
  }
}
</script>
