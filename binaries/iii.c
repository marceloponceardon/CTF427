#include <stdio.h>

int addsquares(int a, int b) {
	int sum = 0;
	for (int i = a; i <= b; i++) {
		sum += i * i;
	}
	return sum;
}

int sum(int a, int b) {
	int sum = 0;
	for (int i = a; i <= b; i++) {
		sum += i;
	}
	return sum;
}

int print_fibonacci(int n) {
	int a = 0, b = 1, next;
	printf("Fibonacci sequence up to %d terms:\n", n);
	for (int i = 1; i <= n; i++) {
		next = a + b;
		a = b;
		b = next;
	}
	return next;
}

int main() {
	int terms;
	printf("Enter a number: ");
	scanf("%d", &terms);
	printf("%d\n", print_fibonacci(terms));
}
