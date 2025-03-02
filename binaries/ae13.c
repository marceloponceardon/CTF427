#include <stdio.h>
#include <string.h>

char *something = "something";
char *something_else = "something_else";

void secret_function() {
	printf("vulnerabilities_are_c00l");
}

void vulnerable_function(char *input) {
	char buffer[8]; // Buffer that can hold 64 bytes
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
