<template>
    <v-card>
        <v-container fill-height>
            <v-row cols="12">
                <v-col cols="3"></v-col>
                <v-col cols="7">
                    <v-card-title class="ml-3">
                        {{cardTitle}}
                    </v-card-title>
                </v-col>
                <v-col cols="2" align-self="center">
                    <v-spacer />
                    <v-btn
                        text 
                        plain
                        :ripple="false"
                        icon
                        @click="closeDialog"
                    >
                        <v-icon right>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-divider class="mx-4" />
            </v-row>
            <v-row no-gutters class="text-left">
                <v-card-subtitle class="mt-4 pl-2 text-uppercase">
                    {{selectTitle}}
                </v-card-subtitle>
            </v-row>
            <v-row class="px-2" no-gutters>
                <v-select
                    :items="boardsTitles"
                    label="Board"
                    v-model="selectedBoardValue"
                ></v-select>
            </v-row>
            <v-row cols="12">
                <v-col cols="8">
                    <v-select
                        :items="selectedListsTitles"
                        label="list"
                        v-model="selectedListValue"
                    ></v-select>
                </v-col>
                <v-col>
                    <v-select
                        :items="selectedListIndexes"
                        label="position"
                        v-model="selectedPosition"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        class="success mb-2"
                        @click="moveCard"
                    >
                        {{moveBtn}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { bus } from '../../main'
export default {
    props: {
        data: {},
        cardIndex: {},
        listIndex: {},
        boardId: {},
        boardTitle: {default: 'Default GTD project'},
        listTitle: {default: 'To Do'}
    },
    data() {
        return {
            cardTitle: 'Move Card',
            selectTitle: 'Select Destination',
            moveBtn: 'Move',
            selectedBoardValue: this.boardTitle,
            selectedListValue: this.listTitle,
            selectedPosition: 0,
        }
    },
    methods: {
        moveCard() {
            const moveData = {
                cardIdsObj: {
                    boardId: this.selectedBoard.id,
                    listIndex: this.selectedBoard.lists.indexOf(this.selectedList),
                    cardIndex: this.selectedPosition - 1
                },
                card: {...this.$store.getters.getListCardItem(this.data.idsObj)}
            }
            this.$store.dispatch('deleteCard', this.data.idsObj)
            this.$store.dispatch('insertCard', moveData)
            bus.$emit('close-dialog', this.data)
        },
        closeDialog() {
            bus.$emit('close-dialog', this.data)
        }
    },
    computed: {
        board() {
            return this.$store.getters.getBoard(this.boardId)
        },
        boards() {
            return this.$store.getters.getBoardsList
        },
        boardsTitles() {
            return this.boards.map(board => board.title)
        },
        selectedList() {
            return this.selectedBoard.lists.find(list => list.title === this.selectedListValue)
        },
        selectedListsTitles() {
            return this.selectedBoard.lists.map(list => list.title)
        },
        selectedListIndexes() {
            return Object.keys(this.selectedList.items).map(key => parseInt(key) + 1)
        },
        selectedBoard() {
            return this.$store.getters.getBoard(this.selectedBoardId)
        },
        selectedBoardId() {
            return this.boards.find(board => board.title === this.selectedBoardValue).id
        }
    }
}
</script>