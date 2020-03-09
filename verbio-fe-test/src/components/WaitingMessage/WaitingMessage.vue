<template src="./WaitingMessage.html"></template>
<style scoped src="../Message/Message.css"></style>
<style scoped src="./WaitingMessage.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class WaitingMessage extends Vue {
  protected points = "·";

  mounted() {
    setInterval(() => {
      if (this.points === "···") this.points = "·";
      else this.points += "·";
    }, 400);
  }
}
</script>