<template>
    <AddTrade @reload-items="reloadItems"></AddTrade>
    <Trades
      @delete-trade="deleteTrade"
      :trades="trades"
    ></Trades>
</template>

<script>
import Trades from "@/components/myTrades/Trades";
import AddTrade from "@/components/myTrades/AddTrade";
import { mapGetters } from "vuex";
import axios from "axios";
import { base_url } from "@/variables";

export default {
  props: {},
  components: {
    Trades,
    AddTrade,
  },
  data() {
    return {
      open: false,
      trades: null
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
    async reloadItems() {
      axios
      .get(`${base_url}/orders`)
      .then((response) => {
        if(response.status === 401) console.log('hure')
        this.trades = response.data;
        this.trades.forEach((element) => {element.price = this.abbreviateNumber(element.price);});
      })
      .catch((err) => {
        if(err.response.status === 401) {
          console.log('...');
        }
    })
    },
    deleteTrade(id) {
      if (
        confirm(`Are you sure you want to delete yout Trade with the id ${id}`)
      ) {
        axios.delete(`${base_url}/orders/${id}`);
        this.reloadItems()
      }
      console.log("delete", id);
    },
  },
  created() {
    this.reloadItems()
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getAccessToken"]),
  },
  mounted() {
    if (!this.isLoggedIn) {
      console.log("not logged in");
    }
  },
};
</script>
