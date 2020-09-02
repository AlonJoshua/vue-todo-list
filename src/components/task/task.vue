<template>
    <div class="task-wrapper"
         :class="{ placeholder: details.isHidden }">
        <img 
             class="icon drag-icon"
            :class="{ hidden: details.isHidden, 'is-draggable': details.isDragged }"
             :src="SVGFiles.DRAG"
             draggable="false"
             @mouseover="setIsDragged(true)"
             @mouseleave="setIsDragged(false)"/>
        <textarea class="task-name-textarea"
                  placeholder="task name"
                  v-model="details.name"
                  :class="{ hidden: details.isHidden }" 
                  rows="1"/>
        <div class="status action" 
             v-if="details.status === statuses.OPEN"
             :class="{ hidden: details.isHidden }">
            <img 
                class="icon done-icon"
                :src="SVGFiles.DONE"
                @click="statusChange"/>
            <div class="status-undone" :class="{ hidden: details.isHidden }">
                {{ details.status }}
            </div>
        </div>
        <div
            class="status action"
            :class="{ hidden: details.isHidden }"
            v-else-if="details.status === statuses.DONE">
            <img
                class="icon undo-icon"
                :src="SVGFiles.UNDO"
                @click="statusChange"/>
            <div class="status-done">{{ details.status }}</div>
        </div>
        <div class="action" :class="{ hidden: details.isHidden }">
            <img
                class="icon removeIcon"
                :src="SVGFiles.REMOVE"
                @click="removeTask"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        details: {
            type: Object
        },
        isDropzone: {
            type: Boolean
        }
    },
    data: () => {
        return {
            SVGFiles: {
                PLUS: require("../../assets/plus.svg"),
                DONE: require("../../assets/done.svg"),
                UNDONE: require("../../assets/undone.svg"),
                UNDO: require("../../assets/undo.svg"),
                REMOVE: require("../../assets/remove.svg"),
                DRAG: require("../../assets/drag.svg")
            },
            statuses: {
                OPEN: "Open",
                DONE: "Done",
                ALL: "All",
            },
        };
    },
    methods: {
        statusChange() {
            this.$emit("statusChange");
        },
        removeTask() {
            this.$emit("removeTask");
        },
        setIsDragged(boolean) {
            this.$emit("setIsDragged", boolean);
        },
    }
};
</script>

<style lang="scss" scoped>
.icon {
    display: flex;
    width: 25px;
    height: 25px;
}

.task-wrapper {
    display: flex;
    margin: 8px;
    box-shadow: 0px 0px 3px 0.5px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    padding: 7px;
    height: 30px;
    justify-content: space-evenly;
    align-items: center;
    .drag-icon {
        cursor: pointer;
        transition: 0.25s;
    }
    .is-draggable {
        transition: 0.25s;
        opacity: 0.7;
    }
   
    .task-name-textarea {
        border-radius: 3px;
        display: flex;
        resize: none;
    }
    .status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90px;
        .undo-icon {
            display: flex;
        }
        .status-done {
            color: rgba(23, 161, 23, 1);
            box-shadow: 0px 0px 5px 1px rgba(23, 161, 23, 1);
            border-radius: 4px;
            padding: 5px;
        }
    }
    .action:not(:last-child) {
        margin-right: 10px;
    }
    h3 {
        display: flex;
        word-break: break-word;
    }
    .removeIcon {
        display: flex;
    }
    .hidden {
        opacity: 0.01;
    }
}
.placeholder {
    box-shadow: 0px 0px 3px 0.5px rgba(0, 0, 0, 0.15);
}
</style>
