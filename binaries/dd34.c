#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
	srand(time(NULL)); // Seed random number generator
	int random_num = rand() % 100;
	printf("Generated random number: %d\n", random_num);
	return 0;
}
