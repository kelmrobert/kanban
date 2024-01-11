<template>
  <h4 class="text-light mt-5">
    {{ column.name }}
  </h4>
  <!-- Create new div for TaskCard -->
  <div v-for="task in column.tasks" :key=task.id class="mb-3">
    <TaskCard :task=task></TaskCard>
  </div>
</template>

<script>
  import TaskCard from "@/components/TaskCard.vue";

  export default {
    components: {
      TaskCard
    },
    props: {
      column: Object
    }
  }
</script>