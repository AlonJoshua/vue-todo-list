<template>
    <div class="menu-options">
        <v-dialog 
            v-for="item in cardMenuOptions.items" 
            :key="item.name"
            v-model="item.dialog.active"
            max-width="30vw"
        >
            <template v-slot:activator="{ on, attrs}">
                <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item>
            </template>

            <v-container v-if="item.name === 'Edit Text'">
                <v-row>
                    <v-col>
                        <v-textarea
                            light
                            solo
                            auto-grow
                            autofocus
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Enter card title..."
                            v-model="item.dialog.textareaValue"
                            background-color="white"
                        ></v-textarea>
                        <v-row>
                            <v-spacer />
                                <v-btn
                                    class="success mb-2"
                                    @click="updateCardText(item)"
                                >
                                    {{saveBtn}}
                                </v-btn>
                            <v-spacer />
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-card v-if="item.name === 'Edit Labels'">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row cols="12" align="center">
                                <v-col cols="3"></v-col>
                                <v-spacer />
                                    <v-col cols="6">
                                        <v-card-title class="justify-center pl-2">
                                            {{item.dialog.cardTitle}}
                                        </v-card-title>
                                    </v-col>
                                <v-spacer />
                                <v-col cols="3">
                                    <v-btn
                                        text 
                                        plain
                                        :ripple="false"
                                        icon
                                        @click="item.dialog.active = false"
                                    >
                                        <v-icon right>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider />
                            <v-list>
                                <v-card
                                    v-for="(label, labelIndex) in labels"
                                    :key="labelIndex"
                                    flat
                                >
                                    <v-container fluid>
                                        <v-row cols="12" dense no-gutters>
                                            <v-col cols="10">
                                                <v-text-field 
                                                    :class="`${label.color} px-2`"
                                                    dense
                                                    dark
                                                    v-model="label.content"
                                                >
                                                    {{label.content}}
                                                </v-text-field>
                                            </v-col>
                                            <v-col align-self="center">
                                                <v-btn
                                                    depressed
                                                    icon
                                                    small
                                                    class="ml-2"
                                                    :color="`${isCardLabel(label)}`"
                                                    @click="updateCardLabel(label)"
                                                >
                                                    <v-icon round>mdi-check</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <v-card v-if="item.name === 'Move'">
                <v-container fill-height>
                    <v-row cols="12">
                        <v-col cols="3"></v-col>
                        <v-col cols="7">
                            <v-card-title class="ml-3">
                                {{item.dialog.cardTitle}}
                            </v-card-title>
                        </v-col>
                        <v-col cols="2" align-self="center">
                            <v-spacer />
                            <v-btn
                                text 
                                plain
                                :ripple="false"
                                icon
                                @click="item.dialog.active = false"
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
                            {{item.dialog.selectTitle}}
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
                                @click="moveCard(item)"
                            >
                                {{moveBtn}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <v-card v-if="item.name === 'Copy'">
                <v-container fill-height>
                    <v-row cols="12">
                        <v-col cols="3"></v-col>
                        <v-col cols="7">
                            <v-card-title class="ml-3">
                                {{item.dialog.cardTitle}}
                            </v-card-title>
                        </v-col>
                        <v-col cols="2" align-self="center">
                            <v-spacer />
                            <v-btn
                                text 
                                plain
                                :ripple="false"
                                icon
                                @click="item.dialog.active = false"
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
                            {{item.dialog.textareaTitle}}
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
                                v-model="item.dialog.textareaValue"
                                background-color="white"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="text-left">
                        <v-card-subtitle class="mt-4 pl-2 text-uppercase">
                            {{item.dialog.copyToTitle}}
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
                                @click="copyCard(item)"
                            >
                                {{copyBtn}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <v-card v-if="item.name === 'Delete'">
                <v-container>
                    <v-row>
                        <v-col class="text-center text-h6 mb-2">
                            {{item.dialog.cardTitle}}
                        </v-col>
                    </v-row>
                    <v-divider />
                    <v-row class="ma-2">
                        <v-col class="text-center">
                            <v-btn color="error" @click="deleteCard(item)">
                                {{item.dialog.deleteBtnTitle}}
                            </v-btn>
                        </v-col>
                        <v-col class="text-center">
                            <v-btn color="primary" @click="item.dialog.active = false">
                                {{item.dialog.cancelBtnTitle}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: [
        'content', 
        'cardIndex',
        'listIndex',
        'boardId',
        'boardTitle',
        'listTitle'
    ],
    data() {
        return {
            isDialogClose: false,
            selectedBoardValue: this.boardTitle,
            selectedListValue: this.listTitle,
            selectedPosition: this.cardIndex + 1,
            saveBtn: 'Save',
            moveBtn: 'Move',
            copyBtn: 'Create Card',
            cardMenuOptions: {
                selectedItemName: null,
                items: [
                    { 
                        name: 'Edit Text', 
                        dialog: {
                            active: false,
                            textareaValue: null,
                        }   
                    },
                    { 
                        name: 'Edit Labels',
                        dialog: {
                            active: false,
                            cardTitle: 'Labels'
                        }   
                    },
                    { 
                        name: 'Move',
                        dialog: {
                            active: false,
                            cardTitle: 'Move Card',
                            selectTitle: 'Select Destination',
                        }       
                    },
                    { 
                        name: 'Copy',
                        dialog: {
                            active: false,
                            cardTitle: 'Copy Card',
                            textareaTitle: 'Title',
                            textareaValue: this.content,
                            copyToTitle: 'Copy to...'
                        }       
                    },
                    { 
                        name: 'Delete',
                        dialog: {
                            active: false,
                            cardTitle: 'Delete Item?',
                            deleteBtnTitle: 'Delete',
                            cancelBtnTitle: 'Cancel'
                        }   
                    }
                ]
            }
        }
    },
    methods: {
        updateCardText(item) {
            if (item.dialog.textareaValue.length) {
                const data = {
                    idsObj: this.idsObj,
                    textareaValue: item.dialog.textareaValue
                }
                this.$store.dispatch('editCardContent', data)
                item.dialog.active = false
            }
        },
        isCardLabel(label) {
            const card = this.itemCard
            if (card.labels.includes(label)) {
                return 'success lighten-2' 
            } else {
                return ''
            }
        },
        updateCardLabel(label) {
            if (!this.itemCard.labels.includes(label)) {
                this.itemCard.labels.push(label)
            } else {
                const labelIndex = this.itemCard.labels.indexOf(label)
                this.itemCard.labels.splice(labelIndex, 1)
            }
        },
        moveCard(item) {
            const data = {
                cardIdsObj: this.newIdsObj,
                card: {...this.$store.getters.getListCardItem(this.idsObj)}
            }
            this.$store.dispatch('deleteCard', this.idsObj)
            this.$store.dispatch('insertCard', data)
            item.dialog.active = false
        },
        copyCard(item) {
            const data = {
                cardIdsObj: this.newIdsObj,
                card: {...this.$store.getters.getListCardItem(this.idsObj)}
            }
            data.card.content = item.dialog.textareaValue
            this.$store.dispatch('insertCard', data)
            item.dialog.active = false
        },
        deleteCard(item) {
            this.$store.dispatch('deleteCard', this.idsObj)
            item.dialog.active = false
        }
    },
    computed: {
        idsObj() {
            return {
                boardId: this.boardId,
                listIndex: this.listIndex,
                cardIndex: this.cardIndex
            }
        },
        newIdsObj() {
            return {
                boardId: this.selectedBoard.id,
                listIndex: this.selectedBoard.lists.indexOf(this.selectedList),
                cardIndex: this.selectedPosition - 1
            }
        },
        dialogActivationArray() {
            return this.cardMenuOptions.items.map(item => item.dialog.active)
        },
        itemCard() {
            return this.$store.getters.getListCardItem(this.idsObj)
        },
        labels() {
            return this.$store.getters.getLabels
        },
        boards() {
            return this.$store.getters.getBoardsList
        },
        boardsTitles() {
            return this.boards.map(board => board.title)
        },
        selectedBoard() {
            return this.$store.getters.getBoard(this.selectedBoardId)
        },
        selectedBoardId() {
            return this.boards.find(board => board.title === this.selectedBoardValue).id
        },
        selectedList() {
            return this.selectedBoard.lists.find(list => list.title === this.selectedListValue)
        },
        selectedListsTitles() {
            return this.selectedBoard.lists.map(list => list.title)
        },
        selectedListIndexes() {
            return Object.keys(this.selectedList.items).map(key => parseInt(key) + 1)
        }
    },
    watch: {
        dialogActivationArray() {
            if(this.dialogActivationArray.every(i => i === false)) {
                this.$emit('close-menu');
            }
        }
    }
}
</script>

<style>

</style>