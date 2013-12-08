Ext.define('Todo.view.BottomBar', {
	extend: 'Ext.toolbar.Toolbar',
	requires: ['Ext.button.Button'],
	alias: 'widget.todo_bottombar',
	cls: 'todo-app-bbar',
	hidden: true,
	layout: 'auto',
	items: [
		{
			xtype: 'component',
			cls: 'counts',
			itemId: 'uncompleted',
			tpl: '<strong>{count}</strong> item<tpl if="count !== 1">s</tpl> left',
			data: {count: 0}
		},
		{
			xtype: 'component',
			itemId: 'filters',
			autoEl: {
				tag: 'div',
				cls: 'filters',
				children: [
					{
						tag: 'a',
						cls: 'selected',
						href: '#/',
						html: 'All'
					},
					{
						tag: 'a',
						href: '#/active',
						html: 'Active'
					},
					{
						tag: 'a',
						href: '#/completed',
						html: 'Completed'
					}
				]
			}
		},
		{
			//Actually button don't use this config.
			//But we can use it in different place to update button's text.
			textTpl: Ext.create('Ext.Template', 'Clear completed ({count})'),
			itemId: 'completed'
		}
	],
	currentTriggerCls: 'selected',
	filterTriggers:null,
	getFilterTriggers:function() {
		if (!this.filterTriggers) {
			this.filterTriggers = this.getComponent('filters').getEl().select('a');
		}
		return this.filterTriggers;
	},
	updateTriggersState:function(path) {
		var cls = this.currentTriggerCls;
		this.getFilterTriggers().each(function (el) {
			if (el.dom.hash != '#' + path) {
				el.removeCls(cls);
			} else {
				el.addCls(cls);
			}
		});
	}
});
