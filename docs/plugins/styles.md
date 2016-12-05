# <a href="../plugins.md">Plugins</a> → Styles for your plugin preview
Currently if you want to reuse main app styles, you can use CSS variables from main themes ([light](../../main/css/themes/light.css), [dark](../../main/css/themes/dark.css))

> It is better to reuse css variables so custom themes can affect not only main app styles, but your plugin too.

Example (reuse main border styles):

```css
.item {
  border-bottom: var(--main-border);
}
```

Later [cerebro-tools](./cerebro-tools.md) will include some reusable components.
