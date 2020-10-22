<template>
    <div class="app-wrapper">
        <main-nav :mainNavData="mainNavData"
                  v-on:dashboardBtnHandler="ChangeToItemView(defaultMainView)">
        </main-nav>
        <div class="side-bars-wrapper">
            <left-bar :leftBarCurrViewData="currBarsView"></left-bar>
            <!-- <middle-line></middle-line> -->
            <right-bar :rightBarCurrViewData="currBarsView"
                       :labels="labels"
                       v-on:addBtnClick="addNewItem"
                       v-on:sortItemsBySelect="sortRightBarViewBySelect($event)"
                       v-on:itemDetailsClickHandler="ChangeToItemView($event)"
                       v-on:doneIconClickHandler="updateItemStatus($event)"
                       v-on:updateItemName="updateItemName($event)"
                       v-on:deleteIconClickHandler="deleteItem($event)"
                       v-on:popupWindowLabelClick="setItemLabel($event)">
            </right-bar>     
        </div>              
    </div>
</template>

<script>
import mainNav from "./containers/main-nav/main-nav.vue";
import leftBar from "./containers/left-side-bar/left-side-bar.vue"
import rightBar from "./containers/right-side-bar/right-side-bar.vue"
// import middleLine from "./components/middle-line/middle-line.vue"
import dataJson from "../data.json";

export default {
    name: "App",
    components: {
        mainNav,
        leftBar,
        rightBar,
        // middleLine
    },
    data: () => {
        return {
            mainNavData: {
                appName: "Tasks management by Alon Joshua",
                homeBtnName: "GTD"
            },
            lastJsonData: dataJson,
            currBarsView: null,
            defaultMainView: null,
            listDefaultName: "tasks",
            itemStatuses: {
                DONE: "Done",
                OPEN: "Open",
                CLOSE: "Close"
            },
            labels: {
                popupTitle: "Add label",
                popupCardsList: [
                    {title: "Good to go", color: "#b04632"},
                    {title: "Sustained", color: "#0079bf"},
                    {title: "Double check", color: "#cd8313"}
                ]
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
        ChangeToItemView(itemData) {
            // change to this item view
            if (!itemData.items) {
                itemData.items = [];
            }
            this.currBarsView = itemData;
        },
        addNewItem() {
            this.currBarsView.items.unshift({
                id: Date.now(),
                name: "",
                status: "Open",
                isHidden: false,
                isDragged: false,
                isSorted: false
            })
        },
        getItemRef(itemId) {
            let itemRef = {
                item: null,
                parent: null,
                index: null
            }
            function recurse (arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === itemId) {
                    itemRef.item = arr[i];
                    itemRef.parent = arr;
                    itemRef.index = i;
                    } else {
                        if (typeof arr[i] === "object" 
                            && Object.prototype.hasOwnProperty.call(arr[i], 'items')) {
                            recurse(arr[i].items);
                        }
                    }
                }
            }
            recurse(this.defaultMainView.items);
            return itemRef;
        },
        updateItemName(updateData) {
            const itemToUpdateRef = this.getItemRef(updateData.itemId);
            itemToUpdateRef.item.name = updateData.newName;
        },
        updateItemStatus(itemData) {
            if (itemData.status === this.itemStatuses.OPEN) {
                itemData.status = this.itemStatuses.DONE;
            } else if (itemData.status === this.itemStatuses.DONE) {
                itemData.status = this.itemStatuses.OPEN;
            }
        },
        sortRightBarViewBySelect(selectValue) {
            if (selectValue === "name") {
                    this.currBarsView.items = this.currBarsView.items.sort((a, b) => {
                            if (a.name < b.name) { return -1 }
                            if (a.name > b.name) { return 1 }
                            return 0;
                    });
                }
        },
        setItemLabel(data) {
            if (!data.item.labels) {
                this.$set(data.item, "labels", []);
                data.item.labels.push(data.$event);
            } else {
                if (data.item.labels.some(label => label.color === data.$event.color)) {
                    const labelIndex = data.item.labels.indexOf(data.$event)
                    data.item.labels.splice(labelIndex, 1);
                } else {
                    data.item.labels.push(data.$event);
                }
            }
        },
        // 
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
        deleteItem(itemData) {
            const itemToDeleteRef = this.getItemRef(itemData.id);
            itemToDeleteRef.parent.splice(itemToDeleteRef.index, 1);
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
        getItemsStatusesCount() {
            let itemsStatusesCount = {
                OPEN: 0,
                CLOSE: 0
            }
            for (let i = 0; i < this.currBarsView.items.length; i++) {
                if (this.currBarsView.items[i].status === "Open") {
                    itemsStatusesCount.OPEN ++;
                }
                else if (this.currBarsView.items[i].status === "Done") {
                    itemsStatusesCount.CLOSE ++;
                }
            }
            return itemsStatusesCount;
        }
    },
    created() {
        if (this.defaultMainView === null) {
            this.defaultMainView = this.lastJsonData;
        }
        if (this.currBarsView === null) {
            this.currBarsView = this.lastJsonData;
        }
        if (this.sortedBarView === null) {
            this.sortedBarView = this.currBarsView;
        }
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

// Backlog:
// 1) Pass current item data as props to right and left bars X
// 2) Create a function that loops through current items list, and returns an object with statuses data. X
// 2.1) Status Icon shows depend on status (In App.vue, pass props through computed that prepared all the data
// for passing it down properly) X
// 3) Build a progress bar that shows how much of the current project view is finished X
// 4) Rebuild CRUD system X