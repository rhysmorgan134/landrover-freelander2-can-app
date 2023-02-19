const Message = require('./Message')

class Revs extends Message {
    constructor() {
        super('revs');

        this._data = {
            revs: 0
        }
        this._prevData = {}
    }

    parseMessage = (message) => {
        //console.log(message)
        this._data.revs = (message.readUint16BE(3) &~ 57344)
        //console.log(this._data.revs)

        this._compare()
    };
}

module.exports = Revs