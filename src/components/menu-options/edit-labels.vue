<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col>
                    <v-row cols="12" align="center">
                        <v-col cols="3"></v-col>
                        <v-spacer />
                            <v-col cols="6">
                                <v-card-title class="justify-center pl-2">
                                    {{cardTitle}}
                                </v-card-title>
                            </v-col>
                        <v-spacer />
                        <v-col cols="3">
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
</template>

<script>
import { bus } from '../../main'
export default {
    props: ['data'],
    data() {
        return {
            cardTitle: 'Labels'
        }
    },
    methods: {
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
        closeDialog() {
            bus.$emit('close-dialog', this.data)
        }
    },
    computed: {
        labels() {
            return this.$store.getters.getLabels
        },
        itemCard() {
            return this.$store.getters.getListCardItem(this.data.idsObj)
        },
    }
}
</script>

<style>

</style>