function update_radio_group (i: number) {
    radio_group += i
    if (radio_group >= radio_group_max) {
        radio_group = radio_group_min
    } else if (radio_group < radio_group_min) {
        radio_group = radio_group_max
    }
    basic.showNumber(radio_group)
    radio.setGroup(radio_group)
    broadcast_bridge_info()
}
// This code convert serial to radio and radio to signal
input.onButtonPressed(Button.A, function () {
    update_radio_group(-1)
})
radio.onReceivedString(function (receivedString) {
    serial.writeString(receivedString)
    console.log("radio->serial " + receivedString)
})
// This code convert serial to radio
// 
// and radio to signal
input.onButtonPressed(Button.B, function () {
    update_radio_group(1)
})
function broadcast_bridge_info () {
    msg = "" + control.deviceName() + "_" + ("" + control.deviceSerialNumber()) + " is Radio-Serial bridge listening on " + ("" + radio_group)
    console.log(msg)
radio.sendString(msg)
    serial.writeString(msg)
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    msg2 = serial.readLine()
    radio.sendString(msg2)
    console.log("serial->radio " + msg2)
})
let radio_group_min = 0
let radio_group = 0
let radio_group_max = 0
let msg = ""
let msg2 = ""
radio_group_max = 8
serial.redirectToUSB()
radio_group = radio_group_min
radio.setGroup(radio_group)
basic.showNumber(radio_group)
broadcast_bridge_info()
console.log("Set RadioGroup via button A (inc) and B (dec)")
