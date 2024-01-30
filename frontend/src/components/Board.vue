<script setup>
	import Column from './Column.vue';
	import TaskCard from "@/components/TaskCard.vue";

	defineProps({
		columns: {
			type: Array,
			required: true
		}
	});

	defineEmits([
		'move-task',
		'trigger-edit',
		'delete-task'
	])
</script>

<template>
	<div class="container">
		<div class="row">
			<div v-for="column in columns" class="col-12 col-md-6 col-lg-4">
				<Column
						:key="column.id"
						:columns="columns"
						:column-id="column.id"
						@move-task="(...args) => $emit('move-task', ...args)"
						@trigger-edit="(...args) => $emit('trigger-edit', ...args)"
						@delete-task="(...args) => $emit('delete-task', ...args)"
				/>
			</div>
		</div>
	</div>
</template>
