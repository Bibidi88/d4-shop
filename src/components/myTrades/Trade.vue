<template>
  <div class="item">
    <div class="center">
      <h2>Trade ID: <br />{{ trade.tradeid }}</h2>
    </div>
    <div class="img center">
      <img :src="trade.imgURL" alt="" />
    </div>

    <div class="center" style="">
      <h3>
        {{ trade.price }}<br />
        Gold
      </h3>
    </div>
    <div class="center">
      <ButtonVue
        @button-click="$emit('delete-trade', trade.tradeid)"
        text="Delete"
        color="crimson"
        icon="fa-solid fa-trash"
      ></ButtonVue>
    </div>
  </div>
</template>

<script>
import { base_url } from "@/variables";
import ButtonVue from "../Button.vue";

export default {
  data() {
    return {
      base_url: base_url,
    };
  },
  name: "vue-Trade",
  components: {
    ButtonVue,
  },
  props: {
    trade: Object,
  },
  emits: ["delete-trade", "edit-trade"],
};
</script>
