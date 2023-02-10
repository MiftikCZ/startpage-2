import Config from "./config.js"
import {chslang, runline, functions} from "./chslang.js"

const config = chslang(Config, {})
document.getElementById("clocks").style.fontSize = config["clocks.size"]

function setTime() {
    let date = new Date()
    let hours = (date.getHours()).toString()
    let minutes = (date.getMinutes()).toString()
    if(minutes.length < 1.1) {
        minutes = `0${minutes}`
    }


    let ret = config["clocks.format"]
    .split("%MON").join(date.getUTCMonth())
    .split("%h").join(hours)
    .split("%m").join(minutes)
    .split("%s").join(date.getSeconds())
    .split("%MS").join(date.getMilliseconds())

    document.getElementById("clocks").innerHTML = ret
}

setTimeout(()=>{
    setInterval(()=>{
        setTime()
    },15 * 1000)
},(60 - new Date().getMinutes()) * 1000)

setTime()
