import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 180
export const SIDEBAR_WIDTH_COLLAPSED = 38
export const SIDEBAR_PADDING = 5
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)

export const sidebarWidthPadding = computed(
    () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED + SIDEBAR_PADDING: SIDEBAR_WIDTH + SIDEBAR_PADDING}px`
)