Ext.define('Todo.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Todo.view.TopBar',
		'Todo.view.List',
		'Todo.view.BottomBar'
	],
	defaults: {
		width: 552
	},
	items: [
		{
			xtype: 'box',
			autoEl: {
				tag: 'h1',
				html: 'todos'
			}
		},
		{
			xtype: 'todo_list',
			border:1,
			dockedItems: [
				{xtype: 'todo_topbar', dock: 'top'}
			]
		},
		{xtype: 'todo_bottombar'},
		{
			xtype: 'box',
			id:'info',
			autoEl:'footer',
			html:[
				'<p>Double-click to edit a todo</p>',
				'<p>Created by <a href="http://revolunet.com/">Revolunet</a></p>',
				'<p>Updates and Edits by <a href="http://github.com/boushley">Aaron Boushley</a></p>',
				'<p>Total refactor by <a href="http://github.com/ettavolt">Arseniy Skvortsov</a></p>',
				'<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>'
			]
		}
	]
});