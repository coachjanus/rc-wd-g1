import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // Базові рекомендовані правила для TypeScript
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Вмикаємо Prettier як правило ESLint (помилки форматування будуть червоними)
      'prettier/prettier': 'error',
      
      // Тут можна додати власні правила, наприклад:
      '@typescript-eslint/no-explicit-any': 'warn', // Попереджувати про використання `any`
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Помилка, якщо є невикористані змінні
    },
  },
  // Вимикаємо конфліктні правила (має бути останнім в масиві)
  eslintConfigPrettier
);


