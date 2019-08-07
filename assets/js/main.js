// For $HTTP REST API, Import VueResource
Vue.use(VueResource);

Vue.component('tasklist-current', {
  	template: `
		<li class="list__item">
		<span class="list__text">{{ title }}</span> 
		<button class="btn__delete" v-on:click="$emit('remove')">Remove</button>
		<button class="btn__done" v-on:click="$emit('finish')">Done</button>
		</li>
  	`,

  	// Props should be v-bind on the v-for loop
  	props: ['title']
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

		// TAB OPTIONS
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

		// ADDING DATA THROUGH $HTTP
		taskAdd: function () {
			if(!this.newTodoText == '') {

	            this.$http.post('https://todotrackerz.firebaseio.com/posts.json',{
	            // Using Firebase index as ID, otherwise, id: this.nextTodoID++,
					title: this.newTodoText,
					status: 'current'
				}).then(function(){
					this.newTodoText = '';
					console.log('Successfully added item...');
				});
			}
		},

		// REMOVING DATA THROUGH $HTTP
		taskRemove: function(idReceived) {
			this.$http.delete('https://todotrackerz.firebaseio.com/posts/' + idReceived + '.json').then(function(){
				this.todos.splice(idReceived, 1);
				console.log('Successfully deleted item...');
			});
		},

		// UPDATING DATA THROUGH $HTTP
		taskFinish: function(idReceived) {
				for(let key in this.todos) {
					if(this.todos[key].id == idReceived) {
						console.log('..');

						this.$http.put('https://todotrackerz.firebaseio.com/posts/' + idReceived + '.json',{
							id: this.todos[key].id,
							title: this.todos[key].title,
							status: 'complete'

						}).then(function(){
							console.log('Task has been completed...');
						});
					}
				}	
		},
	},
	// LOADS DATA UPON LOADING
	created() {
		this.$http.get('https://todotrackerz.firebaseio.com/posts.json').then(function(data){
			return data.json();
		}).then(function(data){

			for(let key in data) {
				data[key].id = key;
				//If item status is == complete
				if(data[key].status == 'complete') {
					this.todosComplete.push(data[key]);
				}
				// Else if item status is == current
				else {
					this.todos.push(data[key]);
				}

			}
		});

	}
});
