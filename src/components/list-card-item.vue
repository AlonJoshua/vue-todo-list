<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card class="ma-2" :class="{ 'grey': hover, 'lighten-3': hover}">
                <v-list-item
                    class="py-2" 
                    draggable="true" 
                    @dragstart="onDrag"
                >
                    <v-container fluid class="pt-0">
                        <v-row no-gutters align="center" cols="12">
                            <v-col cols="10">
                                <v-chip 
                                    v-for="(label, index) in itemCard.labels" 
                                    :key="index"
                                    dark
                                    small
                                    :color="label.color"
                                    class="ma-1"
                                > {{label.content}}
                                </v-chip>
                            </v-col>
                            <v-col cols="2" align-self="start">
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <!-- card item menu -->
                                    <v-menu :offset-x="true" v-model="menu">
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                class="mt-4 mb-2"
                                                text 
                                                icon
                                                v-on="on"
                                                v-show="hover"
                                            >
                                                <v-icon dense>mdi-pencil-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item-group>

                                                <!-- menu option component -->
                                                <options-menu 
                                                    v-bind="$props"
                                                    :type="type"
                                                    :menuItems="cardMenuItems"
                                                    @close-menu="closeMenu"
                                                >
                                                </options-menu>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-menu>
                                </v-row>
                            </v-col>
                            </v-row>
                        <v-row>
                            <v-list-item-content>
                                {{itemCard.title}}
                            </v-list-item-content>
                            
                        </v-row>
                    </v-container>
                </v-list-item>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
import optionsMenu from '../components/options-menu'

export default {
    components: {
        optionsMenu,
    },
    props: [
        'cardIndex',
        'listIndex',
        'boardId'
    ],
    data() {
        return {
            menu: false,
            type: 'card',
            cardMenuItems: [
                { 
                    name: 'Edit title', 
                    active: false,
                },
                { 
                    name: 'Edit Labels',
                    active: false,
                },
                { 
                    name: 'Move',
                    active: false,
                },
                { 
                    name: 'Copy',
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
        onDrag() {
            // console.log('drag event')
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