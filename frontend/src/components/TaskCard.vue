<script setup>
import {onMounted, ref} from 'vue';
	import Tag from './Tag.vue'

	const props = defineProps({
		otherColumns: {
			type: Array,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	});

	const emit = defineEmits([
		'move-task',
		'trigger-edit',
		'delete-task'
	])

	let collapsed = ref('collapsed')

	function toggleCollapsed() {
		if(collapsed.value.length === 0) {
			collapsed.value = 'collapsed'
		} else {
			collapsed.value = ''
		}
	}

	const submenuRef = ref(null);
	const isLeft = ref(false);

	const checkSubmenuPosition = () => {
		if (submenuRef.value) {
			const submenu = submenuRef.value.getBoundingClientRect()

			if(!submenuRef.value.classList.contains('dropdown-submenu-left')) {
				// Check if the right edge of the submenu goes beyond the window's width
				if (submenu.right > window.innerWidth) {
					submenuRef.value.classList.add('dropdown-submenu-left')
					submenuRef.value.classList.remove('dropdown-submenu-right')
				} else {
					submenuRef.value.classList.remove('dropdown-submenu-left')
					submenuRef.value.classList.add('dropdown-submenu-right')
				}
			}
		}
	}

	function moveTask(newColumnId) {
		emit('move-task', props.task.id, newColumnId)
	}

	function triggerEdit() {
		emit('trigger-edit', props.task.id)
	}

	function deleteTask() {
		emit('delete-task', props.task.id)
	}

	onMounted(() => {
		// Check position on mount in case the default position needs adjustment
		checkSubmenuPosition()
	})
</script>

<template>
	<div class="card bg-light mt-3">
		<div class="card-header d-flex justify-content-between align-items-center">
			<h5 class="collapsed mb-0">{{ task.title }}</h5>
			<div class="dropdown">
				<button class="btn btn-link p-0 m-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="../assets/hamburger.svg" alt="Edit task" height="24" width="24">
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<li class="d-flex justify-content-between align-items-center dropdown-submenu">
						<a class="dropdown-item" href="#" @mouseover="checkSubmenuPosition">Move</a>
						<span class="me-2">&raquo</span>
						<ul class="dropdown-menu dropdown-submenu-right" href="#" ref="submenuRef">
							<li v-for="column in otherColumns">
								<a class="dropdown-item" href="#" @click="moveTask(column.id)">{{column.name}}</a>
							</li>
						</ul>
					</li>
					<li><a class="dropdown-item" href="#" @click="triggerEdit">Edit</a></li>
					<li><a class="dropdown-item" href="#" @click="deleteTask">Delete</a></li>
				</ul>
			</div>
		</div>
		<div :class="['card-body', collapsed]" @click="toggleCollapsed()">
			{{ task.text }}
		</div>
		<div class="card-footer">
			<Tag v-for="tag in task.tags" :tag-value="tag" />
		</div>
	</div>
</template>

<style scoped>
	.collapsed {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		cursor: pointer;
	}

	.dropdown-submenu {
		position: relative;
	}

	.dropdown-submenu-right {
		left: 100%;
		right: auto;
		top: 0;
	}

	.dropdown-submenu-left {
		left: auto;
		right: 100%;
		top: 0;
	}

	.dropdown-menu > li:hover > * {
		display: block;
	}
</style>
