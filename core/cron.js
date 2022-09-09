const tasks = []
let cronTimeout = 3000

function startCron(){
    onTimeout()
}

async function onTimeout(){
    for(const k in tasks){
        const task = tasks[k]
        try{
            await task()
        }
        catch{}
    }

    setTimeout(onTimeout, cronTimeout)
}

function appendTask(task){
    tasks.push(task)
}

module.exports = {
    startCron,
    appendTask    
}