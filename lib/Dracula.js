var bold, exec, getConfiguration, green, home, path, phantomjs, phantomlib, pwd, red, reset, say, spawn, trace, _ref;
path = require('path');
_ref = require('child_process'), spawn = _ref.spawn, exec = _ref.exec;
/*
# Variables
# `home` - user home directory + dracularc folder
#
*/
home = process.env.HOME + '/.dracularc/';
pwd = process.env.PWD;
phantomjs = '/home/zero/PhantomJS/phantomjs/bin/phantomjs';
phantomlib = '/home/zero/Github/Dracula/lib/ghostbuster.coffee';
/*
# Predefined colors: `bold` `red` `green` `reset`
*/
bold = "\033[0;ln";
red = "\033[0;31m";
green = "\033[0;32m";
reset = "\033[0m";
/*
# `say` helps you returning content to the command prompt
# and displaying errors too :)
*/
say = function(message, color, explanation) {
  return console.log("" + color + message + reset + " " + (explanation || ''));
};
/*
# `trace` is used to catch errors when using exec.
# end returning the content of it
*/
trace = function(error, stdout, stderr) {
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.log(stderr);
  }
  if (error) {
    process.stdout.write("" + red + error.stack + reset + "\n");
    return process.exit(-1);
  }
};
getConfiguration = function() {
  /*
    # Check localy if there is a `.dracularc.js` file
    # With the configurations...
    #
    */  var config;
  if (path.existsSync('.dracularc.js')) {
    config = require('.dracularc.js');
    return config;
  }
  if (path.existsSync(root + 'configuration.js')) {
    /*
        # If we don't find .dracularc.js
        # read the global file. `.dracularc/configuration.js`
        */
    config = root + '.dracularc/configuration.js';
    return config;
  }
  return {};
};
/*
# Define the Dracula main function.
*/
module.exports.Dracula = function(args) {
  var config, screenshot_dir, screenshot_x, screenshot_y, screenshots, test_dir;
  config = getConfiguration();
  screenshots = config.screenshots || true;
  screenshot_x = config.screenshot_x || 800;
  screenshot_y = config.screenshots_y || 600;
  screenshot_dir = config.screenshots_dir || pwd;
  test_dir = path.dirname(args[2]);
  return exec("" + phantomjs + " " + phantomlib + " " + screenshots + " " + screenshot_x + " " + screenshot_y + " " + screenshot_dir + " " + args[2], function(error, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
      say("Moving screenshots", green);
      if (screenshots) {
        return exec("mv " + test_dir + "/*.png " + screenshot_dir, trace);
      }
    }
  });
};