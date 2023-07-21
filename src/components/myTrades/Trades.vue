<template>
  <div class="container container-flex">
    <Trade
      @delete-trade="$emit('delete-trade', trade.tradeid)"
      @edit-trade="$emit('edit-trade', trade.tradeid)"
      :key="trade.id"
      v-for="trade in trades"
      :trade="trade"
    ></Trade>
  </div>
</template>

<script>
import Trade from "./Trade.vue";
import { mapGetters } from "vuex";

export default {
  name: "vue-Trades",
  props: {
    trades: Array,
  },
  components: {
    Trade,
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getAccessToken",
      // ...
    ]),
  },
  data() {
    return {
      userid: 2,
      responseData: null,
    };
  },
  emits: ["delete-trade", "edit-trade"],
};
</script>
