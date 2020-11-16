<template>
    <div class="app-wrapper">
        <main-nav :mainNavData="mainNavData"
                  v-on:dashboardBtnHandler="ChangeToItemView(defaultMainView)">
        </main-nav>
        <div class="side-bars-wrapper">
            <left-bar :leftBarCurrViewData="currBarsView"
                      :itemStatuses="itemStatuses"></left-bar>
            <!-- <middle-line></middle-line> -->
            <right-bar :rightBarCurrViewData="currBarsView"
                       :dragDropData="dragDropData"
                       :labels="labels"
                       :sortSelectData="sortSelectData"
                       v-on:addBtnClick="addNewItem"
                       v-on:sortItemsBySelect="sortRightBarViewBySelect($event)"
                       v-on:itemDetailsClickHandler="ChangeToItemView($event)"
                       v-on:doneIconClickHandler="updateItemStatus($event)"
                       v-on:updateItemName="updateItemName($event)"
                       v-on:deleteIconClickHandler="deleteItem($event)"
                       v-on:popupWindowLabelClick="setItemLabel($event)"
                       @itemDragStart="dragStartHandler($event)"
                       v-on:itemDrag="itemDragHandler($event)"
                       v-on:itemDragEnter="itemDragEnterHandler($event)"
                       v-on:itemDragLeave="itemDragLeaveHandler($event)"
                       v-on:itemDrop="itemDropHandler($event)"
                       v-on:itemDragEnd="dragEndHandler">
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
            sortSelectData: {
                defaultText: " -- Sort by -- ",
                options: {
                DATENEW: "Date Created (Newest First)",
                DATEOLD: "Date Created (Oldest First)",
                NAME: "Name (Alphabetically)",
                }
            },
            dragDropData: {
                currDraggedEl: null,
                currDragOverEl: null,
                currDragLeaveEl: null,
                currDraggedClone: null,
                currPlaceholder: null,
                dragTransparentDiv: null,
                placeholderEl: {
                    id: "placeholder",
                    name: "placeholder",
                    isHidden: true
                },
                isItemDroppedOnDropzone: false,
                cursorHistory: {x: null, y: null}
            },
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
                isSorted: false,
                dateCreated: JSON.stringify(Date.now())
            })
            console.log(this.currBarsView.items);
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
        addItemToList(list, index, item) {
            list.splice(index, 0, item);
        },
        replaceItemInList(list, index, item) {
            this.$set(list, index, item);
        },
        removeItemFromList(list, index) {
            list.splice(index, 1);
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
            let reversed = false;
            const getValue = (obj, objKey) => {
                for (let [key, value] of Object.entries(obj)) {
                    if (key === objKey) {
                        return value;
                    }
                }
            };
            const sortDataBy = (Objkey) => {
                this.currBarsView.items = this.currBarsView.items.sort((a, b) => {
                    if (reversed) {
                        if (getValue(a, Objkey) < getValue(b, Objkey)) { return 1 }
                        if (getValue(a, Objkey) > getValue(b, Objkey)) { return -1 }
                        return 0;
                    } else {
                        if (getValue(a, Objkey) < getValue(b, Objkey)) { return -1 }
                        if (getValue(a, Objkey) > getValue(b, Objkey)) { return 1 }
                        return 0;
                    }
                });
            }
            switch(selectValue) {
                case this.sortSelectData.options.NAME:
                    sortDataBy("name");       
                    break;        
                case this.sortSelectData.options.DATENEW:
                    sortDataBy("dateCreated"); 
                    break;    
                case this.sortSelectData.options.DATEOLD:
                    reversed = true;
                    sortDataBy("dateCreated"); 
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
        dragStartHandler(data) {
            this.dragDropData.currDraggedEl = this.getItemRef(data.itemData.id);
            this.dragDropData.currDraggedClone = data.event.srcElement.cloneNode(true);
            this.dragDropData.dragTransparentDiv = document.createElement('div');
            this.dragDropData.currDraggedClone.style.transform = "rotate(5deg)";
            this.dragDropData.currDraggedClone.style.position = "absolute";
            this.dragDropData.currDraggedClone.style.backgroundColor = "white";
            this.replaceItemInList(
                this.dragDropData.currDraggedEl.parent,
                this.dragDropData.currDraggedEl.index,
                this.dragDropData.placeholderEl
            )
            document.body.appendChild(this.dragDropData.dragTransparentDiv);
            document.body.appendChild(this.dragDropData.currDraggedClone);
            event.dataTransfer.setDragImage(this.dragDropData.dragTransparentDiv, 0, 0);
        },
        itemDragHandler(event) {
            if (event.pageX === 0 & event.pageY === 0) {
                this.dragDropData.currDraggedClone.style.left = this.dragDropData.cursorHistory.x; 
               this.dragDropData.currDraggedClone.style.top = this.dragDropData.cursorHistory.y;
            } else {
                this.dragDropData.currDraggedClone.style.left = event.pageX + 'px'; 
                this.dragDropData.currDraggedClone.style.top = event.pageY + 'px';
                this.dragDropData.cursorHistory.x = event.pageX + 'px';
                this.dragDropData.cursorHistory.y = event.pageY + 'px';
            }
        },
        itemDragEnterHandler(data) {
            this.dragDropData.currPlaceholder = this.getItemRef(this.dragDropData.placeholderEl.id);
            this.dragDropData.currDragOverEl = this.getItemRef(data.id);
            if (data.id !== this.dragDropData.currPlaceholder.id) {
                this.removeItemFromList(
                this.dragDropData.currDraggedEl.parent,
                this.dragDropData.currPlaceholder.index
                );
                this.addItemToList(
                    this.dragDropData.currDragOverEl.parent,
                    this.dragDropData.currDragOverEl.index,
                    this.dragDropData.placeholderEl
                );           
            }
        },
        itemDragLeaveHandler() {
            // this.dragDropData.currDragLeaveEl = this.getItemRef(data.id);
            // if (this.dragDropData.currDragLeaveEl.item === this.dragDropData.placeholderEl) {
            //     this.replaceItemInList(
            //         this.dragDropData.currDragLeaveEl.parent,
            //         this.dragDropData.currDragLeaveEl.index,
            //         this.dragDropData.currDragOverEl.item
            //     )
            // }
        },
        itemDropHandler() {
            this.dragDropData.isItemDroppedOnDropzone = true;
            this.dragDropData.currPlaceholder = this.getItemRef(this.dragDropData.placeholderEl.id);
            this.replaceItemInList(
                this.dragDropData.currPlaceholder.parent,
                this.dragDropData.currPlaceholder.index,
                this.dragDropData.currDraggedEl.item
            )
        },
        dragEndHandler() {
            this.dragDropData.currPlaceholder = this.getItemRef(this.dragDropData.placeholderEl.id);
            if (!this.dragDropData.isItemDroppedOnDropzone) {
                this.replaceItemInList(
                this.dragDropData.currPlaceholder.parent,
                this.dragDropData.currPlaceholder.index,
                this.dragDropData.currDraggedEl.item
                )
            }
            document.body.removeChild(this.dragDropData.currDraggedClone);
            this.dragDropData.currDraggedClone = null;
            this.dragDropData.isItemDroppedOnDropzone = false;
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