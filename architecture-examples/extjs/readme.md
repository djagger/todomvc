To build the app:
# Download and install the ExtJS framework to "ext" dir under this one (http://www.sencha.com/products/extjs).
# Download and install Sencha CMD (http://www.sencha.com/products/sencha-cmd).
# Make sure you have ruby in the system with the latest sass and compass gems.
# cd to this directory.
# Run sencha app build [-e testing|production].

# Todo/app

This folder contains the javascript files for the application.

# Todo/resources

This folder contains static resources (typically an `"images"` folder as well).

# Todo/overrides

This folder contains override classes. All overrides in this folder will be
automatically included in application builds if the target class of the override
is loaded.

# Todo/sass/etc

This folder contains misc. support code for sass builds (global functions,
mixins, etc.)

# Todo/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this
folder are mapped to the application's root namespace, 'Todo'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in Todo/.sencha/app/sencha.cfg.

# Todo/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this
folder are mapped to the application's root namespace, 'Todo'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in Todo/.sencha/app/sencha.cfg.