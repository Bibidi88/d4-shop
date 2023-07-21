<template>
  <div class="root">
    <teleport to="body">
      <div v-if="isNotificationOpen" class="modal">
        <div>
          <h2>Notification</h2>
          <p>alsödjkhasökljhdölajks</p>
          <button @click="isOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>

export default {
  name: "vue-NotificationHandler",
  props: {
  },
  data() {
    return {
        isNotification: false
    }
  }
};
</script>

<style>
.root {
  position: relative;
}
.modal {
  display: none;
  position: fixed;
  top: 1vh;
  left: 1vw;
  width: 80vw;
  height: 80vw;
  z-index: 3;


  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: blueviolet;
  padding: 50px;
  border-radius: 10px;
}
</style>
