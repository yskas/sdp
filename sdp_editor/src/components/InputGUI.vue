<template>
    <div class="sdp_gui_input" v-bind:style="{ height: height + 'px', width: width + 'px', top: top + 'px', left: left + 'px' }" @mousedown="emitMouseDown">
        <span @mousedown="emitAnchorMouseDown" data-anchor="nw"  v-bind:style="{ top: ay + 'px', left: ax + 'px' }" >■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="n"  v-bind:style="{ top: ay + 'px', left: ax + ((zx - ax) / 2) + 'px' }">■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="ne"  v-bind:style="{ top: ay + 'px', left: zx + 'px' }">■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="w"  v-bind:style="{ top: ay + ((zy - ay) / 2) + 'px', left: ax + 'px' }">■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="e"  v-bind:style="{ top: ay + ((zy - ay) / 2) + 'px', left: zx + 'px' }">■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="sw"  v-bind:style="{ top: zy + 'px', left: ax + 'px' }">■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="s"  v-bind:style="{ top: zy + 'px', left: ax + ((zx - ax) / 2) + 'px' }">■</span>
        <span @mousedown="emitAnchorMouseDown" data-anchor="se"  v-bind:style="{ top: zy + 'px', left: zx + 'px' }">■</span>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
    //import Input from 'Input.vue';
    import { Declarations } from '@/declarations/declarations';

    @Component
    export default class InputGUI extends Vue {

        @Prop() top!: number;
        @Prop() left!: number;
        @Prop() height!: number;
        @Prop() width!: number;
        @Prop() emitGUIMouseUp!: any;
        @Prop() emitGUIUnselect!: any;

        movingAnchor: boolean = false;
        ax: number = -7;
        ay: number = -10;
        zx: number = 0;
        zy: number = 0;

        @Watch("top")
        onTopChange(newValue: number, oldValue: number): void {
            if (newValue < 0) {
                this.top = 0;
                return;
            };
            if (this.movingAnchor) {
                console.log(newValue + " " + oldValue);
                this.height -= ((newValue || 0) - (oldValue || 0));
            };
        }
        @Watch("left")
        onLeftChange(newValue: number, oldValue: number): void {
            if (newValue < 0) {
                this.left = 0;
                return;
            };
            if (this.movingAnchor) {
                console.log(newValue + " " + oldValue);
                this.width -= ((newValue || 0) - (oldValue || 0));
            }
        }
        @Watch("height")
        onHeightChange(newValue: number, oldValue: number): void {
            this.zy = this.height - 9;
        }
        @Watch("width")
        onWidthChange(newValue: number, oldValue: number): void {
            this.zx = this.width - 5;
        }

        //container: HTMLElement;
        guiStyle: Declarations.Position = new Declarations.Position();

        constructor() {
            super();
        } // /constructor

        emitMouseDown($event: MouseEvent): void {
            $event.preventDefault();
            $event.stopImmediatePropagation();

            // Get the current mouse position
            var clientX: number = $event.clientX;
            var clientY: number = $event.clientY;
            // Get the current element's position
            var currentLeft = this.$el.offsetLeft;
            var currentTop = this.$el.offsetTop;

            this.movingAnchor = false;

            window.onmousemove = ($mEvent: MouseEvent) => {
                $mEvent.preventDefault();
                $mEvent.stopImmediatePropagation();

                if ($mEvent.button === 0) {
                    var newX = $mEvent.clientX;
                    var newY = $mEvent.clientY;

                    this.left = newX - (clientX - currentLeft);
                    this.top = newY - (clientY - currentTop);

                } else {
                    window.onmousemove = null;
                };

            };
            window.onmouseup = ($uEvent: MouseEvent) => {
                window.onmousemove = null;
                this.emitGUIMouseUp();
            };
            window.onmousedown = ($uEvent: MouseEvent) => {
                window.onmousedown = null;
                this.emitGUIUnselect();
                if (this.$el.parentElement) this.$el.parentElement.removeChild(this.$el);
            };
        }

        emitAnchorMouseDown($event: MouseEvent): void {
            $event.preventDefault();
            $event.stopImmediatePropagation();

            var Position: string = ($event.target as HTMLElement).getAttribute("data-anchor") || "";

            var clientX: number = $event.clientX;
            var clientY: number = $event.clientY;
            var currentLeft: number = this.$el.offsetLeft;
            var currentTop: number = this.$el.offsetTop;
            var currentHeight: number = this.height;
            var currentWidth: number = this.width;

            this.movingAnchor = true;

            window.onmousemove = ($mEvent: MouseEvent) => {
                $mEvent.preventDefault();
                $mEvent.stopImmediatePropagation();

                if ($mEvent.button === 0) {
                    var newX = $mEvent.clientX;
                    var newY = $mEvent.clientY;

                    switch (Position) {
                        case "nw":
                            this.left = newX - (clientX - currentLeft);
                            this.top = newY - (clientY - currentTop);
                            break;
                        case "n":
                            this.top = newY - (clientY - currentTop);
                            break;
                        case "ne":
                            this.width = currentWidth + (newX - clientX);
                            this.top = newY - (clientY - currentTop);
                            break;
                        case "e":
                            this.width = currentWidth + (newX - clientX);
                            break;
                        case "se":
                            this.height = currentHeight + (newY - clientY);
                            this.width = currentWidth + (newX - clientX);
                            break;
                        case "s":
                            this.height = currentHeight + (newY - clientY);
                            break;
                        case "sw":
                            this.left = newX - (clientX - currentLeft);
                            this.height = currentHeight + (newY - clientY);
                            break;
                        case "w":
                            this.left = newX - (clientX - currentLeft);
                            break;
                    };
                } else {
                    window.onmousemove = null;
                };
            };
            window.onmouseup = ($uEvent: MouseEvent) => {
                window.onmousemove = null;
                this.emitGUIMouseUp();
            };
            window.onmousedown = ($uEvent: MouseEvent) => {
                window.onclick = null;
                this.emitGUIUnselect();
                if (this.$el.parentElement) this.$el.parentElement.removeChild(this.$el);
            };
        }

    }
</script>

<style scoped>
</style>