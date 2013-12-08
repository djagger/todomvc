Ext.define('Todo.controller.TopBar', {
	extend: 'Ext.app.Controller',
	stores: ['Tasks'],
	refs: [
		{ref: 'checkAll', selector: 'todo_topbar checkbox'}
	],

	init: function () {
		this.listen({
			component: {
				"todo_topbar textfield": {
					specialkey: this.onEnter
				},
				"todo_topbar checkbox": {
					change: this.onCheckAllChange
				}
			},
			controller:{
				"#BottomBar": {
					countschange: this.onCountsChange
				}
			}
		});
	},

	//Add new.
	onEnter: function (field, event) {
		if (event.getKey() == event.ENTER) {
			var value = Ext.String.trim(field.getValue());
			if (!Ext.isEmpty(value)) {
				field.setValue('');
				this.getTasksStore().add({
					title: value,
					scheduled: new Date()
				});
			}
		}
	},
	//User initiated.
	onCheckAllChange: function (checkbox, checked) {
		if (!this.dontCheckAll) {
			this.getTasksStore().bulkComplete(checked);
		}
	},
	onCountsChange: function (total, completed) {
		//TODO: Post a bug about suspended events dispatching by EventDomain.
		//Without suspending, we will reset all when user unchecks only one.
		this.dontCheckAll = true;
		this.getCheckAll().setValue((total == completed) && (total > 0));
		this.dontCheckAll = false;
	}
});