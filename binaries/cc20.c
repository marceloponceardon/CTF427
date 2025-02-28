#include <stdio.h>

int main() {
	int num1, num2;
	char operator;

	printf("Enter calculation (e.g. 5 + 3): ");
	scanf("%d %c %d", &num1, &operator, &num2);

	if (operator == '+')
		printf("%d + %d = %d\n", num1, num2, num1 + num2);
	else if (operator == '-')
		printf("%d - %d = %d\n", num1, num2, num1 - num2);
	else if (operator == '*')
		printf("%d * %d = %d\n", num1, num2, num1 * num2);
	else if (operator == '/')
		printf("%d / %d = %f\n", num1, num2, (float)num1 / num2);
	else
		printf("Unknown operator.\n");

	return 0;
}
