Ext.define('Todo.model.Task', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'title',
		{name: 'completed', type: 'boolean'},
		{name: 'scheduled', type: 'date'}
	],
	proxy: {
		type: 'localstorage',
		id: 'todos-extjs'
	}
});