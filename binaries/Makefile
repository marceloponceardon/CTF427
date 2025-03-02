CC = gcc
CFLAGS = -g -fno-stack-protector -z execstack -no-pie  # Vulnerable flags for exploitation

# List of source files to compile
SOURCES = ae13.c aa14.c bb10.c cc20.c dd34.c fhg99.c iii.c tuv.c zzyy.c
PROGRAMS = $(SOURCES:.c=.exe)  # Convert .c to .exe for the output names

# Default rule to compile all programs
all: $(PROGRAMS)

# Rule to compile each .c source file to a .exe executable
%.exe: %.c
	$(CC) $(CFLAGS) $(LDFLAGS) -o $@ $<

# Clean rule to remove the compiled executables
clean:
	rm -f $(PROGRAMS)
