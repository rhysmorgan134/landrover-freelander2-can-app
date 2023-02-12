
const modules = require('./modules.json').mediumSpeed
const ParkingSensors = require('./ParkingSensors')
const SocketDev = require('./SocketDev')
const Terrain = require("./Terrain");
const Revs = require("./Revs");

class MediumSpeed {
    constructor(io) {
        this._modules = {}
        this._map = {}
        this.io = io
        this._modules['parkingSensors'] = new ParkingSensors('parkingSensors')
        this._modules['terrain'] = new Terrain('terrain')
        this._modules['revs'] = new Revs('revs')
        this._map[modules.parkingSensors] = 'parkingSensors'
        this._map[modules.terrain] = 'terrain'
        this._map[modules.revs] = 'revs'
        this.socketDev = new SocketDev(this.parseMessage.bind(this))
        Object.keys(this._modules).forEach((module) => {
            this._modules[module].on('data', (data) => {
                this.io.emit(data.name, data.data)
            })
        })

        this.io.on('devMessage', (data) => {
            this.socketDev.feedData(data)
        })
    }

    parseMessage(data, id) {
        if(Object.keys(this._map).includes(id.toString())) {
            this._modules[this._map[id]].parseMessage(data)
        }
    }
}

module.exports = MediumSpeed