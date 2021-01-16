<template>
    <v-card flat class="ma-2 grey lighten-2">
        <v-btn block text @click="addCardBtnClick">
            <v-icon dense>mdi-plus</v-icon>
            <v-card-subtitle class="pa-0">{{btn.title}}</v-card-subtitle>
        </v-btn>
    </v-card>
</template>

<script>
export default {
    props: {
        listId: {
            type: Number
        }
    },
    data() {
        return {
            btn: {
                title: 'Add another card'
            }
        }
    },
    methods: {
        addCardBtnClick() {
            this.$store.dispatch('addCard', this.listId)
        }
    }
}
</script>

<style>

</style>