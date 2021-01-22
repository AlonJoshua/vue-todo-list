<template>
    <v-container fluid>
        <v-row no-gutters class="ml-1">
            <v-col cols="3" class="px-2 mb-3" v-for="(list, index) in board.lists" :key="index">
                <v-card color="grey lighten-2">
                    
                    <v-container>
                        <v-row>
                            <v-card-title>{{list.title}}</v-card-title>
                            <v-spacer />
                            <v-card-actions>
                                <v-btn text icon>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-container>

                    <v-list color="grey lighten-2">
                        <v-card class="ma-2" v-for="(item, index) in list.items" :key="index">
                            <list-card-item :content="item.content"></list-card-item>
                        </v-card>
                        <v-card flat class="ma-2 grey lighten-2">
                            <v-btn block text @click="addNewCard(index)">
                                <v-icon dense>mdi-plus</v-icon>
                                <v-card-subtitle class="pa-0">{{btns.addItemBtnTitle}}</v-card-subtitle>
                            </v-btn>
                        </v-card>
                    </v-list>
                </v-card>
            </v-col>

            <v-col cols="3" class="text-center px-2">
                <v-btn text dark block @click="addNewList">
                    <v-icon dense>mdi-plus</v-icon>
                    {{btns.addListBtnTitle}}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import listCardItem from '@/components/list-card-item'
export default {
    props: ['boardId'],
    components: {
        listCardItem,
    },
    data() {
        return {
            btns: {
                addItemBtnTitle: 'Add another card',
                addListBtnTitle: 'add another list'
            }
        }
    },
    methods: {
        addNewCard(listIndex) {
            const idsObj = {
                boardId: this.boardId,
                listIndex
            }
            this.$store.dispatch('addNewCardToList', idsObj)
        },
        addNewList() {
            this.$store.dispatch('addNewListToBoard', this.boardId)
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