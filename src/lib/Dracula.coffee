#
# Dracula! blaaaaa
#

path = require 'path'
{spawn, exec} = require 'child_process'

###
# Variables
# `home` - user home directory + dracularc folder
#
###

home = process.env.HOME + '/.dracularc/'
pwd  = process.env.PWD
phantomjs = '/home/zero/PhantomJS/phantomjs/bin/phantomjs'
phantomlib = '/home/zero/Github/Dracula/lib/ghostbuster.coffee'

###
# Predefined colors: `bold` `red` `green` `reset`
###
bold  = "\033[0;ln"
red   = "\033[0;31m"
green = "\033[0;32m"
reset = "\033[0m"

###
# `say` helps you returning content to the command prompt
# and displaying errors too :)
###
say = (message,color, explanation) ->
  console.log "#{color}#{message}#{reset} #{(explanation or '')}"

###
# `trace` is used to catch errors when using exec.
# end returning the content of it
###
trace = (error,stdout,stderr) ->
  console.log stdout if stdout
  console.log stderr if stderr

  if error
    process.stdout.write "#{red}#{error.stack}#{reset}\n"
    process.exit -1

getConfiguration = () ->
  ###
  # Check localy if there is a `.dracularc.js` file
  # With the configurations...
  #
  ###
  if path.existsSync('.dracularc.js')
    config = require '.dracularc.js'
    return config
  if path.existsSync(root + 'configuration.js')
    ###
    # If we don't find .dracularc.js
    # read the global file. `.dracularc/configuration.js`
    ###
    config = root + '.dracularc/configuration.js'
    return config
  return {}

###
# Define the Dracula main function.
###

module.exports.Dracula = (args) ->

  # Configuration.
  config = getConfiguration()
  screenshots    = config.screenshots || true
  screenshot_x   = config.screenshot_x || 800
  screenshot_y   = config.screenshots_y || 600
  screenshot_dir = config.screenshots_dir || pwd
  
  test_dir = path.dirname(args[2])
  # Start testing.
  exec "#{phantomjs} #{phantomlib} #{screenshots} #{screenshot_x} #{screenshot_y} #{screenshot_dir} #{args[2]}", (error,stdout,stderr) ->
    if stdout
      console.log stdout
      say "Moving screenshots", green
      if screenshots 
        exec "mv #{test_dir}/*.png #{screenshot_dir}",trace


