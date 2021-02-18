<template>
    <v-container fluid>
        <v-row class="my-2">
            <v-col>
                <v-card flat class="text-center mx-3">
                    <v-card-title>
                        <v-spacer />
                            <h2 class="text-uppercase primary--text">{{board.title}}</h2>
                        <v-spacer />
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ml-1">
            <board-list 
                v-for="(list, listIndex) in board.lists" 
                :key="listIndex"
                :listIndex="listIndex"
                v-bind="$props" 
            />

            <v-col cols="3" class="text-center px-2">
                <v-btn text dark block @click="addNewList">
                    <v-icon dense>mdi-plus</v-icon>
                    {{addListBtnTitle}}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BoardList from '../components/board-list.vue'

export default {
    props: ['boardId'],
    components: {
        BoardList
    },
    data() {
        return {
            addListBtnTitle: 'add another list'
        }
    },
    methods: {
        addNewList() {
            const data = {
                boardId: this.boardId,
                list: { title: 'New List', items: [] }
            }
            this.$store.dispatch('addNewListToBoard', data)
        }
    },
    computed: {
    board() {
      return this.$store.getters.getBoard(this.boardId)
    }
  }
}
</script>

<style>

</style>