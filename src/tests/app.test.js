
// Basic test file for CI/CD workflow

describe('App initialization', () => {
  // Simple smoke test to check if tests are working
  test('should pass a dummy test', () => {
    expect(true).toBe(true);
  });
  
  // Check if basic math works to ensure test environment is functional
  test('basic math should work', () => {
    expect(1 + 1).toBe(2);
  });
});
