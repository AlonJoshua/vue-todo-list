import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        labels: [
            { content: 'Label...', color: 'green'},
            { content: 'Label...', color: 'yellow'},
            { content: 'Label...', color: 'orange'},
            { content: 'Label...', color: 'red'},
            { content: 'Label...', color: 'purple'},
            { content: 'Label...', color: 'blue'},
            { content: 'Label...', color: 'indigo'}
        ],
        boards: [
            { 
                title: 'Alon GTD project',
                id: 123,
                description: 'Building a boards app',
                team: [{name: 'AJ'}, {name: 'KD'}],
                icon: 'mdi-poll',
                color: 'primary lighten-1',
                lists: [
                    {   
                        title: 'To Do',
                        items: [
                            {
                                content: 'Build a todo list', 
                                labels: []
                            },
                            {
                                content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam nihil quis consequuntur asperiores autem fuga porro aspernatur voluptates iste, inventore praesentium possimus ullam et assumenda consequatur deserunt, numquam accusamus vero?',
                                labels: []
                            },
                        ]
                    },
                    {   
                        title: 'Doing', 
                        items: [
                            {
                                content: 'Working on cards style',
                                labels: []
                            },
                        ]
                    },
                    {   
                        title: 'Done', 
                        items: [
                            {
                                content: 'Writing the lists state',
                                labels: []
                            },
                            {
                                content: 'Finish cards style',
                                labels: []
                            }
                        ]
                    },
                ]
            },
        ],
    },
    getters: {
        getBoardsList: (state) => {
            return state.boards
        },
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
        },
        getLabels: (state) => {
            return state.labels
        }
    },
    mutations: {
        addNewBoard(state, board) {
            state.boards.push(board)
        },
        addNewListToBoard(state, data) {
            data.board.lists.push(data.list)
        },
        addNewCardToList(state, data) {
            data.list.items.push(data.cardItem)
        },
        editCardContent(state, data) {
            data.card.content = data.textareaValue
        },
        insertCard(state, data) {
            data.list.items.splice(data.cardIdsObj.cardIndex, 0, data.card)
        },
        deleteCard(state, data) {
            data.list.items.splice(data.cardIndex, 1)
        }
    },
    actions: {
        addNewBoard({commit}, board) {
            commit('addNewBoard', board)
        },
        addNewListToBoard({ getters, commit }, data) {
            data.board = getters.getBoard(data.boardId),
            commit('addNewListToBoard', data)
        },
        addNewCardToList({ getters, commit }, data) {
            data.list = getters.getList(data.idsObj),
            commit('addNewCardToList', data)
        },
        editCardContent({ getters, commit }, data) {
            data.card = getters.getListCardItem(data.idsObj)
            commit('editCardContent', data)
        },
        insertCard({ getters, commit }, data) {
            data.list = getters.getList(data.cardIdsObj)
            commit('insertCard', data)
        },
        deleteCard({ getters, commit }, data) {
            data.list = getters.getList(data)
            commit('deleteCard', data)
        }
    }
})