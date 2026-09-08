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

## Descripción general

La accesibilidad se maneja de forma estructural en todo el proyecto siguiendo WCAG 2.1 (nivel AA). El enfoque se basa en cuatro principios:

1. **HTML semántico primero**: se usan landmarks y elementos nativos (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`, `<p>`, `<button>`, `<a>`) antes de recurrir a ARIA. Esto evita reimplementar comportamiento nativo del navegador.
2. **ARIA solo donde el HTML no alcanza**: atributos como `aria-label`, `aria-expanded`, `aria-controls`, `aria-modal`, `aria-live`, `aria-required`, `aria-invalid` y `aria-describedby` se agregan para comunicar estado y relaciones que el HTML semántico no puede expresar.
3. **Navegación por teclado completa**: diálogos implementan focus trap y restauración de foco, y todos los componentes interactivos son operables con teclado (Tab, Shift+Tab, Escape).
4. **Soporte para lectores de pantalla**: nombres accesibles explícitos en botones con solo ícono, mensajes de estado anunciados de forma proactiva (`aria-live`), textos alternativos en imágenes e íconos decorativos ocultos con `aria-hidden="true"`.

El resto de este documento documenta cada implementación concreta, los archivos involucrados y el criterio WCAG que satisface.

---

## Navegación

### Navbar - Landmarks y menú responsive

**Archivo:** `src/features/navbar/index.jsx`

**Implementación:**
- `<header>` y `<nav>` con `aria-label` que distingue navegación principal (`nav.main`) de las secciones (`nav.sections`).
- Botón de menú móvil con `aria-expanded`, `aria-controls="mobile-menu"` y `aria-label` dinámico que alterna entre abrir/cerrar.
- Íconos de menú/cerrar con `aria-hidden="true"` (decorativos).
- `<ul>`/`<li>` para listas de enlaces, e indicador visual de idioma oculto a lectores con `aria-hidden="true"`.

**Criterios WCAG:** 1.3.1 Info and Relationships (A), 2.4.3 Focus Order (A), 4.1.2 Name, Role, Value (A)

**Por que:** los lectores de pantalla pueden saltar entre landmarks, el estado del menú (abierto/cerrado) se comunica via `aria-expanded`, y el `aria-label` del botón cambia según el estado en lugar de depender de un ícono mudo.

---

### NavLink / HomeLink - Nombres accesibles en enlaces

**Archivos:** `src/features/navbar/NavLink.jsx`, `src/features/navbar/HomeLink.jsx`

**Implementación:** ambos componentes aceptan un prop `label` que se renderiza como `aria-label`. El logo de inicio y los enlaces de sección reciben nombres accesibles explícitos (traducidos via i18n).

**Criterio WCAG:** 2.4.4 Link Purpose (In Context) (A)

**Por que:** el logo es una imagen con su propio `alt`, y el `aria-label` garantiza que el propósito de cada enlace se anuncie correctamente en ambos idiomas.

---

## Componentes de UI

### Modal - Diálogo con focus trap y restauración de foco

**Archivo:** `src/components/modal/index.jsx`

**Implementación:**
- `role="dialog"`, `aria-modal="true"` y `aria-label={title}` en el contenedor del diálogo.
- Focus trap: Tab y Shift+Tab ciclan el foco entre el primer y último elemento enfocable del panel; si no hay elementos enfocables, el foco va al propio panel (`tabIndex={-1}`).
- Escape cierra el diálogo y remueve el listener de teclado.
- Restauración de foco: al abrir se guarda `document.activeElement` y al cerrar el foco regresa al elemento que lo abrió (útil para el flujo de proyectos).

**Criterios WCAG:** 1.3.1 Info and Relationships (A), 2.1.1 Keyboard (A), 2.1.2 No Keyboard Trap (A), 2.4.3 Focus Order (A), 4.1.2 Name, Role, Value (A)

**Por que:** un diálogo debe ser anunciado como tal (`role="dialog"`), bloquear el foco dentro de sí para no perder al usuario, permitir cerrarse con Escape y devolver el foco al origen para que el usuario continúe donde estaba.

---

### ButtonWithIcon / LinkButtonWithIcon / ThemeToggle - Nombres accesibles dinámicos

**Archivos:** `src/components/common/button/ButtonWithIcon.jsx`, `src/components/common/button/LinkButtonWithIcon.jsx`, `src/components/ThemeToggle.jsx/index.jsx`

**Implementación:**
- Botones con solo ícono reciben `aria-label` explícito via el prop `ariaLabel`.
- ThemeToggle calcula el `aria-label` según el tema actual (`theme.switchToLight` / `theme.switchToSystem` / `theme.switchToDark`) para que el lector anuncie hacia donde cambiará el tema, no el ícono mostrado.
- LinkButtonWithIcon con `target="_blank"` agrega `rel="noopener noreferrer"`.

**Criterios WCAG:** 2.4.4 Link Purpose (A), 3.2.5 Change on Request (A), 4.1.2 Name, Role, Value (A)

**Por que:** un botón con solo un SVG no tiene nombre accesible por defecto; el `aria-label` dinámico de ThemeToggle describe la acción (no el ícono), y `rel="noopener noreferrer"` mitiga la apertura de ventanas nuevas.

---

### SectionContainer - Secciones semánticas navegables

**Archivo:** `src/components/sectionContainer/index.jsx`

**Implementación:** renderiza `<section id={id}>` permitiendo que cada bloque de contenido sea un landmark con un `id` estable. Los enlaces de navegación apuntan a estos `id` (anclas).

**Criterio WCAG:** 1.3.1 Info and Relationships (A), 2.4.1 Bypass Blocks (A)

**Por que:** los enlaces de ancla del navbar (`#id`) navegan a las secciones correctas y los lectores de pantalla pueden listar los landmarks de la página.

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

---

## Contenido

### PersonalInfo - Jerarquía de encabezados e imagen alt

**Archivo:** `src/features/personalinfo/index.jsx`

**Implementación:**
- Jerarquía semántica de encabezados: `<h1>` para el nombre y `<h2>` para el rol.
- Imagen de perfil con `alt="Profile picture"` descriptivo.
- Botones de contacto (mailto, LinkedIn, GitHub) con `aria-label` explícito via LinkButtonWithIcon.
- El texto destacado del párrafo se envuelve en `<span>` manteniendo el contenido legible.

**Criterios WCAG:** 1.1.1 Non-text Content (A), 1.3.1 Info and Relationships (A), 2.4.4 Link Purpose (A)

**Por que:** la jerarquía de encabezados permite a los lectores de pantalla navegar la estructura de la página, el `alt` identifica la imagen y los enlaces con ícono tienen nombre accesible.

---

### Footer - Enlaces con nombre accesible

**Archivo:** `src/features/footer/index.jsx`

**Implementación:** enlaces a mailto, LinkedIn y GitHub con `aria-label` traducido (`footer.sendEmail`, `footer.linkedinProfile`, `footer.githubProfile`) via LinkButtonWithIcon. Detalles de contacto en `<span>`.

**Criterio WCAG:** 1.3.1 Info and Relationships (A), 2.4.4 Link Purpose (A)

**Por que:** los enlaces con solo ícono necesitan un nombre accesible explícito y traducido para anunciar correctamente su destino.

---

### EducationCard / ExperienceCard / ProjectCard - Estructura semántica de contenido

**Archivos:** `src/features/education/EducationCard.jsx`, `src/features/experiences/ExperienceCard.jsx`, `src/features/projects/ProjectCard.jsx`

**Implementación:**
- Títulos de tarjeta en `<h3>` (respetan la jerarquía tras `<h1>`/`<h2>` del personal info).
- Descripciones y detalles en `<p>` y `<span>`.
- ProjectCard usa `<button>` nativo para "View details" (no un `<div>` clicable) y `<a>` para los enlaces de preview; el modal resultante usa el componente Modal con focus trap documentado arriba.
- Botones de acción solo con ícono conservan texto visible (`<span>`), con el SVG como decorativo.

**Criterios WCAG:** 1.1.1 Non-text Content (A), 1.3.1 Info and Relationships (A), 2.1.1 Keyboard (A), 4.1.2 Name, Role, Value (A)

**Por que:** los elementos nativos (`<button>`, `<a>`) proporcionan soporte de teclado y anunciación gratuitos, y la jerarquía de encabezados coherente facilita la navegación por estructura.

---

### Carousel - Texto alternativo en imágenes

**Archivo:** `src/components/carousel/index.jsx`

**Implementación:** cada imagen del carousel usa `alt={title}` para que el lector de pantalla anuncie el contenido de la tarjeta.

**Criterio WCAG:** 1.1.1 Non-text Content (A)

**Por que:** la animación infinita es decorativa y el contenido real es la imagen/tecnología mostrada; el `alt` provee el equivalente textual.

---

### Iconos decorativos - `aria-hidden="true"`

**Archivos:** `src/components/icons/*.jsx`, SVGs inline en Navbar, Modal, ProjectCard

**Implementación:** todos los SVG decorativos que acompañan texto o botones con `aria-label` llevan `aria-hidden="true"` para excluirlos del árbol de accesibilidad.

**Criterio WCAG:** 1.3.1 Info and Relationships (A), 1.1.1 Non-text Content (A)

**Por que:** los íconos decorativos duplican información ya presente en texto o `aria-label`; ocultarlos evita anuncios redundantes.