class SocketDev {
    constructor(parseMessage) {
        this.data = []
        this.cycle = 0
        this.parseMessage = parseMessage
    }

    async feedData (data) {
        let lines = data.split("\n")
        lines.forEach((d) => {
            let temp = {}
            let values = d.split(" ")
            let t = values[0].replace("(", "").replace(")", "")
            if(values.length === 3) {
                temp.time = Math.floor(t * 1000)
                temp.id = parseInt(values[2].split("#")[0], 16)
                temp.data = Buffer.from(values[2].split("#")[1], 'hex')
                this.data.push(temp)
            }

        })
        this.run()
    }

    run() {
        this.cycle += 1
        this.parseMessage(this.data[this.cycle].data, this.data[this.cycle].id)
        if(this.cycle < this.data.length -1) {
            setTimeout(() => this.run(this.cycle), this.data[this.cycle].time - this.data[this.cycle-1].time)
        } else {
            console.log("finished")
            this.data = []
        }
    }
}

module.exports = SocketDev