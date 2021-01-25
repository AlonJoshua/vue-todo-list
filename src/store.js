import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        boards: [
            { 
                title: 'Alon GTD project',
                id: 123,
                description: 'Building a boards app',
                team: [{name: 'AJ'}, {name: 'KD'}],
                action: 'click route to specific board',
                icon: 'mdi-poll',
                color: 'primary lighten-1',
                lists: [
                    {   
                        title: 'To Do',
                        items: [
                            {content: 'Build a todo list'},
                            {content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam nihil quis consequuntur asperiores autem fuga porro aspernatur voluptates iste, inventore praesentium possimus ullam et assumenda consequatur deserunt, numquam accusamus vero?'},
                        ]
                    },
                    {   
                        title: 'Doing', 
                        items: [
                            {content: 'Working on cards style'},
                            {content: 'Working on todo list'},
                            {content: 'Working on cards style'},
                            {content: 'Working on todo list'}
                        ]
                    },
                    {   
                        title: 'Done', 
                        items: [
                            {content: 'Writing the lists state'},
                            {content: 'Finish cards style'}
                        ]
                    },
                    {   
                        title: 'More', 
                        items: [
                            {content: 'More writing the lists state'},
                            {content: 'More Finish cards style'}
                        ]
                    },
                    {   
                        title: 'extra', 
                        items: [
                            {content: 'extra writing the lists state'},
                            {content: 'extra Finish cards style'}
                        ]
                    },
                    {   
                        title: 'Doing', 
                        items: [
                            {content: 'Working on todo list'},
                            {content: 'Working on cards style'}
                        ]
                    },
                    {   
                        title: 'Done', 
                        items: [
                            {content: 'Writing the lists state'},
                            {content: 'Finish cards style'}
                        ]
                    },
                    {   
                        title: 'More', 
                        items: [
                            {content: 'More writing the lists state'},
                            {content: 'More Finish cards style'}
                        ]
                    },
                    {   
                        title: 'extra', 
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
        getBoard: (state) => (boardId) => {
            return state.boards.find(board => board.id === parseInt(boardId))
        },
        getList: (state, getters) => (idsObj) => {
            const board = getters.getBoard(idsObj.boardId)
            return board.lists.find(list => board.lists.indexOf(list) === idsObj.listIndex)
        },
        getListCardItem: (state, getters) => (idsObj) => {
            const list = getters.getList(idsObj)
            return list.items.find(item => list.items.indexOf(item) === idsObj.cardIndex)
        }
    },
    mutations: {
        addNewListToBoard(state, data) {
            data.board.lists.push(data.list)
        },
        addNewCardToList(state, data) {
            data.list.items.push(data.cardItem)
        },
        editCardContent(state, data) {
            data.card.content = data.textareaValue
        }
    },
    actions: {
        addNewListToBoard({ getters, commit }, boardId) {
            const data = {
                board: getters.getBoard(boardId),
                list: { title: 'New List', items: [] }
            }
            commit('addNewListToBoard', data)
        },
        addNewCardToList({ getters, commit }, idsObj) {
            const data = {
                list: getters.getList(idsObj),
                cardItem: { content: 'new item...' }
            }
            commit('addNewCardToList', data)
        },
        editCardContent({ getters, commit }, data) {
            data.card = getters.getListCardItem(data.idsObj)
            commit('editCardContent', data)
        }
    }
})