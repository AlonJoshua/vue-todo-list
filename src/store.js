import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        lists: [
            {   title: 'To Do', 
                items: [
                    {content: 'Build a todo list'},
                    {content: 'Build cards style'}
                ]
            },
            {   title: 'Doing', 
                items: [
                    {content: 'Working on todo list'},
                    {content: 'Working on cards style'}
                ]
            },
            {   title: 'Done', 
                items: [
                    {content: 'Writing the lists state'},
                    {content: 'Finish cards style'}
                ]
            },
        ]
    },
    getters: {
        lists: state => {
            return state.lists
        }
    },
    mutations: {

    },
    actions: {

    }
})