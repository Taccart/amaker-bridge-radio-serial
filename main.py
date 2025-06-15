def broadcast_bridge_info():
    
    msg = control.device_name() +"_"+str(control.device_serial_number())+" is Radio-Serial bridge listening on "+str(radio_group)
    print(msg)
    radio.send_string(msg )
    serial.write_string(msg)

def update_radio_group(i: number):
    global radio_group
    radio_group += i
    if radio_group >= radio_group_max:
        radio_group = radio_group_min
    elif radio_group < radio_group_min:
        radio_group = radio_group_max
    basic.show_number(radio_group)
    radio.set_group(radio_group)
    broadcast_bridge_info()
# This code convert serial to radio and radio to signal

def on_button_pressed_a():
    update_radio_group(-1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_radio_received_string(receivedString):
    serial.write_string(receivedString)
    print ("radio->serial "+receivedString)
radio.on_received_string(on_radio_received_string)

# This code convert serial to radio
# 
# and radio to signal

def on_button_pressed_b():
    update_radio_group(1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_serial_data_received():
    msg=serial.read_line()
    radio.send_string(msg)
    print ("serial->radio "+msg)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_serial_data_received)

radio_group_max = 8
radio_group_min = 0
radio_group = 0
serial.redirect_to_usb()
radio_group = radio_group_min
radio.set_group(radio_group)
broadcast_bridge_info()
print("Set RadioGroup via button A (inc) and B (dec)")
