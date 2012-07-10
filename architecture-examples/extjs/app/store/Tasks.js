Ext.define('Todo.store.Tasks', {
	autoLoad: true,
	autoSync: true,
	model: 'Todo.model.Task',
	extend: 'Ext.data.Store'
});
