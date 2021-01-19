import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        boards: [
            { title: 'Alon GTD project',
              description: 'Building a boards app',
              team: [{name: 'AJ'}, {name: 'KD'}],
              action: 'click route to specific board',
              icon: 'mdi-poll',
              color: 'primary lighten-1',
              lists: [
                {   title: 'To Do',
                    items: [
                        {content: 'Build a todo list'},
                        {content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam nihil quis consequuntur asperiores autem fuga porro aspernatur voluptates iste, inventore praesentium possimus ullam et assumenda consequatur deserunt, numquam accusamus vero?'},
                    ]
                },
                {   title: 'Doing', 
                    items: [
                        {content: 'Working on cards style'},
                        {content: 'Working on todo list'},
                        {content: 'Working on cards style'},
                        {content: 'Working on todo list'}
                    ]
                },
                {   title: 'Done', 
                    items: [
                        {content: 'Writing the lists state'},
                        {content: 'Finish cards style'}
                    ]
                },
                {   title: 'More', 
                    items: [
                        {content: 'More writing the lists state'},
                        {content: 'More Finish cards style'}
                    ]
                },
                {   title: 'extra', 
                    items: [
                        {content: 'extra writing the lists state'},
                        {content: 'extra Finish cards style'}
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
                {   title: 'More', 
                    items: [
                        {content: 'More writing the lists state'},
                        {content: 'More Finish cards style'}
                    ]
                },
                {   title: 'extra', 
                    items: [
                        {content: 'extra writing the lists state'},
                        {content: 'extra Finish cards style'}
                    ]
                },
              ]
            },
        ],
    },
    getters: {
        lists: state => {
            return state.lists
        }
    },
    mutations: {
        addList(state) {
            const newList = {
                title: 'New List', 
                items: []
            }
            state.lists.push(newList)
        },
        addCard(state, listId) {
            const newCard = {
                content: 'new card'
            }
            state.lists[listId].items.push(newCard)
        }
    },
    actions: {
        addList(context) {
            context.commit('addList')
        },
        addCard(context, listId) {
            context.commit('addCard', listId)
        }
    }
})