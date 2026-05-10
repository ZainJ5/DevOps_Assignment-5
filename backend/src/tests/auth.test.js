const bcrypt = require('bcrypt');

describe('Auth Unit Tests', () => {
  test('should hash password correctly', async () => {
    const password = 'Test1234';
    const hash = await bcrypt.hash(password, 10);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
  });

  test('should verify correct password', async () => {
    const password = 'Test1234';
    const hash = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, hash);
    expect(isMatch).toBe(true);
  });

  test('should reject wrong password', async () => {
    const password = 'Test1234';
    const hash = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare('WrongPassword', hash);
    expect(isMatch).toBe(false);
  });
});
