<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card class="ma-2" :class="{ 'grey': hover, 'lighten-3': hover}" >
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
                                    <v-menu :offset-x="true">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                class="mt-4"
                                                text 
                                                icon
                                                v-bind="attrs"
                                                v-on="on"
                                                v-show="hover"
                                            >
                                                <v-icon dense>mdi-pencil-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item-group>

                                                <!-- menu option component -->
                                                <menu-options v-bind="$props"></menu-options>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-menu>
                                </v-row>
                            </v-col>
                            </v-row>
                        <v-row>
                            <v-list-item-content>
                                {{content}}
                            </v-list-item-content>
                            
                        </v-row>
                    </v-container>
                </v-list-item>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
import menuOptions from '../components/list-card-item-menu-options'

export default {
    components: {
        menuOptions
    },
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
            
        }
    },
    methods: {
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