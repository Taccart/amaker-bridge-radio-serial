function update_radio_group(i: number) {
    
    let radio_group_max = 0
    radio_group += i
    if (radio_group >= radio_group_max) {
        radio_group = radio_group_min
    } else if (radio_group < radio_group_min) {
        radio_group = radio_group_max
    }
    
    console.log("radio.set_group(" + ("" + ("" + radio_group)) + ")")
    radio.setGroup(radio_group)
    basic.showString("" + ("" + radio_group))
}

//  This code convert serial to radio and radio to signal
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    update_radio_group(-1)
})
radio.onReceivedString(function on_received_string(receivedString: string) {
    serial.writeString(receivedString)
})
//  This code convert serial to radio
//  
//  and radio to signal
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    update_radio_group(1)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function on_data_received() {
    radio.sendString(serial.readLine())
})
let radio_group_max = 8
let radio_group_min = 0
let radio_group = 0
serial.redirectToUSB()
radio_group = radio_group_min
radio.setGroup(radio_group)
console.log("Set RadioGroup via button A (inc) and B (dec)")
console.log("This micro:bit is " + control.deviceName())
