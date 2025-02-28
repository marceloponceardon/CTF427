#include <stdio.h>
#include <string.h>

void secret_function() {
	printf("This is not the function you are looking for.\n");
}

void vulnerable_function(char *input) {
	char buffer[64]; // Buffer that can hold 64 bytes
	strcpy(buffer, input); // Vulnerable to buffer overflow
}

int main(int argc, char **argv) {
	if (argc != 2) {
		printf("Usage: %s <input>\n", argv[0]);
		return 1;
	}

	vulnerable_function(argv[1]);

	return 0;
}
