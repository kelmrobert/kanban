<template>
  <div class="card mt-3">
    <div class="card-header card-title">
      {{ task.title }}
    </div>
    <div class="card-body">
      <p class="card-text" :class="{ 'toggle': !showAll }" @click="toggleText()">
        {{ task.text }}
      </p>
    </div>
    <div class="card-footer">
      <Tag v-for="tag in task.tags" :tag=tag></Tag>
    </div>
  </div>
</template>

<script>
  import Tag from "@/components/Tag.vue";

  export default {

    components: {
      Tag
    },
    props: {
      task: Object
    },
    methods: {
      toggleText() {
        this.showAll = !this.showAll; // Invert boolean on mouse click
      }
    },
    data() {
      return {
        showAll: false
      };
    }
  }
</script>

<style>
  .toggle {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>