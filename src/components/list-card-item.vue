<template>
    <v-hover v-slot="{ hover }">
        <v-card class="ma-2" >
              
            <v-list-item
                class="py-2" 
                draggable="true" 
                @dragstart="onDrag"
            >
                <v-container fluid>
                    <v-row>
                        <v-list-item-content>
                            {{content}}
                        </v-list-item-content>
                        
                        <!-- card item menu -->
                        <v-menu :offset-x="true">
                            <template 
                                v-slot:activator="{ on, attrs }"
                            >
                                <v-btn 
                                    text 
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    v-show="hover"
                                    @click="cardMenu.active = !cardMenu.active"
                                >
                                    <v-icon dense>mdi-pencil-outline</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item-group>

                                    <!-- menu option dialog -->
                                    <v-dialog 
                                        v-for="item in cardMenu.items" 
                                        :key="item.name"
                                        :v-model="item.dialog.active"
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
                                                        v-model="textareaValue"
                                                        background-color="white"
                                                    ></v-textarea>
                                                    <v-row>
                                                        <v-spacer />
                                                            <v-btn 
                                                                class="success mb-2" 
                                                                @click="updateCardText"
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
                                                        <v-card-title class="justify-center">
                                                            {{item.dialog.labelTitle}}
                                                        </v-card-title>
                                                        <v-divider></v-divider>
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
                                        
                                    </v-dialog>
                                    
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </v-row>
                </v-container>
            </v-list-item>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    props: [
        'content', 
        'cardIndex',
        'listIndex',
        'boardId'
    ],
    data() {
        return {
            textareaValue: null,
            saveBtn: 'Save',
            cardMenu: {
                active: false,
                selectedItemName: null,
                items: [
                    { 
                        name: 'Edit Text', 
                        dialog: {
                            active: false
                        }   
                    },
                    { 
                        name: 'Edit Labels',
                        dialog: {
                            active: false,
                            labelTitle: 'Labels'
                        }   
                    },
                    { 
                        name: 'Move',
                        dialog: {
                            active: false
                        }       
                    },
                    { 
                        name: 'Copy',
                        dialog: {
                            active: false
                        }       
                    },
                    { 
                        name: 'Delete',
                        dialog: {
                            active: false
                        }   
                    }
                ]
            },
        }
    },
    methods: {
        cardMenuSelect(itemName) {
            this.cardMenu.selectedItemName = itemName
        },
        updateCardText() {
            const data = {
                idsObj: this.idsObj,
                textareaValue: this.textareaValue
            }
            this.$store.dispatch('editCardContent', data)
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
            console.log(this.itemCard)
        },
        onDrag() {
            console.log('drag event')
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
        itemCard() {
            return this.$store.getters.getListCardItem(this.idsObj)
        },
        labels() {
            return this.$store.getters.getLabels
        }
    }

}
</script>

<style scoped>

</style>