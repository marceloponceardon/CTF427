#include <stdio.h>

int secret_function(int x) {
    return x * 2;
}

int foo(int x) {
    return (x * 7 + 13) * 9 - 42;
}

int main() {
    int result = foo(1000);
    printf("INFO: %d ", result);
    result = foo(result);
    printf("INFO: %d ", result);
    result = foo(result);
    printf("INFO: %d\n", result);
    return 0;
}
