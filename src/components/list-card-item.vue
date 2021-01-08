<template>
    <v-list-item class="py-2">
        <v-container fluid>
            <v-row>
                <v-spacer></v-spacer>
                <v-hover>
                    <v-icon dense>mdi-pencil-outline</v-icon>
                </v-hover>
            </v-row>
            <v-row>
                <v-list-item-content>
                    {{content}}
                </v-list-item-content>
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