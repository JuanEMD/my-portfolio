# Plan de Tests Unitarios

## Fase 1: Setup de Testing de Componentes React

**Dependencias a instalar:**
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event happy-dom @vitejs/plugin-react
```

**Configurar `vitest.config.mjs`:**
- Agregar plugin `@vitejs/plugin-react`
- `environment: 'happy-dom'`
- `setupFiles: ['./src/test/setup.js']`

**Crear `src/test/setup.js`:**
```js
import '@testing-library/jest-dom'
```

---

## Fase 2: Tests de Funciones Puras (sin mocks)

### 2.1 `src/utils/validations.test.js` ✅ (ya existe, mejorar cobertura)
- Agregar más edge cases:
  - Emails con caracteres especiales válidos (`user+tag@example.com`)
  - Campos con espacios en blanco
  - Campos muy largos (boundary values)

### 2.2 `src/context/ThemeContext.test.jsx` (nuevo)
**Tests para `toggleTheme`:**
```js
describe("toggleTheme", () => {
  test("cycles from light to dark")
  test("cycles from dark to system")
  test("cycles from system to light")
  test("persists theme to localStorage")
})

describe("useTheme", () => {
  test("throws error when used outside ThemeProvider")
})
```

---

## Fase 3: Tests de Hooks

### 3.1 `src/features/contact/useContactForm.test.js` (nuevo)
**Mockear `fetch`:**
```js
describe("handleSubmit", () => {
  describe("successful submission", () => {
    test("calls API with correct data")
    test("sets success state on 200 response")
    test("calls onSuccess callback")
    test("clears form after success")
  })
  
  describe("failed submission", () => {
    test("sets error state on 500 response")
    test("handles network errors gracefully")
    test("does not call onSuccess on failure")
  })
  
  describe("loading state", () => {
    test("sets isPending to true during request")
    test("sets isPending to false after request completes")
  })
})
```

---

## Fase 4: Tests de Servicios

### 4.1 `src/services/send-email/index.test.js` (nuevo)
**Mockear Resend:**
```js
describe("sendEmail", () => {
  describe("successful send", () => {
    test("returns success object when email sends")
    test("includes correct subject line")
    test("formats HTML body correctly")
  })
  
  describe("failed send", () => {
    test("returns error object when Resend API fails")
    test("handles unexpected exceptions")
  })
})
```

### 4.2 `src/pages/api/contact.test.js` (nuevo)
**Mockear req/res y sendEmail:**
```js
describe("POST /api/contact", () => {
  test("returns 405 for non-POST methods")
  test("returns 200 on successful email send")
  test("returns 500 on email send failure")
  test("calls sendEmail with correct data")
})
```

---

## Fase 5: Tests de Componentes (requiere setup de Fase 1)

### 5.1 Componentes de Formulario
**`src/features/contact/ContactForm.test.jsx`:**
```js
describe("ContactForm", () => {
  describe("rendering", () => {
    test("renders all input fields")
    test("renders submit button")
  })
  
  describe("validation", () => {
    test("shows error messages after blur")
    test("prevents submit with invalid data")
    test("clears errors after valid input")
  })
  
  describe("submission", () => {
    test("calls onSubmit with form data")
    test("clears form after successful submission")
    test("shows loading state during submission")
    test("shows success message on success")
    test("shows error message on failure")
  })
})
```

### 5.2 Componentes de Modal
**`src/features/projects/ProjectModal.test.jsx`:**
```js
describe("ProjectModal", () => {
  test("renders project title and company")
  test("displays all skill pills")
  test("renders highlights list")
  test("calls onClose when close button clicked")
  test("closes on backdrop click")
})
```

### 5.3 Componentes de Navegación
**`src/features/navbar/index.test.jsx`:**
```js
describe("Navbar", () => {
  test("renders all navigation links")
  test("highlights active section")
  test("closes mobile menu after link click")
})
```

### 5.4 Componentes Comunes
**`src/components/common/button/index.test.jsx`:**
```js
describe("Button", () => {
  test("renders children")
  test("calls onClick when clicked")
  test("is disabled when disabled prop is true")
  test("applies custom className")
})
```

---

## Fase 6: Tests de Páginas (API Routes)

### 6.1 `src/pages/sitemap.xml.test.js` (nuevo)
**Mockear getServerSideProps:**
```js
describe("sitemap.xml", () => {
  test("generates valid XML")
  test("includes all routes")
  test("sets correct cache headers")
})
```

---

## Prioridades de Ejecución

| Fase | Prioridad | Esfuerzo | Cobertura |
|------|-----------|----------|-----------|
| 1 | 🔴 Alta | 10 min | Habilita Fases 5-6 |
| 2 | 🔴 Alta | 30 min | Funciones puras |
| 3 | 🟡 Media | 45 min | Lógica de negocio |
| 4 | 🟡 Media | 30 min | Integraciones |
| 5 | 🟢 Baja | 2 horas | UI/UX |
| 6 | 🟢 Baja | 30 min | SEO |

---

## Estructura de Archivos Final

```
src/
├── test/
│   └── setup.js
├── utils/
│   ├── validations.js
│   └── validations.test.js ✅
├── context/
│   ├── ThemeContext.jsx
│   └── ThemeContext.test.jsx
├── features/
│   ├── contact/
│   │   ├── useContactForm.js
│   │   ├── useContactForm.test.js
│   │   ├── ContactForm.jsx
│   │   └── ContactForm.test.jsx
│   └── projects/
│       └── ProjectModal.test.jsx
├── services/
│   └── send-email/
│       ├── index.js
│       └── index.test.js
└── pages/
    └── api/
        ├── contact.js
        └── contact.test.js
```
