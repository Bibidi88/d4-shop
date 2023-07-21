<template>
  <div class="addMenu">
    <a
      @click="collapsed = !collapsed"
      :class="[{ active: collapsed }, active]"
    >
     Add Trade
  </a>

  <div class="addMenuInputs">
    <form
      @submit="onSubmit"
      v-if="collapsed"
      enctype="multipart/form-data"
      class="container-grid"
    >
      <base-image-input class="item-image" @input="setImage" />
      <div class="item-Form">
        <input type="text" v-model="type" name="type" placeholder="Add Type" />
      <div class="form-control">
        <input
          type="text"
          v-model="itemPower"
          name="itemPower"
          placeholder="Add Item Power"
        />
        <input
          type="text"
          v-model="classReq"
          name="classReq"
          placeholder="Add classReq"
        />
      </div>
      <div class="form-control">
        <input
          type="text"
          v-model="sockets"
          name="sockets"
          placeholder="Add sockets"
        />
        <input
          type="text"
          v-model="levelReq"
          name="levelReq"
          placeholder="Add levelReq"
        />
      </div>
      <div class="form-control-stats">
        <input
          type="text"
          v-model="attribute1.name"
          name="attribute1Name"
          placeholder="Add Stat"
        />
        <input
          type="text"
          v-model="attribute1.value"
          name="attribute1Value"
          placeholder="value"
        />
      </div>
      <div class="form-control-stats">
        <input
          type="text"
          v-model="attribute2.name"
          name="attribute2Name"
          placeholder="Add Stat"
        />
        <input
          type="text"
          v-model="attribute2.value"
          name="attribute2Value"
          placeholder="value"
        />
      </div>
      <div class="form-control-stats">
        <input
          type="text"
          v-model="attribute3.name"
          name="attribute3Name"
          placeholder="Add Stat"
        />
        <input
          type="text"
          v-model="attribute3.value"
          name="attribute3Value"
          placeholder="value"
        />
      </div>
      <div class="form-control-stats">
        <input
          type="text"
          v-model="attribute4.name"
          name="attribute4Name"
          placeholder="Add Stat"
        />
        <input
          type="text"
          v-model="attribute4.value"
          name="attribute4Value"
          placeholder="value"
        />
      </div>
      <input type="text" v-model="price" name="price" placeholder="Add price" />
      <input :onClick="onSubmit" type="submit" value="Add new Trade" />
      </div>
      
    </form>
  </div>
  </div>
</template>

<script>
import BaseImageInput from "@/components/BaseImageInput.vue";
import axios from "axios";
import { base_url } from "@/variables";
import { mapGetters } from "vuex";

export default {
  name: "vue-AddTrade",
  components: {
    BaseImageInput,
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
      active: false,
      msg: [],
      id: 1,
      images: null,
      attribute1: {
        name: "",
        value: "",
      },
      attribute2: {
        name: "",
        value: "",
      },
      attribute3: {
        name: "",
        value: "",
      },
      attribute4: {
        name: "",
        value: "",
      },
      levelReq: "",
      classReq: "",
      itemPower: "",
      sockets: "",
      type: "",
      price: "",
      collapsed: false,
    };
  },
  emits: ["reload-items"],
  methods: {

    setImage(e) {
      this.images = e
    },
    onSubmit(e) {
      e.preventDefault();

      let formData = new FormData();
      formData.append("file", this.images);

      var allFilled = true;
      var attributes = [];

      if (this.attribute1.name && this.attribute1.value) {
        const attr = {
          name: this.attribute1.name,
          value: this.attribute1.value,
        };
        formData.append('attrOne', this.attribute1.name)
        formData.append('attrOneValue', this.attribute1.value)

        attributes.push(attr);
      }

      if (this.attribute2.name && this.attribute2.value) {
        const attr = {
          name: this.attribute2.name,
          value: this.attribute2.value,
        };
        formData.append('attrTwo', this.attribute2.name)
        formData.append('attrTwoValue', this.attribute2.value)

        attributes.push(attr);
      }

      if (this.attribute3.name && this.attribute3.value) {
        const attr = {
          name: this.attribute3.name,
          value: this.attribute3.value,
        };
        formData.append('attrThree', this.attribute3.name)
        formData.append('attrThreeValue', this.attribute3.value)

        attributes.push(attr);
      }

      if (this.attribute4.name && this.attribute4.value) {
        const attr = {
          name: this.attribute4.name,
          value: this.attribute4.value,
        };
        formData.append('attrFour', this.attribute4.name)
        formData.append('attrFourValue', this.attribute4.value)

        attributes.push(attr);
      }

      if (attributes.length === 0) allFilled = false;
      if (this.type === "") allFilled = false;
      else formData.append('type', this.type)
      if (this.price === "") allFilled = false;
      else formData.append('price', this.price)
      if (this.levelReq === "") allFilled = false;
      else formData.append('levelReq', this.levelReq)
      if (this.itemPower === "") allFilled = false;
      else formData.append('itemPower', this.itemPower)
      if (this.classReq === "") allFilled = false;
      else formData.append('classReq', this.classReq)
      formData.append('sockets', this.sockets)


      if (allFilled) {
        axios
          .post(`${base_url}/orders`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            (this.imageData = null),
              (this.attribute1 = {
                name: "",
                value: "",
              }),
              (this.attribute2 = {
                name: "",
                value: "",
              }),
              (this.attribute3 = {
                name: "",
                value: "",
              }),
              (this.attribute4 = {
                name: "",
                value: "",
              }),
              (this.levelReq = "");
            this.classReq = "";
            this.itemPower = "";
            this.sockets = "";
            this.type = "";
            this.price = "";

            this.collapsed = false;
            this.$emit("reload-items");
          })
          .catch((error) => {
            if (error.response.status == 403) this.$store.commit("setLoginModal", false);
          });
      }
    },
  },
};
</script>
