<template src="./Message.html"></template>
<style scoped src="./Message.css"></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Msg } from "../../models/Msg.model";

@Component
export default class Message extends Vue {
  @Prop() private message!: Msg;
}
</script>