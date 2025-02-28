#include <stdio.h>

int complex_logic(int x) {
    return (x * 7 + 13) * 9 - 42;
}

int main() {
    int result = complex_logic(1000);
    printf("INFO: %d", result);
    result = complex_logic(result);
    printf("INFO: %d", result);
    result = complex_logic(result);
    printf("INFO: %d", result);
    return 0;
}
