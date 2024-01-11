<template>
  <span :class="['badge rounded-pill', badgeColor, 'ms-2']">
    {{ tag }}
  </span>
</template>

<script>

  export default {
    props: {
      tag: String
    },
    computed: {
      // Define badge color based of table in task
      badgeColor() {
        switch (this.tag) {
          case 'Feature':
          case 'Bug':
            return 'text-bg-primary';
          case 'In concept':
          case 'Shelved':
          case 'Abandoned':
            return 'text-bg-secondary';
          case 'Assigned':
            return 'text-bg-success';
          case 'Client request':
            return 'text-bg-warning';
          case 'Urgent':
            return 'text-bg-danger';
          default:
            return 'text-bg-light';
        }
      }
    }
  }

</script>