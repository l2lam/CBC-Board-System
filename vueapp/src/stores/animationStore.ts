import { defineStore } from "pinia";
import { Player } from "../models/player";

export interface FlyingItem {
    id: number;
    player: Player;
    startRect: DOMRect;
    targetSelector: string;
    onComplete?: () => void;
}

export const useAnimationStore = defineStore("animation", {
    state: () => ({
        flyingItems: [] as FlyingItem[],
        nextId: 1,
    }),
    actions: {
        flyPlayer(
            player: Player,
            startRect: DOMRect,
            targetSelector: string,
            onComplete?: () => void
        ) {
            this.flyingItems.push({
                id: this.nextId++,
                player,
                startRect,
                targetSelector,
                onComplete,
            });
        },
        removeItem(id: number) {
            const index = this.flyingItems.findIndex((item) => item.id === id);
            if (index > -1) {
                this.flyingItems.splice(index, 1);
            }
        },
    },
});
