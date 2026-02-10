# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Testing with Vitest

This project uses Vitest for testing, which provides native ESM and Vite integration. The following features are set up:

- TypeScript support out of the box
- React Testing Library for component testing
- Jest DOM for DOM testing utilities (compatible with Vitest)
- Automatic mocking of the IntersectionObserver API

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Writing Tests

Tests should be placed in `__tests__` directories or named with `.test.ts` or `.spec.ts` extensions. For React components, use `.test.tsx` or `.spec.tsx`.

Example test for a React component:

```tsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TestWrapper from '../TestWrapper';

describe('TestWrapper', () => {
  it('renders children correctly', () => {
    render(
      <TestWrapper>
        <div data-testid="test-child">Test Child</div>
      </TestWrapper>
    );

    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });
});
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
