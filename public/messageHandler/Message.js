const {EventEmitter} = require('events')
const _ = require('lodash');

class Message extends EventEmitter {
    constructor(name) {
        super();

        this.name = name
        this._data = {}
        this._prevData = {}
    }

    parseMessage(data) {

    }

    get data() {
        return this._data
    }

    _compare() {
        if(!(_.isMatch(this._data, this._prevData))) {
            //console.log("data changed", this._data)
            this.emit('data', {name: this.name, data: this._data})
        }
        this._prevData = _.cloneDeep(this.data)
    }

}

module.exports = Message