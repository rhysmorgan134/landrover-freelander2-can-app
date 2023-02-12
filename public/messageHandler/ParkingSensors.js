const Message = require('./Message')

class ParkingSensors extends Message {
    constructor() {
        super('parkingSensors');

        this._data = {
                parkingActive: false,
                frontLeft: 0,
                frontLeftMiddle: 0,
                frontRightMiddle: 0,
                frontRight:0,
                rearLeft: 0,
                rearLeftMiddle: 0,
                rearRightMiddle: 0,
        }
        this._prevData = {}
    }

    parseMessage = (message) => {
        this.data.parkingActive = message.readUint8(0) & 64
        if(this.data.parkingActive) {
            let tempData = message.readUint32BE(1)
            tempData = ((tempData << 12) >>> 12)
            let mask = 31
            this._data.rearLeft = tempData & mask
            this._data.rearRight = (tempData >>> 15) & mask
            this._data.rearLeftMiddle = (tempData >>> 5) & mask
            this._data.rearRightMiddle = (tempData >>> 10) & mask
            tempData = message.readUint32BE(4)
            tempData = ((tempData << 12) >>> 12)
            this._data.frontLeft = tempData & mask
            this._data.frontRight = (tempData >>> 10) & mask
            this._data.frontLeftMiddle = (tempData >>> 5) & mask
            this._data.frontRightMiddle = (tempData >>> 15) & mask
        } else {
            this._data.frontLeft = 0
            this._data.frontRight = 0
            this._data.frontLeftMiddle = 0
            this._data.frontRightMiddle = 0
            this._data.rearLeft = 0
            this._data.rearRight = 0
            this._data.rearLeftMiddle = 0
            this._data.rearRightMiddle = 0
        }
        this._compare()
    };
}

module.exports = ParkingSensors