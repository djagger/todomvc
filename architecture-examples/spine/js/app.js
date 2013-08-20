// Generated by CoffeeScript 1.6.3
(function() {
  var TodoApp,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TodoApp = (function(_super) {
    var ENTER_KEY;

    __extends(TodoApp, _super);

    ENTER_KEY = 13;

    TodoApp.prototype.elements = {
      '#new-todo': 'newTodoInput',
      '#toggle-all': 'toggleAllElem',
      '#main': 'main',
      '#todo-list': 'todos',
      '#footer': 'footer',
      '#todo-count': 'count',
      '#filters a': 'filters',
      '#clear-completed': 'clearCompleted'
    };

    TodoApp.prototype.events = {
      'keyup #new-todo': 'new',
      'click #toggle-all': 'toggleAll',
      'click #clear-completed': 'clearCompleted'
    };

    function TodoApp() {
      this.renderFooter = __bind(this.renderFooter, this);
      this.toggleElems = __bind(this.toggleElems, this);
      this.addAll = __bind(this.addAll, this);
      this.addNew = __bind(this.addNew, this);
      TodoApp.__super__.constructor.apply(this, arguments);
      Todo.bind('create', this.addNew);
      Todo.bind('refresh change', this.addAll);
      Todo.bind('refresh change', this.toggleElems);
      Todo.bind('refresh change', this.renderFooter);
      Todo.fetch();
      this.routes({
        '/:filter': function(param) {
          this.filter = param.filter;
          /*
          				TODO: Need to figure out why the route doesn't trigger `change` event
          */

          Todo.trigger('refresh');
          return this.filters.removeClass('selected').filter("[href='#/" + this.filter + "']").addClass('selected');
        }
      });
    }

    TodoApp.prototype["new"] = function(e) {
      var val;
      val = $.trim(this.newTodoInput.val());
      if (e.which === ENTER_KEY && val) {
        Todo.create({
          title: val
        });
        return this.newTodoInput.val('');
      }
    };

    TodoApp.prototype.getByFilter = function() {
      switch (this.filter) {
        case 'active':
          return Todo.active();
        case 'completed':
          return Todo.completed();
        default:
          return Todo.all();
      }
    };

    TodoApp.prototype.addNew = function(todo) {
      var view;
      view = new Todos({
        todo: todo
      });
      return this.todos.append(view.render().el);
    };

    TodoApp.prototype.addAll = function() {
      var todo, _i, _len, _ref, _results;
      this.todos.empty();
      _ref = this.getByFilter();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        _results.push(this.addNew(todo));
      }
      return _results;
    };

    TodoApp.prototype.toggleAll = function(e) {
      return Todo.each(function(todo) {
        /*
        			TODO: Model updateAttribute sometimes won't stick:
        				https://github.com/maccman/spine/issues/219
        */

        todo.updateAttribute('completed', e.target.checked);
        return todo.trigger('update', todo);
      });
    };

    TodoApp.prototype.clearCompleted = function() {
      return Todo.destroyCompleted();
    };

    TodoApp.prototype.toggleElems = function() {
      var isTodos;
      isTodos = !!Todo.count();
      this.main.toggle(isTodos);
      this.footer.toggle(isTodos);
      this.clearCompleted.toggle(!!Todo.completed().length);
      if (!Todo.completed().length) {
        return this.toggleAllElem.removeAttr('checked');
      }
    };

    TodoApp.prototype.renderFooter = function() {
      var active, completed, text;
      text = function(count) {
        if (count === 1) {
          return 'item';
        } else {
          return 'items';
        }
      };
      active = Todo.active().length;
      completed = Todo.completed().length;
      this.count.html("<strong>" + active + "</strong> " + (text(active)) + " left");
      return this.clearCompleted.text("Clear completed (" + completed + ")");
    };

    return TodoApp;

  })(Spine.Controller);

  $(function() {
    new TodoApp({
      el: $('#todoapp')
    });
    return Spine.Route.setup();
  });

}).call(this);
