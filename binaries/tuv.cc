#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
	srand(time(NULL)); // Seed random number generator
	printf("%d %d %d %d %d %d %d %d %d %d\n", rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand());
	printf("suckers\n");
	return 0;
}
