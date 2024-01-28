<script setup>

import Tag from "@/components/Tag.vue";
import { defineEmits } from 'vue';

///////////////////////////////////////////////
// IDs to be used for the respective DOM elements in the template
///////////////////////////////////////////////

const MODAL_ID = 'createModal' // for the modal's root element
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

const emit = defineEmits(['submitModal']);

defineProps({
  columns: {
    type: Array,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});

function updateCharacters(){
  let modalInputTitle = document.getElementById(MODAL_INPUT_TITLE_ID)
  let numOfChars = modalInputTitle.value.length;
  document.getElementById(MODAL_HELPER_TITLE_ID).innerHTML = numOfChars + "/50 characters";
}

function submitModal() {

  // Retrieve modal data
  let columnName = document.getElementById(MODAL_SELECT_COLUMN_ID).value
  let taskTitle = document.getElementById(MODAL_INPUT_TITLE_ID).value
  let taskText = document.getElementById(MODAL_INPUT_TEXT_ID).value

  // TODO Retrieve Tags

  // Pass data to parent
  emit('submitModal', columnName, taskTitle, taskText);
}

</script>

<template>
    <div :id="MODAL_ID" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Task in</h5>
            <select :id="MODAL_SELECT_COLUMN_ID" class="form-select ms-2 w-auto">
              <option v-for="column in columns">
                {{ column.name }}
              </option>
            </select>
            <button :id="MODAL_BUTTON_X_ID"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Task Title</label>
              <input :id="MODAL_INPUT_TITLE_ID" class="form-control" type="text" maxlength="50" @keyup="updateCharacters">
              <div :id="MODAL_HELPER_TITLE_ID" class="form-text">0/50 characters</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Task Description</label>
              <textarea :id="MODAL_INPUT_TEXT_ID" class="form-control"></textarea>
            </div>
            <div class="mb-3 dropdown">
              <button :id="MODAL_DROPDOWN_TRIGGER_ID"
                      class="btn btn-outline-primary dropdown-toggle"
                      type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Select tags
              </button>
              <ul :id="MODAL_DROPDOWN_MENU_ID" class="dropdown-menu form-check">
                <li class="dropdown-item form-check" v-for="tag in tags">
                  <input type="checkbox" id="{{ MODAL_CHECKBOX_BASE_ID + tag }}" class="me-2 form-check-inline">
                  <Tag :tagValue="tag"></Tag>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button :id="MODAL_BUTTON_CANCEL" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button :id="MODAL_BUTTON_SUBMIT" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submitModal" >Save changes</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
    /* no custom stylesheet necessary thanks to Bootstrap */
</style>