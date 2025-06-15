
> Open this page at [https://taccart.github.io/amaker-bridge-radio-serial/](https://taccart.github.io/amaker-bridge-radio-serial/)

This micro:bit project is a bridge between USB and radio.
1. Serial communication is set to USB
1. Radio channel is set to 0
1. All strings received on `serial` (USB) are emitted on `radio`
1. All strings received on `radio` are emitted on `serial` (USB)
To change radio channel, button A decrements and button B increments in the range 0->8


USB Serial speed is set to 115200, 8 bit data 1 stop.
To read serial from USB in linux, assuming `/dev/ttyACM0` corresponds to the connected microb:bit
1. set the speed
```bash
stty -F /dev/ttyACM0 115200
```
2. listen with cat
```bash
cat /dev/ttyACM0
```

Example of serial messages received:
```
tizit_-1210158282 is Radio-Serial bridge listening on 0
Set RadioGroup via button A (inc) and B (dec)
tizit_-1210158282 is Radio-Serial bridge listening on 1
```