Ext.define('Todo.view.Viewport', {
    extend:'Ext.container.Viewport',
    requires:[
        'Todo.view.TopBar',
        'Todo.view.List',
        'Todo.view.BottomBar'
    ],
    items:[
        {
            xtype:'box',
            autoEl:{
                tag:'h1',
                html:'todos'
            }
        },
        {
            xtype:'todo_list',
            width:550,
            dockedItems:[
                {xtype:'todo_topbar', dock:'top'}
            ]
        },
        {xtype:'todo_bottombar', width:550},
        {
            xtype:'box',
            contentEl:'footer'
        }
    ]
});