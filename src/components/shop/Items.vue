<template>
  <div class="container container-flex">
    <Item :key="item.id" v-for="item in responseData" :item="item"></Item>
  </div>
</template>

<script>
import Item from "./Item.vue";
import axios from "axios";
import { base_url } from "@/variables";

export default {
  name: "vue-Items",
  props: {
    items: Array,
  },
  components: {
    Item,
  },
  data() {
    return {
      responseData: null,
    };
  },
  methods: {
    abbreviateNumber(number) {
      var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
      // what tier? (determines SI symbol)
      var tier = (Math.log10(Math.abs(number)) / 3) | 0;

      // if zero, we don't need a suffix
      if (tier == 0) return number;

      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier];
      var scale = Math.pow(10, tier * 3);

      // scale the number
      var scaled = number / scale;

      // format number and add suffix
      return scaled.toFixed(1) + suffix;
    },
  },
  created() {
    axios
      .get(`${base_url}/trades`)
      .then((res) => {
        this.responseData = res.data;
        this.responseData.forEach((element) => {element.price = this.abbreviateNumber(element.price);});
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error("There was an error!", error);
      });
  },
};
</script>
