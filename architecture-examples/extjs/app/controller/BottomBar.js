Ext.define('Todo.controller.BottomBar', {
	extend: 'Ext.app.Controller',
	stores: ['Tasks'],
	refs: [
		{ref: 'bottomBar', selector: 'todo_bottombar'},
		{ref: 'textUncompleted', selector: 'todo_bottombar #uncompleted'},
		{ref: 'buttonCompleted', selector: 'todo_bottombar #completed'}
	],

	init: function () {
		this.listen({
			component: {
				"todo_bottombar #completed": {
					click: this.onClearButtonClick
				}
			},
			store: {
				"#Tasks": {
					//No need in listen to add, remove, etc, because we have immediate sync.
					datachanged: this.doRecount,
					filterchange: this.maybeDisable
				}
			}
		});
	},

	doRecount: function (store) {
		var total = 0, completed = 0;
		store.queryBy(function (record) {
			total++;
			completed += record.get('completed');
		});
		this.onCountUpdate(total, completed);
	},

	onClearButtonClick: function () {
		var records,
			store = this.getTasksStore();

		records = store.queryBy(function (record) {
			return record.get('completed');
		}).getRange();
		store.remove(records);
	},
	onCountUpdate: function (total, completed) {
		var completedButton = this.getButtonCompleted(),
			left = total - completed;
		this.getBottomBar().setVisible(!!total);
		this.getTextUncompleted().update({
			count: left
		});
		completedButton[completed ? 'removeCls' : 'addCls']('hidden')
			.setDisabled(!completed)
			.setText(completedButton.textTpl.apply({count: completed}));
		this.fireEvent('countschange', total, completed);
	},

	maybeDisable:function(store) {
		var button = this.getButtonCompleted(),
			filter = store.filters.get('completed');
		//Disable because: a) user doesn't see what he deletes and b) problem with sync :).
		if (filter && filter.value === false) {
			button.disable().setTooltip('First, take a look on those todos you are going to delete.');
		} else {
			button.enable().setTooltip('');
		}
	}
});