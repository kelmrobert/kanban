<template>
  <h4 class="text-light mt-4">
    {{ column.name }}
  </h4>
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