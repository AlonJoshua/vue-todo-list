<template>
     <v-card>
        <v-container>
            <v-row>
                <v-col class="text-center text-h6 mb-2">
                    {{cardTitle}}
                </v-col>
            </v-row>
            <v-divider />
            <v-row class="ma-2">
                <v-col class="text-center">
                    <v-btn color="error" @click="deleteController">
                        {{deleteBtnTitle}}
                    </v-btn>
                </v-col>
                <v-col class="text-center">
                    <v-btn color="primary" @click="closeDialog">
                        {{cancelBtnTitle}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { bus } from '../../main'
export default {
    props: ['data'],
    data() {
        return {
            cardTitle: 'Delete Item?',
            deleteBtnTitle: 'Delete',
            cancelBtnTitle: 'Cancel'
        }
    },
    methods: {
        deleteController() {
            console.log(this.data.type)
            switch(this.data.type) {
                case 'card':
                    this.deleteCard()
                break;
                case 'list':
                    this.deleteList()
                break;
                case 'board':
                    this.deleteBoard()
                break;
                default:
                    console.log('item type it undefined')

            }
        },
        deleteCard() {
            this.$store.dispatch('deleteCard', this.data.idsObj)
            bus.$emit('close-dialog', this.data)
        },
        deleteList() {
            this.$store.dispatch('deleteList', this.data.idsObj)
            bus.$emit('close-dialog', this.data)
        },
        closeDialog() {
            bus.$emit('close-dialog', this.data)
        }
    }
}
</script>

<style>

</style>