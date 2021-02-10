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
                    <v-btn color="error" @click="deleteCard">
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
        deleteCard() {
            this.$store.dispatch('deleteCard', this.data.idsObj)
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