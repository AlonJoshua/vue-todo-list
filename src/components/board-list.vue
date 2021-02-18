<template>
    <v-col cols="3" class="px-2 mb-3">
        <v-card color="grey lighten-2">
            <v-container>
                <v-row>
                    <v-card-title>{{list.title}}</v-card-title>
                    <v-spacer />
                    <v-card-actions>

                        <v-menu :offset-x="true" v-model="menu">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    class="mt-4"
                                    text 
                                    icon
                                    v-on="on"
                                >
                                    <v-icon dense>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item-group>

                                    <options-menu
                                        v-bind="$props"
                                        :type="type"
                                        :menuItems="listMenuItems"
                                        @close-menu="closeMenu"
                                    >
                                    </options-menu>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </v-card-actions>
                </v-row>
            </v-container>

            <v-list color="grey lighten-2">
                    <list-card-item v-for="(item, itemIndex) in list.items" :key="itemIndex"
                        :cardIndex="itemIndex"
                        v-bind="$props"
                    ></list-card-item>
                <v-card flat class="ma-2 grey lighten-2">
                    <v-btn block text @click="addNewCard()">
                        <v-icon dense>mdi-plus</v-icon>
                        <v-card-subtitle class="pa-0">{{addItemBtnTitle}}</v-card-subtitle>
                    </v-btn>
                </v-card>
            </v-list>
        </v-card>
    </v-col>
</template>

<script>
import listCardItem from '@/components/list-card-item'
import optionsMenu from '../components/options-menu'

export default {
    components: {
        listCardItem,
        optionsMenu
    },
    props: ['boardId', 'listIndex'],
    data() {
        return {
            addItemBtnTitle: 'Add another card',
            menu: false,
            type: 'list',
            listMenuItems: [
                { 
                    name: 'Edit title', 
                    active: false,
                },
                { 
                    name: 'Delete',
                    active: false,
                }
            ] 
        }
    },
    methods: {
        closeMenu() {
            this.menu = false
        },
        addNewCard() {
            const data = {
                idsObj: {
                    boardId: this.boardId,
                    listIndex: this.listIndex
                },
                cardItem: {
                    title: 'new item...',
                    labels: [] 
                }
            }
            this.$store.dispatch('addNewCardToList', data)
        }
    },
    computed: {
        board() {
            return this.$store.getters.getBoard(this.boardId)
        },
        list() {
            return this.board.lists[this.listIndex]
        }
    }
}
</script>

<style>

</style>