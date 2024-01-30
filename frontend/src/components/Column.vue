<script setup>
	import TaskCard from './TaskCard.vue';
	import {computed} from "vue";

	const props = defineProps({
		columns: {
			type: Array,
			required: true
		},
		columnId: {
			type: Number,
			required: true
		}
	});

	defineEmits([
		'move-task',
		'trigger-edit',
		'delete-task'
	])

	const column = computed(() => props.columns.find(c => c.id === props.columnId));
</script>

<template>
	<h4 class="text-light pt-4">{{ column.name }}</h4>
	<div class="column-body">
        <TaskCard
						v-for="task in column.tasks"
						:key="task.id"
						:task="task"
						:otherColumns="columns.filter(c => c.id !== columnId)"
						@move-task="(...args) => $emit('move-task', ...args)"
						@trigger-edit="(...args) => $emit('trigger-edit', ...args)"
						@delete-task="(...args) => $emit('delete-task', ...args)"
				/>
	</div>
</template>