<template>
<button class="btn" @click="$emit('button-click')" :style="{background: color}"><i v-if="icon" :class="icon"></i> {{text}}</button>
</template>

<script>
export default {
    name: 'vue-button',
    props: {
        text: {
            type: String,
            default: "Button"
        },
        color: {
            type: String,
            default: 'gray',
        },
        icon: {
            type: String
        }
    },
    emit: ['button-click']
}
</script>