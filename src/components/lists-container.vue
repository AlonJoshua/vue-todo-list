<template>
    <v-container fluid class="">
        <v-row no-gutters class="ml-1">
            <v-col cols="3" class="px-2 " v-for="list in lists" :key="list.title">
                <v-card color="grey lighten-2">
                    <v-container>
                        <v-row>
                            <v-card-title>{{list.title}}</v-card-title>
                            <v-spacer />
                            <v-card-actions>
                                <v-btn text icon>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-container>
                    <v-list color="grey lighten-2">
                        <v-card class="ma-2" v-for="item in list.items" :key="item.content">
                            <list-card-item :content="item.content"></list-card-item>
                        </v-card>
                        <list-card-btn></list-card-btn>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-btn text dark>
                    <v-icon dense>mdi-plus</v-icon>
                    Add another list
                    </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import listCardItem from './list-card-item'
import listCardBtn from './list-card-button'


export default {
    components: {
        listCardItem,
        listCardBtn
    },
    computed: {
    lists() {
      return this.$store.getters.lists
    }
  }
}
</script>

<style>

</style>