const Message = require('./Message')

class Terrain extends Message {
    constructor() {
        super('terrain');

        this._data = {
            mode: 'normal'
        }
        this._prevData = {}
    }

    parseMessage = (message) => {
        let data = message.readUint8(6)
        switch (data) {
            case data & 1:
                this.data.mode = "normal"
                break
            case data & 2:
                this.data.mode = "snow"
                break
            case data & 3:
                this.data.mode = "mud"
                break
            case data & 4:
                this.data.mode = "sand"
                break
            default:
                this.data.mode="normal"
                break
        }
        this._compare()
    };
}

module.exports = Terrain