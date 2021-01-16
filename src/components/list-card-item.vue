<template>
    <v-list-item class="py-2" selectable>
        <v-container fluid>
            <v-row>
                <v-list-item-content>
                    {{content}}
                </v-list-item-content>
                  <v-hover>
                    <v-btn text icon>
                        <v-icon dense>mdi-pencil-outline</v-icon>
                    </v-btn>
                </v-hover>
            </v-row>
        </v-container>
    </v-list-item>
</template>

<script>
export default {
    props: {
        content: {
            type: String
        }
    },
    date() {
        return {
            editable: false
        }
    }
}
</script>

<style>

</style>