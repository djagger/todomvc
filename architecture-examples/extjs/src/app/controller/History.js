Ext.define('Todo.controller.History', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.util.History'],
	stores: ['Tasks'],
	refs: [
		{ref: 'buttonCompleted', selector: 'todo_bottombar #completed'},
		{ref: 'filters', selector: 'todo_bottombar #filters'}
	],

	onLaunch: function () {
		var me = this;
		Ext.util.History.init(function (history) {
			me.onHistoryChange(history.getToken());
		});
		Ext.util.History.on('change', this.onHistoryChange, this);
	},
	currentCls: 'selected',
	onHistoryChange: function (token) {
		var filter = null,
			store = this.getTasksStore(),
			els = this.getFilters().getEl().select('a'),
			cls = this.currentCls,
			button = this.getButtonCompleted();
		token = token || '/';
		switch (token) {
			case '/active':
				filter = false;
				break;
			case '/completed':
				filter = true;
				break;
		}

		if (filter !== null) {
			store.filter({
				id: 'completed',
				property: 'completed',
				operator: '=',
				value: filter
			});
		} else {
			store.removeFilter('completed');
		}

		//Toggle classes on links.
		els.each(function (el) {
			if (el.dom.hash != '#' + token) {
				el.removeCls(cls);
			} else {
				el.addCls(cls);
			}
		});
	}
});