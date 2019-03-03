<template>
    <div id="app">
        <Tools @addElement="addElement"
                   @editElement="editElement"
                   @deleteElement="deleteElement"
                   @initTools="initTools"
               />
        <div data-canvas>
            <div data-editorPage="" v-bind:style="{ height: myPage.height + 'px', width: myPage.width + 'px' }" class="sdp_page">
                <div data-editorLayer="background"></div>
                <div data-editorLayer="base"></div>
                <div data-editorLayer="gui"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Tools from './components/Tools.vue';
    import Input from './components/Input.vue';
    import { Declarations } from "./declarations/declarations";
    import './css/app.css'

    @Component({
        components: {
            Tools
        }
    })
    
    export default class App extends Vue {
        
        // Background properties
        myPage: {
            height: number,
            width: number
        }

        //layers: NodeListOf<HTMLElement>;
        elements: Array<any> = [];
        selected: Array<any> = [];

        constructor() {
            super();
            this.myPage = {
                height: 0,
                width: 0
            };
        }

        // == Lifecycle Hooks ==
        /**
         * Triggers after initial process is done (injections & reactivity)
         * @event
         * */
        created(): void {
            window.addEventListener('resize', this.onWindowResize);
        }

        mounted(): void {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
                var layers: NodeListOf<HTMLElement> = function () {
                    return document.querySelectorAll("[data-editorLayer]") as NodeListOf<HTMLElement>;
                }();
                layers.forEach(layer => {
                    var layerAtt: string = layer.getAttribute("data-editorLayer") || "";
                    if (layerAtt === "background") {
                        (window as any).$BackgroundLayer = layer;
                    } else if (layerAtt === "base") {
                        (window as any).$BaseLayer = layer;
                    } else if (layerAtt === "gui") {
                        (window as any).$GuiLayer = layer;
                    };
                });
                var canvas: HTMLElement = document.querySelector("[data-canvas]") || new HTMLElement;
                (window as any).$CanvasX = canvas.offsetLeft;
                (window as any).$CanvasY = canvas.offsetTop;
            })
        };

        // == Methods ==

        /**
         * Function intended to triggers on window resize event
         * @function
         * */
        onWindowResize(): void {
            var UIComponent: HTMLElement = document.querySelector(".sdp-editorTools") || new HTMLElement;
            this.myPage.height = window.innerHeight - UIComponent.offsetHeight - 20;
            this.myPage.width = window.innerWidth * 0.9;
        }

        /**
         * Adds chosen element to canvas
         * @param type
         */
        addElement(type: Declarations.ElementTypes): any {
            var newElement: any;
            switch (type) {
                case Declarations.ElementTypes.input:
                    // Create new element instance
                    newElement = new Input();
                    break;
            }
            // 
            newElement.$props.emitSelect = this.emitSelect;
            newElement.$props.emitUnselect = this.emitUnselect;
            // Add to list
            this.elements.push(newElement);
            return true;
        }

        /**
         * Display property editing window for a selected element
         */
        editElement(): any {
            alert("editElement");

        }

        emitSelect(comp: any): void {
            this.selected.push(comp);
        }
        emitUnselect(comp: any): void {
            var that = this;
            for (var i = 0; i < this.selected.length; i++) {
                if (this.selected[i] == comp) {
                    this.selected.splice(i, 1);
                }
            }
        }

        /**
         * Delete selected element
         */
        deleteElement(): any {
            this.selected.forEach(function (comp) {
                if (comp.$el.parentElement) comp.$el.parentElement.removeChild(comp.$el);
                if (comp.$data.GUI.$el.parentElement) comp.$data.GUI.$el.parentElement.removeChild(comp.$data.GUI.$el);
            });
            this.selected = [];
        }

        /**
         * Called when Tools compoment is fully loaded
         */
        initTools(): void {
            this.onWindowResize();
        }

    }
    
</script>

<style>
</style>
