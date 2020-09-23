<template>
    <div class="app-wrapper">
        <main-nav :mainNavData="mainNavData"> </main-nav>
        <div class="side-bars-wrapper">
            <left-bar :currentViewData="currentViewData"></left-bar>
            <middle-line></middle-line>
            <right-bar :currentViewData="currentViewData"
                       :sortOptions="sortOptions">
            </right-bar>     
        </div>              
        <div class="lists-container">
            <list v-show="!lists"
                  v-for="(list, index) in lists"
                  :key="index"
                  :list="list"
                  :sortOptions="sortOptions"
                  
                  v-on:addNewTask="addNewTask($event)"
                  v-on:setListView="setListView($event)"
                  v-on:changeListName="changeListName($event, list)"
                  v-on:deleteList="deleteList(index)"
                  v-on:statusChange="statusChange($event)"
                  v-on:removeTask="removeTask($event, list)"
                  v-on:setIsDragged="setIsDragged($event)"
                  v-on:dragStartHandler="dragStartHandler($event, list)"
                  v-on:dragEnterHandler="dragEnterHandler({$event, list})"
                  v-on:dragLeaveHandler="dragLeaveHandler($event)"
                  v-on:dropHandler="dropHandler"
                  v-on:dragEndHandler="dragEndHandler">
            </list>
            <new-list-option v-show="!lists" v-on:addNewList="addNewList"></new-list-option>
        </div>
    </div>
</template>

<script>
import list from "./containers/list/list.vue";
import newListOption from "./components/new-list-option/new-list-option.vue"
import mainNav from "./containers/main-nav/main-nav.vue";
import leftBar from "./containers/left-side-bar/left-side-bar.vue"
import rightBar from "./containers/right-side-bar/right-side-bar.vue"
import middleLine from "./components/middle-line/middle-line.vue"
import dataJson from "../data.json";

export default {
    name: "App",
    components: {
        list,
        newListOption,
        mainNav,
        leftBar,
        rightBar,
        middleLine
    },
    data: () => {
        return {
            mainNavData: {
                appName: "Tasks management by Alon Joshua",
                homeBtnName: "Dashboard"
            },
            currentViewData: dataJson.lists,
            lists: dataJson.lists,
            listDefaultName: "tasks",
            sortOptions: {
                name: "sort by",
                options: [
                    { name: "All" },
                    { name: "Open" },
                    { name: "Done" }
                ],
                originalTasksList: null,
                sortedTasksMap: null,
                firstTimeSort: true
            },
            taskStatuses: {
                DONE: "Done",
                OPEN: "Open",
                CLOSE: "Close"
            },
            currDraggedEl: null,
            currDragOverEl: null,
            draggingPlaceholer: null,
            SVGFiles: {
                PLUS: require("./assets/plus.svg"),
                DONE: require("./assets/done.svg"),
                UNDONE: require("./assets/undone.svg"),
                UNDO: require("./assets/undo.svg"),
                REMOVE: require("./assets/remove.svg"),
                DRAG: require("./assets/drag.svg")
            },
        };
    },
    methods: {
        ChangeToItemView() {
            // change to this item view
        },
        addNewTask(list) {
            list.tasks.unshift({
                id: Date.now(),
                name: "",
                status: "Open",
                isHidden: false,
                isDragged: false,
                isSorted: false
            })
        },
        removeTask(task, list) {
            list.tasks.splice(this.findtaskIndex(list.id, task.id), 1);
        },
        statusChange(task) {
            if (task.status === this.taskStatuses.OPEN) {
                task.status = this.taskStatuses.DONE;
            } else if (task.status === this.taskStatuses.DONE) {
                task.status = this.taskStatuses.OPEN;
            }
        },
        setListView(data) {
            if (data.view === "All") {
                data.list.tasks.forEach(t => t.isSorted = false);
            } else {
                data.list.tasks.forEach(t => {
                    t.isSorted = false;
                    if (t.status !== data.view) {
                        t.isSorted = true;
                    }
                });
            }
        },
        addNewList() {
            this.lists.push({
                id: Date.now(),
                name: "Tasks",
                tasks: []
            });
        },
        changeListName(value, list) {
            if (!value) {
                list.name = this.listDefaultName;
            } else {
                list.name = value;
            }
        },
        deleteList(index) {
            console.log("index: ", index);
            console.log("list: ", this.lists[index]);
            this.lists.splice(index, 1);
        },
        findListIndex(id) {
            return this.lists.findIndex(l => l.id === id)
        },
        findtaskIndex(listId, taskId) {
          return this.lists[this.findListIndex(listId)]
                 .tasks.findIndex(t => t.id === taskId);
        },
        setIsDragged(data) {
            data.task.isDragged = data.$event;
        },
        dragStartHandler(task, list) {
            this.currDraggedEl = {
                srcList: list,
                srcTask: task,
                taskIndex: this.findtaskIndex(list.id, task.id),
                clonedTask: Object.assign({}, task)
            };
        },
        dragEnterHandler(data) {
            if (data.$event.$event.srcElement.className === "icon drag-icon") {
                if (data.$event.task === this.currDraggedEl.srcTask) {
                    data.$event.task.isHidden = true;
                } else if (data.$event.task !== this.currDraggedEl.srcTask) {
                    this.currDragOverEl = {
                        currList: data.list, 
                        srcTask: data.$event.task,
                        taskIndex: this.findtaskIndex(data.list.id, data.$event.task.id),
                        clonedTask: Object.assign({}, data.$event.task)
                    };
                    this.currDraggedEl.srcList.tasks.splice(
                        this.currDraggedEl.taskIndex,
                        1,
                        this.currDragOverEl.clonedTask
                    )
                    this.currDragOverEl.currList.tasks.splice(
                        this.currDragOverEl.taskIndex,
                        1,
                        this.currDraggedEl.clonedTask
                    )
                    this.currDragOverEl.currList.tasks[this.currDragOverEl.taskIndex].isHidden = true;
                }
            }
        },
        dragLeaveHandler() {
            if (this.currDragOverEl !== null) {
                this.currDraggedEl.srcList.tasks.splice(
                    this.currDraggedEl.taskIndex,
                    1,
                    this.currDraggedEl.clonedTask
                )
                this.currDragOverEl.currList.tasks.splice(
                    this.currDragOverEl.taskIndex,
                    1,
                    this.currDragOverEl.clonedTask
                )
            } else {
                this.currDraggedEl.srcList.tasks[this.currDraggedEl.taskIndex].isHidden = true;
            }
        },
        dropHandler() {
        },
        dragEndHandler() {
            this.currDraggedEl.srcList.tasks[this.currDraggedEl.taskIndex].isHidden = false;
            if (this.currDragOverEl !== null) {
                this.currDragOverEl.currList.tasks[this.currDragOverEl.taskIndex].isHidden = false;
            }
            this.currDraggedEl = null;
            this.currDragOverEl = null;
        }
    },
    computed: {
    }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap');
.app-wrapper {
    display: flex;
    font-family: 'Roboto', sans-serif;;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background-color:	rgb(242, 243, 245);
    .side-bars-wrapper {
        display: flex;
        justify-content: space-evenly;
    }
    .lists-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        flex: 0 0 33.333%;
    }
}
</style>
