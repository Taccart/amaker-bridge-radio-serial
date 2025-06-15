function broadcast_bridge_info() {
    let msg = control.deviceName() + "_" + ("" + control.deviceSerialNumber()) + " is Radio-Serial bridge listening on " + ("" + radio_group)
    console.log(msg)
    radio.sendString(msg)
    serial.writeString(msg)
}

function update_radio_group(i: number) {
    
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

//  This code convert serial to radio and radio to signal
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    update_radio_group(-1)
})
radio.onReceivedString(function on_radio_received_string(receivedString: string) {
    serial.writeString(receivedString)
    console.log("radio->serial " + receivedString)
})
//  This code convert serial to radio
//  
//  and radio to signal
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    update_radio_group(1)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function on_serial_data_received() {
    let msg = serial.readLine()
    radio.sendString(msg)
    console.log("serial->radio " + msg)
})
let radio_group_max = 8
let radio_group_min = 0
let radio_group = 0
serial.redirectToUSB()
radio_group = radio_group_min
radio.setGroup(radio_group)
broadcast_bridge_info()
console.log("Set RadioGroup via button A (inc) and B (dec)")
