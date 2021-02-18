<template>
    <v-container>
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
                            @click="editController"
                        >
                            {{saveBtn}}
                        </v-btn>
                    <v-spacer />
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { bus } from '../../main'
export default {
    props: ['data'],
    data() {
        return {
            saveBtn: 'Save',
            textareaValue: '',
        }
    },
    methods: {
        editController() {
            switch(this.data.type) {
                case 'card':
                    this.updateCardText()
                break;
                case 'list':
                    this.updateListTitle()
                break;
                default:
                    console.log('item type is undefined')

            }
        },
        updateCardText() {
            if (this.textareaValue.length) {
                const newData = {
                    idsObj: this.data.idsObj,
                    textareaValue: this.textareaValue
                }
                this.$store.dispatch('editCardContent', newData)
                bus.$emit('close-dialog', this.data)
            }
        },
        updateListTitle() {
            if (this.textareaValue.length) {
                const newData = {
                    idsObj: this.data.idsObj,
                    textareaValue: this.textareaValue
                }
                this.$store.dispatch('editListTitle', newData)
                bus.$emit('close-dialog', this.data)
            }
        },
    }
}
</script>