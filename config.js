const CONFIG = `
// valid:  log, set, raw, js, function
// valid:  add_link

set clocks.size to 6em
set clocks.format to %h:%m

set title to TODO App
set link to https://miftikcz.github.io/idea-keeper
add_link

set title to LocalHost
set link to http://localhost:5500/
add_link

set title to YouChat
set link to https://you.com/search?q=Hello&tbm=youchat
add_link

set title to ChatGPT
set link to https://chat.openai.com/chat
add_link


set title to GitHub
set link to https://github.com
add_link


set title to Fonts
set link to https://fonts.google.com
add_link
`

export default CONFIG