# Test Agent

## Configuración del Proyecto

- **Framework:** Vitest 3.x
- **Config:** `vitest.config.mjs`
  - `globals: true` (no imports de test/describe/expect)
  - `restoreMocks: true` (limpia mocks automáticamente)
  - Alias `@` → `./src`
- **Comandos:**
  - `pnpm test` — watch mode (desarrollo)
  - `pnpm test --run` — single run (CI)

## Estructura de Tests

**Co-located:** Tests junto al código que prueban
```
src/utils/
├── validations.js
└── validations.test.js
src/features/projects/
├── ProjectCard.jsx
└── ProjectCard.test.jsx
```

## Reglas Vitest (NO Jest)

- Usar `vi.fn()`, `vi.mock()`, `vi.spyOn()` — **nunca** `jest.*`
- Mocks con `import()`: `vi.mock(import('./module'))` en vez de strings
- No agregar imports de `test`, `describe`, `expect` (globals enabled)

## Convenciones de Nombres

**Cortos y descriptivos del comportamiento:**
```js
test("formats USD prices")
test("throws for negative amounts")
test("returns empty array when no items match")
```

## Jerarquía de Testing de Componentes

```
1. Critical User Paths → Always test
2. Error Handling → Test failure scenarios
3. Edge Cases → Empty data, extreme values
4. Accessibility → Screen readers, keyboard nav
5. Performance → Large datasets, animations
```

## Principios de Mocking

- **Solo mockear cuando:** lo real es lento, flaky, o tiene side effects incontrolables
- **Preferir implementaciones reales** cuando sea posible
- **Para API calls:** considerar MSW (Mock Service Worker) si se configura

## Tests de Componentes React

**Ejemplo:**
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test("opens modal when clicking view details", async () => {
  render(<ProjectCard project={mockProject} />)
  await userEvent.click(screen.getByRole('button', { name: /view details/i }))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
```

## Estructura de Tests

```js
describe("functionName", () => {
  describe("valid inputs", () => {
    test("handles normal case")
    test("handles edge case")
  })
  describe("invalid inputs", () => {
    test("throws for missing required field")
    test("throws for invalid format")
  })
})
```

## Tips para Prompts Efectivos

- Ser específico sobre qué función/escenarios testear
- Pedir edge cases explícitamente
- Mencionar features de Vitest: `test.each`, `toMatchInlineSnapshot`
- Referenciar tests existentes como estilo: "Follow the same style as validations.test.js"
