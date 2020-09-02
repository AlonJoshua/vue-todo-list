<template>
    <div class="list-container">
        <listMenu :list="list" 
                  :sortOptions="sortOptions"
                  v-on:addNewTask="addNewTask(list)"
                  v-on:setListView="setListView($event, list)"
                  v-on:changeListName="changeListName($event)"
                  v-on:deleteList="deleteList">
        </listMenu>
        <div class="task-drag-wrapper"
             :class="{ sorted: task.isSorted }"
             v-for="(task, index) in list.tasks" 
            :key="index"
            :id="task.id"
            :draggable="task.isDragged"
            v-on:dragstart="dragStartHandler(task)"
            v-on:dragenter="dragEnterHandler({$event, task})"
            v-on:dragLeaveHandler="dragLeaveHandler($event)"
            v-on:dragleave.self="dragLeaveHandler"
            v-on:drop="dropHandler"
            v-on:dragend="dragEndHandler"
            >
            <task
                :details="task"
                :class="{ placeholder: task.isHidden }"
                v-on:setIsDragged="setIsDragged({task, $event})"
                :hidden="task.isHidden"

                v-on:removeTask="removeTask(task)"
                v-on:statusChange="statusChange(task)"
            >
            </task>
        </div>
    </div>
</template>

<script>
import task from "../../components/task/task.vue"
import listMenu from "../../components/list-menu/list-menu.vue"

export default {
    components: {
        task,
        listMenu
    },
    props: {
        list: {
            type: Object
        },
        sortOptions: {
            type: Object
        }
    },
    data: () => {
        return {};
    },
    methods: {
        addNewTask(list) {
            this.$emit("addNewTask", list);
        },
        statusChange(task) {
            this.$emit("statusChange", task);
        },
        removeTask(task) {
            this.$emit("removeTask", task);
        },
        setListView(view, list) {
            this.$emit("setListView", {view, list});
        },
        changeListName(value) {
            this.$emit("changeListName", value);
        },
        deleteList() {
            this.$emit("deleteList");
        },
        setIsDragged(data) {
            this.$emit("setIsDragged", data);
        },
        dragStartHandler(task) {
            this.$emit("dragStartHandler", task);
        },
        dragEnterHandler(data) {
            data.$event.preventDefault();
            this.$emit("dragEnterHandler", data);
        },
        dragLeaveHandler() {
            this.$emit("dragLeaveHandler");
        },
        dropHandler(event) {
            event.preventDefault();
            this.$emit("dropHandler");
        },
        dragEndHandler() {
            this.$emit("dragEndHandler");
        }
    },
    computed: {}
};
</script>

<style lang="scss" scoped>
@import "./list.scss";
</style>
