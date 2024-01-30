<script setup>
import { computed, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import Tag from '@/components/Tag.vue';

///////////////////////////////////////////////
// IDs to be used for the respective DOM elements in the template
///////////////////////////////////////////////

const MODAL_ID = 'modalRoot' // for the modal's root element
const MODAL_SELECT_COLUMN_ID = 'modalSelectColumn' // for the selector in the modal's header
const MODAL_BUTTON_X_ID = 'modalButtonX'
const MODAL_INPUT_TITLE_ID = 'modalInputTitle' // for the input where users enter the task's title
const MODAL_HELPER_TITLE_ID = 'modalHelperTitle' // for the helper showing the length of entered title
const MODAL_INPUT_TEXT_ID = 'modalInputText' // for the textarea where users enter the task's description
const MODAL_DROPDOWN_TRIGGER_ID = 'modalDropdownTrigger' // for the button that toggles the tag selection dropdown
const MODAL_DROPDOWN_MENU_ID = 'modalDropdownMenu' // for the root element of the tag selection dropdown's menu
const MODAL_CHECKBOX_BASE_ID = 'modalCheckbox' // base string for the checkboxes in the dropdown, concatenate with the respective tag's name
const MODAL_BUTTON_CANCEL = 'modalButtonCancel' // for the modal's cancel button
const MODAL_BUTTON_SUBMIT = 'modalButtonSubmit' // for the modal's submit button

///////////////////////////////////////////////
// Your implementation below
///////////////////////////////////////////////

// declare props
const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
})

// declare emits
const emit = defineEmits([
    'createTask',
    'editTask'
])

// declare exposed methods
defineExpose({ showModal })

// reactive variables that are modified by the UI
const taskColumn = ref(0)
const taskId = ref('')
const taskTitle = ref('')
const taskText = ref('')
const taskTags = computed(
    () => props.tags.map(t =>
        ref({
            name: t,
            selected: false
        })
    )
)

const mode = ref('create')

// the modal doesn't need to be reactive because we only access it in the script block
let modal = null

/**
 * Instantiates a Bootstrap Modal object and binds it to the corresponding DOM element via modalId.
 */
function createModal() {
    modal = new Modal('#' + MODAL_ID)
}

/**
 * Wrapper for Bootstrap's Modal.show() that is exposed so that external components can toggle the modal.
 * Resets the task value before opening the modal so that user can start fresh every time.
 */
function showModal(task) {

    if(task == null) {
        // reset the task values
        taskColumn.value = 0
        taskId.value = ''
        taskTitle.value = ''
        taskText.value = ''
        taskTags.value.forEach(t => t.value.selected = false)
        mode.value = 'Create'
    } else {
        // set the task values to the values of the task to be edited
        taskColumn.value = 0
        taskId.value = task.id
        taskTitle.value = task.title
        taskText.value = task.text
        taskTags.value.forEach(t => t.value.selected = task.tags.includes(t.value.name))
        mode.value = 'Edit'
    }

    modal.show()
}

/**
 * Emits a createTask event with the current task properties and closes the modal.
 */
function submitModal() {
    if(mode.value === 'Edit') {
        emit(
            'editTask',
            taskId.value,
            taskTitle.value,
            taskText.value,
            taskTags.value.filter(t => t.value.selected).map(t => t.value.name)
        )
    } else {
        emit(
            'createTask',
            taskColumn.value,
            taskTitle.value,
            taskText.value,
            taskTags.value.filter(t => t.value.selected).map(t => t.value.name)
        )
    }

    closeModal()
}

/**
 * Wrapper for Bootstrap's Modal.hide().
 */
function closeModal() {
    modal.hide()
}

/**
 * Returns the modal's title depending on the current mode.
 */
function getModalTitle() {
    const trailing = mode.value !== 'Edit' ? ' task in' : ' task'
    return mode.value + trailing
}

// call createModal() as soon as the component is mounted
onMounted(createModal)
</script>

<template>
    <div class="modal" :id="MODAL_ID" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Header of the modal containing the modal's headline and the column selector for the task -->
                <div class="modal-header">
                    <h5 class="modal-title me-3">{{getModalTitle()}}</h5>
                    <div class="d-inline-block" v-if="mode !== 'Edit'">
                        <select :id="MODAL_SELECT_COLUMN_ID" class="form-select" aria-label="Default select example" v-model="taskColumn">
                            <option v-for="col in columns" :value="col.id" :selected="col.id === taskColumn">{{col.name}}</option>
                        </select>
                    </div>
                    <button :id="MODAL_BUTTON_X_ID" type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>

                <!-- Body of the modal containing inputs for the task's title, text and tags -->
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label :for="MODAL_INPUT_TITLE_ID" class="form-label">Task Title</label>
                            <input :id="MODAL_INPUT_TITLE_ID" v-model="taskTitle" type="text" class="form-control" :aria-describedby="MODAL_HELPER_TITLE_ID" maxlength="50">
                            <div :id="MODAL_HELPER_TITLE_ID" class="form-text">{{ taskTitle.length }}/50 characters</div>
                        </div>
                        <div class="mb-3">
                            <label :for="MODAL_INPUT_TEXT_ID" class="form-label">Task Description</label>
                            <textarea :id="MODAL_INPUT_TEXT_ID" v-model="taskText" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="mb-0">
                            <div class="dropdown">
                                <a :id="MODAL_DROPDOWN_TRIGGER_ID" class="btn btn-outline-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    Select tags
                                </a>

                                <ul :id="MODAL_DROPDOWN_MENU_ID" class="dropdown-menu">
                                    <li v-for="(tag, index) in taskTags">
                                        <div class="dropdown-item-text">
                                            <div class="form-check">
                                                <input :id="MODAL_CHECKBOX_BASE_ID + tag.value.name" type="checkbox" class="form-check-input" v-model="taskTags[index].value.selected">
                                                <label class="form-check-label" :for="tag"><Tag :tag-value="tag.value.name" /></label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Footer of the modal containing the submit and close buttons -->
                <div class="modal-footer">
                    <button :id="MODAL_BUTTON_CANCEL" type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
                    <button :id="MODAL_BUTTON_SUBMIT" type="submit" class="btn btn-primary" @click="submitModal">{{mode}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* no custom stylesheet necessary thanks to Bootstrap */
</style>