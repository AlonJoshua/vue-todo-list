<template>
    <div class="menu-options">
        <v-dialog 
            v-for="item in menuItems"
            :key="item.name"
            v-model="item.active"
            max-width="30vw"
        >
            <template v-slot:activator="{ on, attrs}">
                <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item>
            </template>

            <editText v-if="item.name === 'Edit title'" :data="{item, idsObj, type}" />
            <editLabels v-if="item.name === 'Edit Labels'" :data="{item, idsObj}" />
            <moveItem v-if="item.name === 'Move'" v-bind="$props" :data="{item, idsObj}" />
            <copyItem v-if="item.name === 'Copy'" v-bind="$props" :data="{item, idsObj}" />
            <deleteItem v-if="item.name === 'Delete'" :data="{item, idsObj, type}" />
        </v-dialog>
    </div>
</template>

<script>
import { bus } from '../main'
import editText from './menu-options/edit-text'
import editLabels from './menu-options/edit-labels'
import moveItem from './menu-options/move-item'
import copyItem from './menu-options/copy-item.vue'
import DeleteItem from './menu-options/delete-item.vue'

export default {
    components: {
        editText,
        editLabels,
        moveItem,
        copyItem,
        DeleteItem
    },
    props: {
        type: {},
        cardIndex: {},
        listIndex: {},
        boardId: {},
        menuItems: {}
    },
    computed: {
        idsObj() {
            return {
                boardId: this.boardId,
                listIndex: this.listIndex,
                cardIndex: this.cardIndex
            }
        },
        dialogActivationArray() {
            return this.menuItems.map(item => item.active)
        },
    },
    watch: {
        dialogActivationArray() {
            if(this.dialogActivationArray.every(i => i === false)) {
                this.$emit('close-menu');
            }
        }
    },
    mounted() {
        bus.$on('close-dialog', (data) => {
            data.item.active = false
        })
    }
}
</script>