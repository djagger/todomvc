Ext.define('Todo.view.TopBar', {
    extend:'Ext.toolbar.Toolbar',
    requires:[
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text'
    ],
    alias:'widget.todo_topbar',
    cls:'todo-app-tbar',
    border: '16 0 0 0',
    items:[
        {
            xtype:'checkbox',
            cls:'check-all',
            inputAttrTpl:'value="»"'
        },
        {
            xtype:'textfield',
            flex:1,
            cls:'todo-text-input',
            emptyText:'What needs to be done?'
        }
    ]
});
