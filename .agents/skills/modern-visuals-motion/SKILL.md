---
name: modern-visuals-motion
description: >-
  Provides modern visual aesthetics, physics-based micro-interactions, CSS spring curves, ambient radial glows,
  modern glassmorphism 2.0, card hover elevations, and accessible motion choreography. Use whenever styling UI components,
  crafting interactive moments, animating transitions, or elevating visual polish.
---

# Modern Visuals & Motion: High-Craft Interaction Playbook

Elevate interfaces from standard static layouts to fluid, reactive, and responsive interactive products.

---

## 1. Physics-Based Spring Timing Functions
Never use browser default `ease` or `linear` transitions for UI controls. Use physics-informed curves:

```css
:root {
  /* Apple / Linear style smooth deceleration (Enter & Elevate) */
  --ease-spring-out: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Quick snap for button clicks & toggle presses */
  --ease-snap: cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Subtle elastic bounce for badges and notifications */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Standard durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
}
```

---

## 2. Micro-Interactions Pattern Book

### A. Tactile Button Press
```css
.btn-modern {
  transition: transform var(--duration-fast) var(--ease-snap),
              box-shadow var(--duration-fast) var(--ease-snap),
              background-color var(--duration-fast) ease;
}
.btn-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.btn-modern:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### B. High-Craft Bento Card Hover Elevation
```css
.bento-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  transition: transform var(--duration-normal) var(--ease-spring-out),
              border-color var(--duration-normal) ease,
              box-shadow var(--duration-normal) var(--ease-spring-out);
}
.bento-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-active);
  box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.24);
}
```

### C. Ambient Radial Glow (Spotlight Hero Effect)
```css
.hero-glow-container {
  position: relative;
  overflow: hidden;
}
.hero-glow-container::before {
  content: '';
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}
```

---

## 3. Staggered Entrance Animations
When presenting a grid of cards or a dashboard list on initial load, cascade their entrance using a CSS variable:

```css
@keyframes cascadeReveal {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item {
  animation: cascadeReveal var(--duration-slow) var(--ease-spring-out) both;
  animation-delay: calc(var(--index, 0) * 60ms);
}
```

---

## 4. Accessibility & Reduced Motion
Always provide complete graceful degradation for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
