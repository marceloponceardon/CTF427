#include <stdio.h>
#include <stdlib.h>

int main() {
	char filename[100];
	printf("Enter the file name to read: ");
	scanf("%s", filename);

	FILE *file = fopen(filename, "r");
	if (file == NULL) {
		printf("Error: Could not open file '%s'\n", filename);
		return 1;
	}

	printf("Reading file '%s'...\n", filename);
	printf("Done! But there's nothing interesting here.\n");

	fclose(file);
	return 0;
}
