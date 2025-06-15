def update_radio_group(i: number):
    global radio_group
    radio_group_max = 0
    radio_group += i
    if radio_group >= radio_group_max:
        radio_group = radio_group_min
    elif radio_group < radio_group_min:
        radio_group = radio_group_max
    print("radio.set_group(" + ("" + str(radio_group)) + ")")
    radio.set_group(radio_group)
    basic.show_string("" + str((radio_group)))
# This code convert serial to radio and radio to signal

def on_button_pressed_a():
    update_radio_group(-1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    serial.write_string(receivedString)
radio.on_received_string(on_received_string)

# This code convert serial to radio
# 
# and radio to signal

def on_button_pressed_b():
    update_radio_group(1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_data_received():
    radio.send_string(serial.read_line())
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

radio_group_max = 8
radio_group_min = 0
radio_group = 0
serial.redirect_to_usb()
radio_group = radio_group_min
radio.set_group(radio_group)
console.log("Set RadioGroup via button A (inc) and B (dec)")