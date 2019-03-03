import Vue from 'vue'
import { Declarations } from '@/declarations/declarations';

declare module 'vue/types/vue' {
    // Global properties can be declared
    // on the `VueConstructor` interface
    interface Vue {
        $BackgroundLayer: HTMLElement;
        $BaseLayer: HTMLElement;
        $GuiLayer: HTMLElement;
        $CanvasX: number,
        $CanvasY: number
    }
}