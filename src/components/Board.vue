<template>
  <div class="container">
    <div class="row">
      <!-- Create new div for every column -->
      <div v-for="column in columns" :key="column.id" class="col-lg-4 col-md-6 col-sm-12">
        <Column :column=column></Column>
      </div>
    </div>
  </div>
</template>

<script>
  import Column from "@/components/Column.vue";

  export default {
    components: {
      Column
    },
    props: {
      columns: Array
    }
  };
</script>