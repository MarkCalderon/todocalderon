Vue.component('tasklist', {
  	template: `
		<li>{{ title }} 
		<button class="btn__delete" v-on:click="$emit('remove')">Remove</button>
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
		currentTask: true,
		pastTask: false,
		completeTask: false,
	},
	methods: {
		addNewTask: function () {
			this.todos.push({
				id: this.nextTodoID++,
				title: this.newTodoText,
				status: 'current'
			});
			this.newTodoText = '';
		},
		openTab: function(tab) {
			if(tab == 1) {
				this.pastTask = false;
				this.completeTask = false;
				this.currentTask = true;
			}else if(tab == 2) {
				this.currentTask = false;
				this.completeTask = false;
				this.pastTask = true;
			}else if(tab== 3){
				this.currentTask = false;
				this.pastTask = false;
				this.completeTask = true;
			}
		}
	},
});
