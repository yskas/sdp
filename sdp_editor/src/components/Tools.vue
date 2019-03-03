<template>
    <div class="sdp-editorTools">
        <img data-editorAddButton="" v-on:mouseover="toggleInputOptions(true)" src="../assets/baseline-add-24px.svg" alt="Add" title="Add" />
        <img v-bind:disabled="true" @click="$emit('editElement')" src="../assets/baseline-edit-24px.svg" alt="Edit" title="Edit" />
        <img @click="$emit('deleteElement')" src="../assets/baseline-delete-24px.svg" alt="Delete" title="Delete" />
        <img v-bind:disabled="true" @click="$emit('addElement', Declarations.ElementTypes.bubble)" src="../assets/baseline-chat_bubble_outline-24px.svg" alt="Comment" title="Comment" />
        <div class="sdp-inputOptions" v-show="showInputOprions" v-on:mouseleave="toggleInputOptions(false)" v-bind:style="optionsStyle">
            <img @click="$emit('addElement', ElementTypes.input)" src="../assets/baseline-input-24px.svg" alt="AddInput" title="AddInput" />
            <img v-bind:disabled="true" @click="$emit('addElement', ElementTypes.label)" src="../assets/baseline-label-24px.svg" alt="AddLabel" title="AddLabel" />
            <img v-bind:disabled="true" @click="$emit('addElement', ElementTypes.grid)" src="../assets/baseline-grid_on-24px.svg" alt="AddGrid" title="AddGrid" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Declarations } from '@/declarations/declarations';

    @Component
    export default class Tools extends Vue {

        showInputOprions: boolean = false;

        optionsStyle: {
            top: string,
            left: string
        } = {
                top: "0px",
                left: "0px"
            };

        // == Computed ==

        get ElementTypes(): any {
            return Declarations.ElementTypes
        }

        // == Methods ==

        /**
         * Method to toggle input options
         * @param display
         */
        toggleInputOptions(display: boolean): void {
            this.showInputOprions = display;
            if (this.showInputOprions) {
                var addButton: HTMLElement = document.querySelector("[data-editorAddButton]") || new HTMLElement();
                var rectBounds = addButton.getBoundingClientRect();
                var topToBottom = rectBounds.bottom - rectBounds.top;
                this.optionsStyle.top = rectBounds.top + topToBottom + "px";
                this.optionsStyle.left = rectBounds.left + "px";
            };
        }

        // == Lifecycle Hooks ==
        mounted(): void {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
                this.$emit("initTools");
            })
        };
    }
</script>

<style scoped>
</style>