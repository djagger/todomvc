Ext.define('Todo.controller.History', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.util.History'],
	stores: ['Tasks'],
	refs: [
		{ref: 'buttonCompleted', selector: 'todo_bottombar #completed'},
		{ref: 'footer', selector: 'todo_bottombar'}
	],

	onLaunch: function () {
		var me = this;
		Ext.util.History.init(function (history) {
			me.onHistoryChange(history.getToken());
		});
		Ext.util.History.on('change', this.onHistoryChange, this);
	},
	onHistoryChange: function (token) {
		var completed = null;
		token = token || '/';
		switch (token) {
			case '/active':
				completed = false;
				break;
			case '/completed':
				completed = true;
				break;
		}

		this.getTasksStore().filterCompleted(completed);

		this.getFooter().updateTriggersState(token);
	}
});