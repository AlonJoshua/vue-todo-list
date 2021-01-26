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
                                    <v-list-item 
                                        v-for="item in cardMenu.items" 
                                        :key="item.name"
                                        @click="cardMenuSelect(item.name)"
                                    >
                                        <v-list-item-title>{{item.name}}</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </v-row>
                </v-container>
            </v-list-item>
            
            <v-overlay :value="overlay">
                <v-textarea
                    v-if="cardMenu.selectedItemName === 'Edit text'"
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
                
            <v-btn class="success" @click="updateCardText">Save</v-btn>
            </v-overlay>
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
            overlay: false,
            textareaValue: null,
            cardMenu: {
                active: false,
                selectedItemName: null,
                items: [
                    { name: 'Edit text', },
                    { name: 'Edit Labels', },
                    { name: 'Move', },
                    { name: 'Copy', },
                    { name: 'Delete', }
                ]
            }
        }
    },
    methods: {
        cardMenuSelect(itemName) {
            this.cardMenu.selectedItemName = itemName
            if (itemName !== "Copy") this.overlay = !this.overlay
        },
        updateCardText() {
            const data = {
                idsObj: {
                    boardId: this.boardId,
                    listIndex: this.listIndex,
                    cardIndex: this.cardIndex
                },
                textareaValue: this.textareaValue
            }
            this.$store.dispatch('editCardContent', data)
            this.overlay = false
        },
        onDrag() {
            console.log('drag event')
        }
    },

}
</script>

<style scoped>

</style>