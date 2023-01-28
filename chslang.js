// chsLang Language made by MiftikCZ

let data = {
    nowInFunction: false,
    functionContent: [],
    nowFuncName: "",
}

export const functions = {
    "set": ( (cont, conf = {}) => {// set [myVariable as Hello, world]
        let varName = cont.shift()
        let ind = cont.shift()
        if (!(ind == "to" || ind == "as")) return conf
        let value = cont.join(" ")
        let splitter = "$("
        if (value.includes(splitter)) {
            value = value.split(splitter).map(l => { 
                let e = l.split(")")[0]
                return l.split(e+")").join(conf[e] || splitter+l)
            }).join("")
        }
        conf[varName] = value
        return conf
    }),
    "log": ((cont,conf={}) => {
        console.log(cont.join(" "))
        return conf
    }),
    "raw":((cont,conf={}) => {
        conf = runline("set", "return to "+(new Function("return "+cont.join(" "))()), conf)
        return conf
    }),
    "function": ((cont, conf = {}) => { // function [myFunction with ARGS]
        cont[0] ||= "myFunction"
        data.nowFuncName = cont[0]
        data.nowInFunction = true
        
        return conf
    }),
    "skip": (cont, conf) => {
        return conf
    },
    "js": (cont, conf = {}) => { // js [console.log("cs")]
        new Function("cont", "conf", "functions", "runline", `${cont.join(" ")}`)(cont, conf, functions, runline)
        return conf
    },


    // custom

    "add_link": (cont,conf)=>{
        let link = document.createElement("div")
        link.innerText = conf.title
        link.classList.add("link")
        let l = conf.link
        link.addEventListener("click", ()=>{
            window.open(l)
        })
        document.getElementById("links").appendChild(link)
        return conf
    },

    "new_line": (cont,conf)=>{
        document.getElementById("links").innerHTML+="<br>"
        return conf
    }
    
}

export function runline(ind, cont="", config={}) {
    let splitter = "$("
    cont = cont.toString()
    if (cont.includes(splitter)) {
        cont = cont.split(splitter).map(l => { 
            let e = l.split(")")[0]
            return l.split(e+")").join(config[e] || splitter+l)
        }).join("")
    }

    return functions[ind](cont.split(" "), config)
}

export function chslang(code, config = {},funcs = Function) {
    code = code.split("useraw:")
    let lines = code.shift().split("\n").filter(e => !!(e) && !e.startsWith("//"))

    lines.forEach(line => {
        if (!line.startsWith("  ") && data.nowInFunction) {
            const con = data.functionContent
            funcs[data.nowFuncName] = function (cont, conf) {
                
                con.forEach(e => {
                    let Cont = (e.replace(/\$\(this\)/gi, cont.join(" "))).split(" ")
                    let Ind = Cont.shift()

                    runline(Ind,Cont.join(" "),conf)
                })

                return conf
            }
            data.nowInFunction = false
            data.nowFuncName = ""
            data.functionContent = []

        }

        if (line.startsWith("  ")) {
            if (data.nowInFunction) {
                data.functionContent.push(line.substring(2))

            }
        } else {

            // Define atributtes in the line
            let cont = line.split(" ")
            let ind = cont.shift()
            
            // Execute the line as simple one line function
            //console.log(ind)
            config = runline(ind,cont.join(" "),config)
        }
        

    })

    if(code.length > 0.1) {
        new Function("config","functions","runline",code.join("useraw:"))(config,funcs,runline)
    }

    return config
}

