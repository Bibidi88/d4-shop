<template>
  <div class="item">
    <div class="center">
      <h2>Trade ID: <br />{{ item.tradeid }}</h2>
    </div>

    <div class="img center">
      <img :src="item.imgURL" alt="" />
    </div>

    <div class="center" style="">
      <h3>{{ item.price }} <br> Gold</h3>
    </div>
    <div class="center">
      <ButtonVue
        @click="copy"
        color="#3498DB"
        text="Contact User"
        icon="fa-brands fa-discord"
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
  name: "vue-Item",
  props: {
    item: Object,
  },
  components: {
    ButtonVue,
  },
  methods: {
    async copy() {
      const url = `https://discord.com/users/${this.item.discordid}`;
      console.log(url)
      try {
        await navigator.clipboard.writeText(this.text + " " + this.item.id);
        alert(
          "Copied: " +
            `I am interested in your traidoffer with the id ${this.item.id}`
        );
        window.open(url, "_blank");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
  },
};
</script>
