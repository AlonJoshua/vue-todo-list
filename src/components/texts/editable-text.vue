<template>
  <div class="text-wrapper">
      <textarea v-show="textFocus"
                v-on:blur="confirmFocus"
                :value="itemData.name"
                @change="updateItemName"
                :name="textareaName"
                placeholder="Write item name"
                class="TitleTextarea"
                cols="30" 
                rows="1">
      </textarea>
      <div v-show="!textFocus" @focus="confirmFocus" contenteditable="true"> {{ itemData.name }} </div>
  </div>
</template>

<script>
export default {
    props: {
        itemData: {}
    },
    data() {
        return {
            textFocus: false,
            textareaName: `textarea ${this.itemData.id}`
        }
    },
    methods: {
        updateItemName(event) {
            this.$emit("updateItemName", event.target.value)
        },
        confirmFocus() {
            let textarea = document.getElementsByClassName('TitleTextarea').namedItem(this.textareaName);
            if (!this.textFocus) {
                this.textFocus = true;
                this.$nextTick(() => {
                    textarea.focus();
                }) 
            } else if (!this.itemData.name) {
                this.textFocus = true;
            } else {
                this.textFocus = false;
            }
        }
    },
    computed: {
    },
    watch: {
        itemData: function () {
            this.textareaName = `textarea ${this.itemData.id}`;
            if (!this.itemData.name) {
            this.$nextTick(() => this.confirmFocus());
            }
        }
    }
}
</script>

<style>

</style>