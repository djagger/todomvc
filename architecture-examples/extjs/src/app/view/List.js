Ext.define('Todo.view.List', {
	extend: 'Ext.grid.Panel',
	requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.form.field.Text'
	],
	alias: 'widget.todo_list',
	cls: 'todo-app-list not-empty',
	store: 'Tasks',
	hideHeaders: true,
	disableSelection: true,
	plugins: {
		ptype: 'cellediting',
		clicksToEdit: 2
	},
	columns: [
		{
			dataIndex: 'completed',
			tdCls: 'checkcolumn',
			renderer: function (value, meta) {
				if (value) {
					meta.tdCls = 'checked'
				}
				return '✔';
			},
			width: 44
		},
		{
			dataIndex: 'title',
			tdCls: 'todo-text',
			renderer: function (value, meta, todo) {
				if (todo.get('completed')) {
					meta.tdCls = 'completed';
				}
				return value;
			},
			flex: 1,
			field: {
				cls: 'todo-text-editor',
				allowBlank: false,
				selectOnFocus: true
			}
		},
		{
			width: 40,
			itemId: 'delete',
			align: 'center',
			tdCls: 'delete-icon',
			renderer:function() {
				return '\u2716';
			}
		}
	]
});
