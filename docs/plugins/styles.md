# [Plugins](../plugins.md) → Styles for your plugin preview

Currently if you want to reuse main app styles, you can use CSS variables from main themes ([light](../../app/main/css/themes/light.css), [dark](../../app/main/css/themes/dark.css))

> It is better to reuse css variables so custom themes can affect not only main app styles, but your plugin too.

Example (reuse main border styles):

```css
.item {
  border-bottom: var(--main-border);
}
```

## Reusable components

- [@cerebroapp/cerebro-ui](https://github.com/cerebroapp/cerebro-ui)
