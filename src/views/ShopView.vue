<template>
  <div class="shop">
    <h1>This is an Shop page</h1>
  </div>
  <div class="filterMenu">
    <a
      @click="collapsed = !collapsed"
      :class="[{ active: !collapsed }, active]"
      color="#4CAF50"
    >
      Filter
    </a>
    <div class="filterMenuInputs">
      <form v-if="!collapsed" class="container-grid">
        <div class="flex-column item-itemType">
          <div style="width: 220px;">
            <label for="optionsType">Item Type</label>
          </div>
          <Dropdown
            :options="optionsType"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            name="optionsType"
            :maxItem="10"
            placeholder="Item Type"
          >
          </Dropdown>
        </div>
        <div class="flex-column item-affixes1">
          <Dropdown
            :options="optionsStats"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            name="affixOne"
            :maxItem="10"
            placeholder="Item Affixes"
          >
          </Dropdown>
          <div>
            <input
              type="number"
              class="from"
              name="levelFrom"
              id="levelFrom"
              placeholder="from"
            />
            <input
              type="number"
              class="to"
              name="levelTo"
              id="levelTo"
              placeholder="to"
            />
          </div>
        </div>

        <div class="flex-column item-affixes2">
          <Dropdown
            :options="optionsStats"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            name="affixTwo"
            :maxItem="10"
            placeholder="Item Affixes"
          >
          </Dropdown>
          <div>
            <input
              type="number"
              class="from"
              name="levelFrom"
              id="levelFrom"
              placeholder="from"
            />
            <input
              type="number"
              class="to"
              name="levelTo"
              id="levelTo"
              placeholder="to"
            />
          </div>
        </div>
        <div class="flex-column item-affixes3">
          <Dropdown
            :options="optionsStats"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            name="affixThree"
            :maxItem="10"
            placeholder="Item Affixes"
          >
          </Dropdown>
          <div>
            <input
              type="number"
              class="from"
              name="levelFrom"
              id="levelFrom"
              placeholder="from"
            />
            <input
              type="number"
              class="to"
              name="levelTo"
              id="levelTo"
              placeholder="to"
            />
          </div>
        </div>
        <div class="flex-column item-affixes4">
          <Dropdown
            :options="optionsStats"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            name="affixFour"
            :maxItem="10"
            placeholder="Item Affixes"
          >
          </Dropdown>
          <div>
            <input
              type="number"
              class="from"
              name="levelFrom"
              id="levelFrom"
              placeholder="from"
            />
            <input
              type="number"
              class="to"
              name="levelTo"
              id="levelTo"
              placeholder="to"
            />
          </div>
        </div>
        <div class="flex-column item-levelReq">
          <div>
            <div style="width: 220px;">
              <label for="LevelFrom">Level Required</label>
            </div>
            <input
              type="number"
              class="from"
              name="levelFrom"
              id="levelFrom"
              placeholder="from"
            />
            <input
              type="number"
              class="to"
              name="levelTo"
              id="levelTo"
              placeholder="to"
            />
          </div>
        </div>
        <div class="flex-column item-itemPower">
          <div>
            <div style="width: 220px;">
              <label for="itemLevelFrom">Item Power</label>
            </div>
            <input
              type="number"
              name="ItemPowerFrom"
              id="ItemPowerFrom"
              placeholder="from"
              class="from"
            />
            <input
              type="number"
              name="ItemPowerTo"
              id="ItemPowerTo"
              placeholder="to"
              class="to"
            />
          </div>
        </div>
        <input type="submit" class="item-submit" value="Reload" />
      </form>
    </div>
  </div>
  <Items></Items>
</template>

<script>
import Items from "@/components/shop/Items";
import Dropdown from "@/components/Dropdown.vue";

export default {
  props: {},
  components: {
    Items,
    Dropdown,
  },
  data() {
    return {
      active: false,
      optionsType: [
        {
          name: "Helm",
          id: "helm",
        },
        {
          name: "Chest Armor",
          id: "chestArmor",
        },
        {
          name: "Gloves",
          id: "gloves",
        },
        {
          name: "Pants",
          id: "pants",
        },
        {
          name: "Boots",
          id: "boots",
        },
        {
          name: "Amulet",
          id: "amulet",
        },
        {
          name: "Ring",
          id: "ring",
        },
        {
          name: "One-Hand Weapon",
          id: "oneHandWeapon",
        },
        {
          name: "Two-Hand Weapon",
          id: "twoHandWeapon",
        },
        {
          name: "Offhand",
          id: "offhand",
        },
        {
          name: "Shield",
          id: "shield",
        },
      ],
      optionsStats: [],
      collapsed: true,
    };
  },
  created() {},
  methods: {
    validateSelection(selection) {
      this.selected = selection;
      console.log(selection.name + " has been selected");
    },

    getDropdownValues(keyword) {
      console.log(
        "You could refresh options by querying the API with " + keyword
      );
    },
  },
};
</script>
