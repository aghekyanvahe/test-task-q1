const { createApp } = Vue

createApp({
  data() {
    return {
      todos: [],
      newItem: "",
      lastId: 1
    }
  },

  computed: {
    notCompletedItems() {
      return this.todos.filter(el => !el.completed)
    },

    completedItems() {
      return this.todos.filter(el => el.completed)
    }
  },

  methods: {
    addItemToList() {
      if (this.newItem) {
        this.todos.push({
          id: this.lastId,
          text: this.newItem,
          completed: false
        })
        this.newItem = ""
        this.lastId += 1
      }
    },

    removeItem(id) {
      const itemIndex = this.todos.findIndex(el => el.id === id)
      this.todos.splice(itemIndex, 1)
    },

    onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    },

    onDrop(e, completed) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      const item = this.todos.find(el => el.id === itemId)
      item.completed = completed
    }
  }
}).mount('#app')