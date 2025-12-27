# Tailwind 4 Optimization Audit

**Datum**: 25. prosince 2024  
**Projekt**: dominik.tyrnel.com (Study Hub + CV)  
**Tailwind verze**: 4.x (CSS-first konfigurace)

---

## ✅ Co již používáte dobře

| Feature                 | Soubor                                    | Status |
| ----------------------- | ----------------------------------------- | ------ |
| `@theme` direktiva      | `tailwind-theme.css`, `design-tokens.css` | ✅     |
| `@layer` cascade layers | `global.css`                              | ✅     |
| `@source` scanner       | `tailwind-theme.css`                      | ✅     |
| OKLCH colors            | `oklch-gradients.css`                     | ✅     |
| CSS variables theming   | `global.css`, `vars.css`                  | ✅     |
| Custom utilities        | `advanced-effects.css`                    | ✅     |

---

## 🔴 Nevyužité Tailwind 4 features

### 1. Container Queries (`@container`)

**Tailwind 4 má nativní podporu pro container queries - nepoužíváte je!**

```css
/* Aktuálně: @media breakpoints */
@media (min-width: 768px) { ... }

/* Tailwind 4: Container queries */
@container (min-width: 400px) { ... }
```

**Příklad použití:**

```tsx
// Místo:
<div className="md:grid-cols-2">

// Použij:
<div className="@container">
  <div className="@md:grid-cols-2">
```

**Kde aplikovat:**

- `GooroomeeCard.tsx` - responzivní layout uvnitř karty
- `StatusWidget.tsx` - layout závisí na šířce widgetu, ne viewportu
- `ActivityWidget.tsx` - flexibilní velikost v gridu

---

### 2. `@starting-style` - Entry Animations (částečně používáte)

Vidím že používáte `@starting-style:opacity-0` - to je správně! Ale můžete rozšířit:

```tsx
// Aktuální:
className="@starting-style:opacity-0 opacity-100 transition-opacity"

// Rozšířené:
className="@starting-style:[opacity-0_transform:translateY(10px)]
           opacity-100 transform-none transition-all duration-500"
```

---

### 3. `@variant` directive - Chybí!

**Tailwind 4 umožňuje definovat custom varianty přímo v CSS:**

```css
/* V tailwind-theme.css přidat: */
@variant dark (&:where(.study-scope[data-theme='dark'], .study-scope[data-theme='dark'] *));
@variant live (&:where([data-live='true'], [data-live='true'] *));
@variant focus-mode (&:where([data-mode='focus'], [data-mode='focus'] *));
```

**Pak v JSX:**

```tsx
<div className="text-gray-800 dark:text-gray-100 live:animate-pulse">
```

**Benefit**: Eliminuje potřebu ručních dark mode overrides v `global.css`!

---

### 4. Nativní `text-balance` a `text-wrap`

```tsx
// Místo custom CSS:
className = "text-balance"; // Pro headings
className = "text-pretty"; // Pro paragrafy
```

---

### 5. `has-*` selektory

```tsx
// Tailwind 4 podporuje :has() nativně:
className = "has-[input:focus]:ring-2";
className = "group-has-[img]:p-2";
```

---

### 6. `not-*` selektory

```tsx
className = "not-first:mt-4";
className = "not-last:border-b";
```

---

### 7. `inert` varianta

```tsx
// Pro disabled/loading stavy:
className = "inert:opacity-50 inert:pointer-events-none";
```

---

## 🟡 Oblasti ke zlepšení

### 1. CSS Variables → Native Tailwind Classes

**Problém**: Příliš mnoho `bg-[var(--study-surface)]` místo nativních tříd.

**Aktuální (verbose):**

```tsx
className =
  "bg-[var(--study-surface)] text-[var(--study-text)] border-[var(--study-border)]";
```

**Lepší přístup** - rozšířit `@theme`:

```css
/* V tailwind-theme.css @theme block: */
@theme {
  /* Přidat aliasy pro přímé použití */
  --color-surface: var(--study-surface);
  --color-primary: var(--study-text);
  --color-muted: var(--study-text-muted);
  --color-border: var(--study-border);
}
```

**Pak v JSX:**

```tsx
className = "bg-surface text-primary border-border";
```

---

### 2. Dark Mode - Zjednodušení

**Aktuální problém**: 30 řádků CSS overrides pro dark mode v `global.css`:

```css
.study-scope[data-theme="dark"] .bg-study-surface {
  background-color: #262320 !important;
}
```

**Tailwind 4 řešení** - použít `@variant`:

```css
@variant dark (&:where(.study-scope[data-theme='dark'], .study-scope[data-theme='dark'] *));
```

Pak použít `dark:` prefix nativně a odstranit všechny `!important` overrides.

---

### 3. Responzivní Typography

**Aktuálně**: `design-tokens.css` definuje typography scale.

**Tailwind 4 má fluid typography:**

```tsx
// Místo:
className = "text-xl md:text-2xl lg:text-3xl";

// Tailwind 4:
className = "text-[clamp(1.25rem,3vw,1.75rem)]";
// Nebo definovat v @theme:
// --font-size-fluid-lg: clamp(1.25rem, 3vw, 1.75rem);
```

---

### 4. Anchor Positioning (experimentální)

```css
/* Pro tooltips, popovers bez JS: */
.tooltip {
  position-anchor: --trigger;
  position: absolute;
  top: anchor(bottom);
  left: anchor(center);
}
```

---

## 📋 Konkrétní akce k implementaci

### Priorita VYSOKÁ (okamžitý benefit):

| #   | Akce                                                      | Effort | Impact     |
| --- | --------------------------------------------------------- | ------ | ---------- |
| 1   | Přidat `@variant dark` do `tailwind-theme.css`            | 1h     | ⭐⭐⭐⭐⭐ |
| 2   | Přidat color aliasy do `@theme` (surface, primary, muted) | 30m    | ⭐⭐⭐⭐   |
| 3   | Odstranit `!important` dark mode overrides z `global.css` | 1h     | ⭐⭐⭐⭐   |

### Priorita STŘEDNÍ:

| #   | Akce                               | Effort | Impact |
| --- | ---------------------------------- | ------ | ------ |
| 4   | Přidat `text-balance` na headings  | 15m    | ⭐⭐⭐ |
| 5   | Container queries pro widgets      | 2h     | ⭐⭐⭐ |
| 6   | Rozšířit `@starting-style` animace | 1h     | ⭐⭐⭐ |

### Priorita NÍZKÁ (nice-to-have):

| #   | Akce                                 | Effort | Impact |
| --- | ------------------------------------ | ------ | ------ |
| 7   | `has-*` selektory pro formuláře      | 30m    | ⭐⭐   |
| 8   | `not-first/not-last` utility         | 15m    | ⭐⭐   |
| 9   | Custom `@variant live` pro LIVE stav | 30m    | ⭐⭐   |

---

## 🛠️ Příklad implementace - Dark Mode Fix

### Krok 1: Přidat @variant do `tailwind-theme.css`

```css
@import "tailwindcss";

/* Custom dark variant for Study Hub */
@variant dark (&:where(.study-scope[data-theme='dark'], .study-scope[data-theme='dark'] *));

@source "../../src/**/*.tsx";
@source "../../src/**/*.ts";
@source "../../index.html";

@theme {
  /* ... existing theme ... */

  /* Dark mode colors as separate tokens */
  --color-dark-surface: #262320;
  --color-dark-bg: #1a1816;
  --color-dark-text: #ebe5da;
  --color-dark-muted: #a69e94;
  --color-dark-accent: #ff9f43;
}
```

### Krok 2: Použít v komponentách

```tsx
// Před:
className = "bg-[var(--study-surface)]";

// Po:
className = "bg-study-surface dark:bg-dark-surface";
```

### Krok 3: Odstranit CSS overrides z `global.css`

Smazat:

```css
.study-scope[data-theme="dark"] .bg-study-surface {
  background-color: #262320 !important;
}
/* ... a dalších 30 řádků */
```

---

## 📊 Odhad přínosu

| Metrika                  | Před    | Po     |
| ------------------------ | ------- | ------ |
| Řádky CSS v `global.css` | 284     | ~200   |
| `!important` overrides   | 15+     | 0      |
| CSS bundle size          | ~8KB    | ~6KB   |
| Maintainability          | Střední | Vysoká |

---

## 🔗 Reference

- [Tailwind 4 Docs](https://tailwindcss.com/docs)
- [Container Queries](https://tailwindcss.com/docs/container-queries)
- [@variant directive](https://tailwindcss.com/docs/adding-custom-styles#creating-a-variant)
- [OKLCH Colors](https://oklch.com/)
