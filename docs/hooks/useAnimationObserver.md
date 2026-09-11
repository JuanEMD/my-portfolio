# useAnimationObserver

Hook de React que activa una animación CSS cuando un elemento entra en el viewport, usando el patrón [IntersectionObserver](https://developer.mozilla.org/es/docs/Web/API/IntersectionObserver).

## Ubicación

`@/hooks/useAnimationObserver`

## Propiedades

| Propiedad           | Tipo     | Default             | Descripción |
|---------------------|----------|----------------------|-------------|
| `targetElements`    | `Array`  | `[]`                 | Lista de elementos a observar. Cada ítem es `{ element, identificatorType, animation? }` (ver abajo). |
| `options`           | `Object` | `{}`                 | Opciones del `IntersectionObserver` (`root`, `rootMargin`, `threshold`). |
| `defaultAnimation`  | `String` | `"animate-fade-up"`  | Clase CSS que se añade cuando el target no declara `animation`. |

### Estructura de cada ítem de `targetElements`

| Campo               | Tipo     | Descripción |
|---------------------|----------|-------------|
| `element`           | `String` | Nombre del id o de la clase. Puede llevar o no el prefijo `#` / `.`. |
| `identificatorType` | `String` | `"class"` o `"id"`. Define cómo se selecciona el elemento. |
| `animation`         | `String` | (opcional) Clase CSS de animación específica. Si se omite se usa `defaultAnimation`. |

## Comportamiento

- Al montar el componente, se crea un único `IntersectionObserver` y se observan todos los elementos que coinciden con los selectores.
- Con `identificatorType: "class"` se observan **todos** los elementos que tienen esa clase (`querySelectorAll`).
- Con `identificatorType: "id"` se observa un único elemento (`querySelectorAll` sobre un id).
- Cuando un elemento intersecta (`intersectionRatio > 0`):
  1. Se le añade la clase de animación (la específica del target o `defaultAnimation`).
  2. Se deja de observar ese elemento (la animación se ejecuta una sola vez).
- Al desmontar, el observer se desconecta (`disconnect`).

## Requisitos del elemento a animar

El elemento debe partir oculto (p. ej. con `opacity-0`) y solo mostrarse al entrar:

```jsx
<div className="opacity-0 stack-skill-card">…</div>
```

La clase de animación añadida por el hook (p. ej. `animate-fade-up`) contiene `animation-fill-mode: both`, por lo que el estado final (`opacity: 1`) se mantiene tras la animación.

Las animaciones disponibles están definidas como tokens de tema en `@/styles/globals.css`:

- `animate-fade-up` — aparece desde abajo.
- `animate-fade-right` — aparece desde la izquierda.
- `animate-scale-in` — aparece a escala.

## Ejemplos de uso

### Observar elementos por clase

```jsx
import { useAnimationObserver } from "@/hooks/useAnimationObserver";

const targetAnimationElements = [
  { element: "stack-skill-card", identificatorType: "class" },
];

const Skills = () => {
  useAnimationObserver({ targetElements: targetAnimationElements });

  return (
    <div className="grid grid-cols-5 gap-2.5">
      {mainStack.map((tech, i) => (
        <StackCard
          key={tech.id}
          {...tech}
          className="opacity-0 stack-skill-card"
          style={{ animationDelay: `${i * DELAY_BASE}ms` }}
        />
      ))}
    </div>
  );
};
```

### Mezclar clases e ids con animaciones específicas

```jsx
const targetAnimationElements = [
  { element: "card", identificatorType: "class", animation: "animate-scale-in" },
  { element: "more-skills", identificatorType: "id", animation: "animate-fade-right" },
  { element: "contact-form", identificatorType: "class" }, // usa defaultAnimation
];

useAnimationObserver({ targetElements: targetAnimationElements });
```

### Efecto escalonado (stagger)

Cada card recibe un `animationDelay` proporcional a su índice (`@/constants/animation` exporta `DELAY_BASE = "75"`):

```jsx
style={{ animationDelay: `${index * DELAY_BASE}ms` }}
```

## Notas

- Recibe soporte de SSR: el observer solo se crea en el lado del cliente (dentro de un `useEffect`).
- Es un efecto *one-shot*: el elemento se anima la primera vez que entra al viewport y no se vuelve a animar.
- `targetElements` debe mantenerse estable entre renders para no recrear el observer; si se define dentro del componente, el efecto se re-ejecuta en cada render.