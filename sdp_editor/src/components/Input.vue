<template>
        <div class="sdp_input" v-bind:style="wrapperStyle" @click="emitSelectWrapper">
            {{ name }}
            <input type="text" v-bind:style="inputStyle" v-bind:value="value" @click="emitSelectInput" />
        </div>
</template>

<script lang="ts">
    import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
    import { Declarations } from '@/declarations/declarations';
    import InputGUI from './InputGUI.vue';

    @Component
    export default class Input extends Vue {

        @Prop() emitSelect!: any;
        @Prop() emitUnselect!: any;

        id: string = "";
        top: number = 0;
        left: number = 0;
        height: number = 0;
        width: number = 0;
        inputWidthRatio: number = 0.6;
        backgroundColor: string = "white";
        strokeColor: string = "black";
        value: string = "Default Value";
        name: string = "New Input";
        wrapperStyle: Declarations.Position = new Declarations.Position();
        inputStyle: Declarations.Position = new Declarations.Position();
        GUI: InputGUI;

        // == Watch ==
        @Watch('top')
        onTopChange(newValue: number, oldValue: number): void {
            this.wrapperStyle.top = newValue + "px";
        }
        @Watch('left')
        onLeftChange(newValue: number, oldValue: number): void {
            this.wrapperStyle.left = newValue + "px";
        }
        @Watch('height')
        onHeightChange(newValue: number, oldValue: number): void {
            this.wrapperStyle.height = newValue + "px";
        }
        @Watch('width')
        onWidthChange(newValue: number, oldValue: number): void {
            this.wrapperStyle.width = newValue + "px";
            this.inputStyle.width = newValue * this.inputWidthRatio + "px";
        }

        constructor() {
            super();
            // Defaults
            this.top = 0;
            this.left = 0;
            this.height = 20;
            this.width = 200;

            // Calculate inner element styles
            this.wrapperStyle = {
                top: this.top + "px",
                left: this.left + "px",
                height: this.height + "px",
                width: this.width + "px",
                fontSize: "10pt",
                borderWidth: "1px",
                borderColor: "#000000",
                backgroundColor: "#FFFFFF"
            }
            this.inputStyle = {
                top: parseFloat(this.wrapperStyle.borderWidth.replace("px", "")) / 2 + "px",
                left: "0px",
                height: this.height * 0.9 - (parseFloat(this.wrapperStyle.borderWidth.replace("px", "")) * 2) + "px",
                width: this.width * this.inputWidthRatio + "px",
                fontSize: "10pt",
                borderWidth: "1px",
                borderColor: "#000000",
                backgroundColor: "#FFFFFF"
            }

            this.GUI = new InputGUI()
            this.GUI.$props.emitGUIMouseUp = this.emitGUIMouseUp;
            this.GUI.$props.emitGUIUnselect = this.emitGUIUnselect;

        } // /constructor

        // == Lifecycle Hooks ==
        created(): void {
            this.$mount();
            (window as any).$BaseLayer.appendChild(this.$el);
        }

        // == Methods ==

        emitSelectWrapper($event: Event): void {
            $event.preventDefault();
            $event.stopImmediatePropagation();

            this.GUI.$props.top = this.top;
            this.GUI.$props.left = this.left;
            this.GUI.$props.height = this.height;
            this.GUI.$props.width = this.width;
            this.GUI.$mount();
            (window as any).$GuiLayer.appendChild(this.GUI.$el);

            this.emitSelect(this);

        };

        emitSelectInput($event: MouseEvent): void {
            $event.preventDefault();
            $event.stopImmediatePropagation();

        };
        emitGUIMouseUp($event: MouseEvent): void {
            this.top = this.GUI.$props.top;
            this.left = this.GUI.$props.left;
            this.height = this.GUI.$props.height;
            this.width = this.GUI.$props.width;
        };
        emitGUIUnselect($event: MouseEvent): void {
            this.emitUnselect(this);
        };
    }
</script>

<style scoped>
</style>