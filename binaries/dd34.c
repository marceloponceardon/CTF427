#include <stdio.h>
#include <stdlib.h>
#include <time.h>

char *hmmm = "This is a string";
char *hmm2 = "This is another string";
char *hmm3 = "This is yet another string";

void something() {
	printf("This is a function\n");
	printf("%s %s %s\n", hmmm, hmm2, hmm3);
}

int main() {
	srand(time(NULL)); // Seed random number generator
	int random_num = rand() % 100;
	printf("Generated random number: %d\n", random_num);
	return 0;
}
