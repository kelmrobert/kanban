<script setup>
import { ref, onMounted } from 'vue'
import Board from './components/Board.vue'
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'

const tags = ref([])
const columns = ref([])
const modalRef = ref(null)

const title = 'My Kanban Board'

/**
 * Calls the showModal() function in Modal.vue, assuming the component is registered and referenced.
 * DO NOT MODIFY.
 */
function showModal(task = null, columnId = null) {
    if (modalRef.value) {
        modalRef.value.showModal(task, columnId)
    }
}

/**
 * Calls showModal() in editing mode.
 * DO NOT MODIFY.
 * @param taskId
 */
function triggerEdit(taskId) {
    for (let column of columns.value) {
        const index = column.tasks.findIndex(t => t.id === taskId)
        if (index > -1) {
            const task = column.tasks[index]
            showModal(task)
            return
        }
    }
}

////////////////////////////////////////////////////////////////
// API calls below, only modify the content of the functions, not their signature! //
////////////////////////////////////////////////////////////////

async function loadTags() {

  try {
    const response = await fetch('/api/tags');
    tags.value = await response.json();
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

async function loadColumns() {

  try {
    const response = await fetch('/api/columns');
    columns.value = await response.json();
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

async function createTask(columnId, taskTitle, taskText, taskTags) {
  try {
    await fetch('api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        column: columnId,
        title: taskTitle,
        text: taskText,
        taskTags: taskTags
      })
    });

    await loadColumns();

  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

async function editTask(taskId, taskTitle, taskText, taskTags) {
  try {
    await fetch('api/tasks/' + taskId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: taskTitle,
        text: taskText,
        taskTags: taskTags
      })
    });

    await loadColumns();

  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

async function deleteTask(taskId) {
  try {
    await fetch('api/tasks/' + taskId, {
      method: 'DELETE'
    });

    await loadColumns();

  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

async function moveTask(taskId, newColumnId) {

  try {
    await fetch('api/move-task/' + taskId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newColumnId: newColumnId,
      })
    });

    await loadColumns();

  } catch (error) {
    console.error('Something went wrong:', error);
  }

}

onMounted(() => {
    // DO NOT MODIFY
    loadTags()
    loadColumns()
})
</script>

<template>
    <!-- DO NOT MODIFY -->
    <Header :title="title" @show-modal="showModal" />
    <Board :columns="columns" @move-task="moveTask" @trigger-edit="triggerEdit" @delete-task="deleteTask"/>
    <Modal :tags="tags" :columns="columns" ref="modalRef" @create-task="createTask" @edit-task="editTask"/>
</template>