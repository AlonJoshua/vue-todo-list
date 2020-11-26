<template>
    <div class="app-wrapper">
        <main-nav :mainNavData="mainNavData"
                  @dashboardBtnHandler="ChangeToItemView(defaultMainView)">
        </main-nav>
        <div class="side-bars-wrapper">
            <left-bar :currBarsView="currBarsView"
                      :leftBarDoneItems="leftBarDoneItems"
                      :itemStatuses="itemStatuses"
                       @itemDragStart="dragStartHandler($event)"
                       @itemDrag="itemDragHandler($event)"
                       @itemDragEnter="itemDragEnterHandler($event)"
                       @itemDrop="itemDropHandler($event)"
                       @itemDragEnd="dragEndHandler">
            </left-bar>
            <right-bar :rightBarCurrViewData="rightBarItems"
                       :dragDropData="dragDropData"
                       :labels="labels"
                       :sortSelectData="sortSelectData"
                       :itemStatuses="itemStatuses"
                       @addBtnClick="addNewItem"
                       @sortItemsBySelect="sortRightBarViewBySelect($event)"
                       @itemDetailsClickHandler="ChangeToItemView($event)"
                       @doneIconClickHandler="updateItemStatus($event)"
                       @updateItemName="updateItemName($event)"
                       @deleteIconClickHandler="deleteItem($event)"
                       @popupWindowLabelClick="setItemLabel($event)"
                       @itemDragStart="dragStartHandler($event)"
                       @itemDrag="itemDragHandler($event)"
                       @itemDragEnter="itemDragEnterHandler($event)"
                       @itemDrop="itemDropHandler($event)"
                       @itemDragEnd="dragEndHandler">
            </right-bar>     
        </div>              
    </div>
</template>

<script>
import mainNav from "./containers/main-nav/main-nav.vue";
import leftBar from "./containers/left-side-bar/left-side-bar.vue"
import rightBar from "./containers/right-side-bar/right-side-bar.vue"
import dataJson from "../data.json";

export default {
    name: "App",
    components: {
        mainNav,
        leftBar,
        rightBar,
    },
    data: () => {
        return {
            mainNavData: {
                appName: "Tasks management by Alon Joshua",
                homeBtnName: "GTD"
            },
            lastJsonData: dataJson,
            defaultMainView: null,
            currBarsView: null,
            rightBarItems: null,
            leftBarDoneItems: null,
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
        },
        getItemRef(itemId, list) {
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
            recurse(list);
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
        deleteItem(itemData) {
            const itemToDeleteRef = this.getItemRef(itemData.id);
            itemToDeleteRef.parent.splice(itemToDeleteRef.index, 1);
        },
        dragStartHandler(data) {
            this.dragDropData.currDraggedEl = this.getItemRef(data.itemData.id , data.listData);
            this.dragDropData.currDraggedClone = data.event.srcElement.cloneNode(true);
            this.dragDropData.dragTransparentDiv = document.createElement('div');
            this.dragDropData.currDraggedClone.style.transform = "rotate(5deg)";
            this.dragDropData.currDraggedClone.style.position = "absolute";
            this.dragDropData.currDraggedClone.style.backgroundColor = "white";
            this.replaceItemInList(
                this.dragDropData.currDraggedEl.parent,
                this.dragDropData.currDraggedEl.index,
                this.dragDropData.placeholderEl
            );
            this.dragDropData.currPlaceholder = this.getItemRef(
                this.dragDropData.placeholderEl.id,
                data.listData
                );
            document.body.appendChild(this.dragDropData.dragTransparentDiv);
            document.body.appendChild(this.dragDropData.currDraggedClone);
            event.dataTransfer.setDragImage(this.dragDropData.dragTransparentDiv, 0, 0);
        },
        itemDragHandler(event) {
            // console.log("drag");
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
            this.dragDropData.currDragOverEl = this.getItemRef(data.itemData.id, data.listData);
            if (data.itemData.id !== this.dragDropData.currPlaceholder.id) {
                this.removeItemFromList(
                this.dragDropData.currPlaceholder.parent,
                this.dragDropData.currPlaceholder.index
                );
                this.addItemToList(
                    this.dragDropData.currDragOverEl.parent,
                    this.dragDropData.currDragOverEl.index,
                    this.dragDropData.placeholderEl
                );
                this.dragDropData.currPlaceholder = this.getItemRef(
                this.dragDropData.placeholderEl.id,
                data.listData
                );
            }
        },
        itemDropHandler(data) {
            this.dragDropData.isItemDroppedOnDropzone = true;
            this.dragDropData.currPlaceholder = this.getItemRef(
                this.dragDropData.placeholderEl.id,
                data.listData
                );
            this.replaceItemInList(
                this.dragDropData.currPlaceholder.parent,
                this.dragDropData.currPlaceholder.index,
                this.dragDropData.currDraggedEl.item
            )
        },
        dragEndHandler(data) {
            this.dragDropData.currPlaceholder = this.getItemRef(
                this.dragDropData.placeholderEl.id,
                data.listData
                );
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
            // this.currBarsView = Object.assign({}, this.defaultMainView);
        }
    },
    created() {
        if (this.defaultMainView === null) {
            this.defaultMainView = this.lastJsonData;
        }
        if (this.currBarsView === null) {
            this.currBarsView = JSON.parse(JSON.stringify(this.defaultMainView));
            this.rightBarItems = JSON.parse(JSON.stringify(
                this.currBarsView.items.filter(i => i.status === this.itemStatuses.OPEN)
                ));
            this.leftBarDoneItems = JSON.parse(JSON.stringify(
                this.currBarsView.items.filter(i => i.status === this.itemStatuses.DONE)
                ));
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