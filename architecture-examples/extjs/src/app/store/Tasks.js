Ext.define('Todo.store.Tasks', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Todo.model.Task',
	sorters: ['scheduled'],
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
	},
	bulkComplete: function(completed) {
		var me = this,
			records = (me.snapshot || me.data).getRange(),
			record,
			i;
		me.suspendEvents();
		for (i = 0; record = records[i]; i++) {
			record.set('completed', completed);
		}
		me.resumeEvents();
		me.fireEvent('refresh', me);
		me.fireEvent('datachanged', me);
	}
});