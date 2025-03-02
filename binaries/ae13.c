#include <stdio.h>
#include <string.h>

char *something = "something";
char *something_else = "something_else";

void copier(const char *src, char *dst) {
	int i = 0;
	while (src[i] != '\n') {
		dst[i] = src[i];
		i++;
	}
}

void secret_function() {
	printf("adm1ns0nly\n");
}

void vulnerable_function(char *input) {
	char buffer[8]; // Buffer of size 8
	strcpy(buffer, input); // Copy input to buffer
}

int main(int argc, char **argv) {
	if (argc != 2) {
		printf("Usage: %s <input>\n", argv[0]);
		printf("(<input> should be less than 8 characters!)\n");
		return 1;
	}
	vulnerable_function(argv[1]);

	return 0;
}
