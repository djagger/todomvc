Ext.define('Todo.Application', {
	name: 'Todo',
	extend: 'Ext.app.Application',

	controllers: [
		'TopBar',
		'History',
		'List',
		'BottomBar'
	]
});