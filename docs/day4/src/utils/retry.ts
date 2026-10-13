export async function retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number
): Promise<T> {
    let lastError: unknown;

    for (let i = 1; i <= maxAttempts; i++) {
        try {
            const result = await operation();
            return result;
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i} failed: ${(error as Error).message}`);
            
            if (i === maxAttempts) {
                console.log(`All ${maxAttempts} attempts failed`);
                throw error;
            }
        }
    }
    throw lastError;
}