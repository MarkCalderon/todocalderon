Vue.component('tasklist-current', {
  	template: `
		<li class="list__item">
		<span class="list__text">{{ title }}</span> 
		<button class="btn__delete" v-on:click="$emit('remove')">Remove</button>
		<button class="btn__done" v-on:click="$emit('finish')">Done</button>
		</li>
  	`,

  	// Props should be v-bind on the v-for loop
  	props: ['title'],
});

Vue.component('tasklist-complete', {
  	template: `
		<li class="list__item">
		<span class="list__text">{{ title }}</span> 
		</li>
  	`,

  	// Props should be v-bind on the v-for loop
  	props: ['title'],
});

var app = new Vue({
	el: '#app',
	data: {
		nextTodoID: 1,
		newTodoText: '',
		todos: [],
		todosComplete: [],
		currentTask: true,
		pastTask: false,
		completeTask: false,
	},
	methods: {
		addNewTask: function () {
			if(!this.newTodoText == '') {

				this.todos.push({
					id: this.nextTodoID++,
					title: this.newTodoText,
					status: 'current'
				});
				this.newTodoText = '';
			}
		},
		openTab: function(tab) {
			if(tab == 1) {
				this.completeTask = false;
				this.currentTask = true;
			}
			else {
				this.currentTask = false;
				this.completeTask = true;
			}
		},
		taskFinish: function(idReceived) {
			for(var key in this.todos){
				if(key == idReceived) {
					this.todos[key].status = 'done';

					this.todosComplete.push({
						id: this.nextTodoID++,
						title: this.todos[key].title,
						status: 'complete'
					});

					this.todos.splice(key, 1);
				}
			}
			console.table(this.todosComplete);
		},

		startTimer: function() {
		}
	},
});
