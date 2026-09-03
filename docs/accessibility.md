# Accessibility Implementations

## Fuentes

| Recurso | URL |
|---------|-----|
| WCAG 2.1 Quick Reference | https://www.w3.org/WAI/WCAG21/quickref/ |
| WAI-ARIA Authoring Practices | https://www.w3.org/WAI/ARIA/apg/patterns/forms/ |
| MDN - ARIA Forms | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/form_role |
| WebAIM - Forms | https://webaim.org/techniques/forms/ |
| The A11y Project | https://www.a11yproject.com/checklist/ |
| Inclusive Components | https://inclusive-components.design/ |

---

## ContactForm

### StatusMessage - `role="alert"` y `aria-live`

**Archivos:** `src/components/Message/StatusMessage.jsx`

**Cambio:** Agregados `role`, `aria-live` e `id` al componente.

**Criterio WCAG:** 4.1.3 Status Messages (AA)

**Por que:** Los lectores de pantalla anuncian automaticamente mensajes de error (`assertive`) y de estado (`polite`) sin requerir foco manual.

---

### TextInput / Textbox - Estructura y Atributos ARIA

**Archivos:** `src/components/common/input/TextInput.jsx`, `src/components/common/input/Textbox.jsx`

**Cambio:** Reestructuracion del componente. El `<label>` y el `<input>` ahora son hermanos (no anidados), asociados via `htmlFor`/`id`. Nuevos props `required`, `error`, `errorId`, `autoComplete`. Se renderizan:
- `aria-required` en campos obligatorios
- `aria-invalid` cuando hay error
- `aria-describedby` apuntando al id del mensaje de error
- Indicador visual `*` con `aria-hidden="true"` dentro del `<label>`

**Criterios WCAG:** 3.3.1 Error Identification (A), 3.3.2 Labels or Instructions (A)

**Por que:**
- Separar `<label>` e `<input>` mantiene el nombre accesible limpio (sin el `*`)
- `aria-hidden="true"` en el `*` lo excluye del nombre accesible
- Los lectores de pantalla asocian el error con el campo especifico y anuncian que el campo es invalido

---

### ContactForm - Error association y focus management

**Archivo:** `src/features/contact/ContactForm.jsx`

**Cambios:**
1. Cada campo pasa `required`, `error`, `errorId` al input
2. Cada `StatusMessage` recibe `id` para ser referenciado por `aria-describedby`
3. Email input usa `type="email"` y `autoComplete="email"`
4. Mensajes de estado globales envueltos en `<div aria-live="polite" aria-atomic="true">`
5. Focus management: al submit invalido, el foco se mueve al primer campo con error

**Criterios WCAG:** 1.3.1 Info and Relationships (A), 2.4.3 Focus Order (A), 3.3.1 Error Identification (A), 4.1.3 Status Messages (AA)

**Por que:**
- `type="email"` activa validacion nativa del navegador y teclado optimizado en mobile
- `aria-describedby` conecta el error con el campo para lectores de pantalla
- Focus management guia al usuario al primer error despues de un submit invalido
- `aria-live` anuncia mensajes de exito/error sin requerir interaccion del usuario
