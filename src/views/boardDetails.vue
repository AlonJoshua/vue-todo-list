<template>
    <v-container fluid>
        <h1>board</h1>
        <!-- <v-row no-gutters class="ml-1">
            <v-col cols="3" class="px-2 mb-3" v-for="(list, index) in lists" :key="index">
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
                        <v-card class="ma-2" v-for="(item, index) in list.items" :key="index">
                            <list-card-item :content="item.content"></list-card-item>
                        </v-card>
                        <list-card-btn :listId="index" />
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="3" class="text-center px-2">
                <addListBtn />
            </v-col>
        </v-row> -->
    </v-container>
</template>

<script>
// import listCardItem from '@/components/list-card-item'
// import listCardBtn from '@/components/list-card-button'
// import addListBtn from '@/components/lists-container-btn'


export default {
    components: {
        // listCardItem,
        // listCardBtn,
        // addListBtn
    },
    computed: {
    board() {
      return this.$store.getters.board()
    }
  }
}
</script>

<style>

</style>