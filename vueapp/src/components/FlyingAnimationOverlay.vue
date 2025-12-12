<template>
  <div class="flying-overlay">
    <div
      v-for="item in activeItems"
      :key="item.id"
      class="flying-item"
      :style="getItemStyle(item)"
    >
      <PlayerAvatar :player="item.player" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useAnimationStore, FlyingItem } from "../stores/animationStore";
import PlayerAvatar from "./PlayerAvatar.vue";

const store = useAnimationStore();
const activeItems = ref<
  (FlyingItem & {
    position: { x: number; y: number };
    size: { width: number; height: number };
    opacity: number;
  })[]
>([]);

watch(
  () => store.flyingItems,
  (newItems) => {
    // Check for new items to animate
    newItems.forEach((item) => {
      if (!activeItems.value.find((i) => i.id === item.id)) {
        startAnimation(item);
      }
    });
  },
  { deep: true }
);

function startAnimation(item: FlyingItem) {
  // Initial state
  const flyingItem : any = {
    ...item,
    position: { x: item.startRect.left, y: item.startRect.top },
    size: { width: item.startRect.width, height: item.startRect.height },
    opacity: 1,
  };
  // Push to array first
  activeItems.value.push(flyingItem);
  
  // Get the reactive version from the array
  // This is crucial because modifying the plain object 'flyingItem' above won't trigger updates
  const reactiveItem = activeItems.value.find(i => i.id === item.id);

  // Calculate target
  const targetEl = document.querySelector(item.targetSelector);
  if (targetEl && reactiveItem) {
    const targetRect = targetEl.getBoundingClientRect();
    const targetX = targetRect.left + 20; // Offset slightly into the container
    // Target the bottom of the list where new items appear
    const targetY = targetRect.bottom;

    // Animate
    setTimeout(() => {
      reactiveItem.position = { x: targetX, y: targetY };
    }, 50); // Small delay to allow initial render

    // Cleanup
    setTimeout(() => {
      const index = activeItems.value.findIndex((i) => i.id === item.id);
      if (index > -1) {
        activeItems.value.splice(index, 1);
        store.removeItem(item.id);
        // Trigger completion callback (e.g., add to list)
        if (item.onComplete) {
          item.onComplete();
        }
      }
    }, 1500); // Duration matches CSS transition
  } else {
    // If target not found, just remove immediately
    store.removeItem(item.id);
  }
}

function getItemStyle(
  item: FlyingItem & {
    position: { x: number; y: number };
    size: { width: number; height: number };
    opacity: number;
  }
) {
  return {
    transform: `translate(${item.position.x}px, ${item.position.y}px)`,
    width: `${item.size.width}px`,
    height: `${item.size.height}px`,
    opacity: item.opacity,
  };
}
</script>

<style scoped>
.flying-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.flying-item {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 1.5s ease-in-out;
  will-change: transform;
  display: flex;
  align-items: center;
  padding-left: 16px; /* Match v-list-item padding usually */
  background-color: rgb(var(--v-theme-surface)); /* Use theme surface color */
  border-radius: 4px; /* Slight rounded corners */
  box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Stronger shadow */
  z-index: 10000;
}
</style>
