<template>
  <div
    class="base-image-input"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <span v-if="!imageData" class="placeholder">
      Choose an Image
    </span>
    <input class="file-input" ref="fileInput" type="file" @input="onSelectFile" />
  </div>
</template>

<script>
export default {
  name: "vue-BaseImageInput",
  emits: ["input"],
  data() {
    return {
      imageData: null,
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
  },
};
</script>

<style scoped>
.base-image-input {
  display: block;
  width: 192px;
  height: 288px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  margin: 5px;
}

.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}
</style>
