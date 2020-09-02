<template>
    <div class="list-manu-wrapper">
        <label class="list-title"
             contenteditable="true"
             @input="changeListName"> 
             {{list.name}} 
        </label>
        <div class="options-bar">
            <div class="add-task-btn">
                {{ taskBtn.title }}
                <img class="add-icon"
                     :src="SVGFiles.PLUS" 
                     @click="addNewTask" />
            </div>
            <div class="select-wrapper">
                <label for="sorting">{{ sortOptions.name }}</label>
                <select name="status view"
                        @change="setListView">
                        <option v-for="(option, index) in sortOptions.options"
                                :key="index"
                                :value="option.name">
                                {{ option.name }}
                        </option>
                </select>
            </div>
            <div class="delete-list-btn">
                <img class="delete-list-icon" 
                     :src="SVGFiles.DELETELIST"
                     @click="deleteList" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        list: {
            type: Object
        },
        sortOptions: {
            type: Object
        }
    },
    data() {
        return {
            taskBtn: {
                title: "Add task"
            },
            SVGFiles: {
                PLUS: require("../../assets/plus.svg"),
                DELETELIST: require("../../assets/trash.svg")
            },
        }
    },
    methods: {
        addNewTask() {
            this.$emit("addNewTask");
        },
        setListView(event) {
            this.$emit("setListView", event.target.value);
        },
        deleteList() {
            this.$emit("deleteList");
        },
        changeListName(event) {
            this.$emit('changeListName', event.target.innerText)
        }
    }
}
</script>

<style lang="scss" scoped>
.list-manu-wrapper {
    .list-title {
        display: inline-block;
    }
    .list-title:focus {
        outline: 0px solid transparent;
    }
    .options-bar {
        display: flex;
        margin: 8px;
        box-shadow: 0px 0px 3px 0.5px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 7px;
        height: 30px;
        justify-content: space-evenly;
        align-items: center;
        .add-task-btn {
            display: flex;
            width: 110px;
            justify-content: space-evenly;
            align-items: center;
            .add-icon {
                display: flex;
                width: 25px;
                height: 25px;
                cursor: pointer;
                transition: 0.3s;
            }
            .add-icon:hover {
                opacity: 0.5;
                transition: 0.7s;
            }
        }
        .select-wrapper {
        display: flex;
        width: 150px;
        justify-content: space-evenly;
        }
        .delete-list-btn {
            .delete-list-icon{
                width: 25px;
                margin-right: -12px;
            }
        }
    }
}
</style>