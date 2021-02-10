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
            <v-row>
                <v-col class="my-2">
                    {{textareaTitle}}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        light
                        outlined
                        dense
                        auto-grow
                        autofocus
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Enter card title..."
                        v-model="textareaValue"
                        background-color="white"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row no-gutters class="text-left">
                <v-card-subtitle class="mt-4 pl-2 text-uppercase">
                    {{copyToTitle}}
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
                        @click="copyCard"
                    >
                        {{copyBtn}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { bus } from '../../main'
export default {
    props: [
        'data',
        'content', 
        'cardIndex',
        'listIndex',
        'boardId',
        'boardTitle',
        'listTitle'
    ],
    data() {
        return {
            cardTitle: 'Copy Card',
            textareaTitle: 'Title',
            textareaValue: this.content,
            copyToTitle: 'Copy to...',
            copyBtn: 'Create Card',
            selectedBoardValue: this.boardTitle,
            selectedListValue: this.listTitle,
            selectedPosition: this.cardIndex + 1,
        }
    },
    methods: {
        copyCard() {
            const copyData = {
                cardIdsObj: this.newIdsObj,
                card: {...this.$store.getters.getListCardItem(this.data.idsObj)}
            }
            copyData.card.content = this.textareaValue
            this.$store.dispatch('insertCard', copyData)
            bus.$emit('close-dialog', this.data)
        },
        closeDialog() {
            bus.$emit('close-dialog', this.data)
        }
    },
    computed: {
        newIdsObj() {
            return {
                boardId: this.selectedBoard.id,
                listIndex: this.selectedBoard.lists.indexOf(this.selectedList),
                cardIndex: this.selectedPosition - 1
            }
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

<style>

</style>