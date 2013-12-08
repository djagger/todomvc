Ext.define('Todo.store.Tasks', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Todo.model.Task',
	sorters: ['scheduled'],
	//Apply/remove filter by value of 'completed'.
	filterCompleted:function(completed) {
		if (completed !== null) {
			this.filter({
				id: 'completed',
				property: 'completed',
				operator: '=',
				value: completed
			});
		} else {
			this.removeFilter('completed');
		}
	},
	//Ordinary loop will fire a lot of events, forcing UI to do a lot of job.
	bulkComplete: function(completed) {
		var me = this,
			records = (me.snapshot || me.data).getRange(),
			record,
			i;
		me.suspendEvents();
		for (i = 0; record = records[i]; i++) {
			record.set('completed', completed);
		}
		me.filter();
		me.resumeEvents();
		me.fireEvent('refresh', me);
		me.fireEvent('datachanged', me);
	},


	//So, there is no dynamic filtering (on add/update) in Ext stores.
	//We need to do it ourselves.

	//If added record (the method actually accepts an array, but we pass only one in TopBar controller)
	//doesn't match our filters, we add it silently to snapshot, that carries whole (unfiltered) set.
	add: function (record) {
		var me = this;
		record = me.createModel(record);
		if (me.checkFilterPass(record)) {
			me.callParent([record]);
		} else {
			me.snapshot.add(record);
			me.fireEvent('datachanged', me);
		}
	},
	//This one is called when record has its data changed by 'set' method.
	//Again, we check if records fits the main data set and either
	//add it back to the set
	//or push back to snapshot.
	//Additionally, we save it, because it won't be handled by original method.
	afterEdit: function (record) {
		var me = this,
			index;
		if (me.checkFilterPass(record)) {
			index = me.data.indexOf(record);
			if (index == -1) {
				me.addSorted(record);
				if (record.dirty && me.autoSync) {
					record.save();
				}
			} else {
				me.callParent(arguments);
			}
		} else {
			index = me.data.indexOf(record);
			if (index > -1) {
				me.data.remove(record);
				me.fireEvent('remove', me, record, index, true);
				me.fireEvent('bulkremove', me, [record], [index], true);
			}
			if (record.dirty && me.autoSync) {
				record.save();
			}
		}
	},
	//Just loop over current filter set and check them.
	checkFilterPass: function (node) {
		var filters = this.filters.items,
			isMatch = true,
			length = filters.length,
			i = 0,
			filter,
			fn,
			scope;

		while (i < length && isMatch) {
			filter = filters[i++];
			fn = filter.filterFn;
			scope = filter.scope;

			isMatch = isMatch && fn.call(scope || filter, node);
		}

		return isMatch;
	}
});