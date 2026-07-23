(function(){var s=document.createElement('style');s.setAttribute('data-extension','comfyui-nynxz-experimental');s.textContent="/* Reusable themed scrollbar. Add class=\"zen-scroll\" to ANY scroll container — including\n * teleported popovers/menus that live outside #zenkit-host — for a consistent, slim\n * scrollbar: neutral at rest (blends into the surface), accent/primary on hover.\n *\n * IMPORTANT: only the ::-webkit-scrollbar pseudo-elements are used for the look, because\n * Chromium DISABLES them the moment `scrollbar-color`/`scrollbar-width` is set (it then\n * draws the standard scrollbar, whose default hover lightens the thumb ~white). So the\n * standard props are gated to non-webkit engines (Firefox) via @supports.\n * Override --zen-scrollbar (rest) / --zen-scrollbar-hover (hover) to retint. */\n.zen-scroll::-webkit-scrollbar { width: 10px; height: 10px; }\n.zen-scroll::-webkit-scrollbar-track { background: transparent; }\n.zen-scroll::-webkit-scrollbar-thumb {\n  background: var(--zen-scrollbar, color-mix(in srgb, var(--zen-text, #9aa0aa) 22%, transparent));\n  border: 2px solid transparent;\n  border-radius: var(--zen-radius, 8px);\n  background-clip: padding-box;\n}\n.zen-scroll::-webkit-scrollbar-thumb:hover {\n  background: var(--zen-scrollbar-hover, var(--zen-accent, #6366f1));\n  background-clip: padding-box;\n}\n.zen-scroll::-webkit-scrollbar-corner { background: transparent; }\n\n@supports not selector(::-webkit-scrollbar) {\n  .zen-scroll {\n    scrollbar-width: thin;\n    scrollbar-color: var(--zen-scrollbar, color-mix(in srgb, var(--zen-text, #9aa0aa) 26%, transparent)) transparent;\n  }\n}\n\n/* layout only — scrollbar styling lives in scrollbar.css (.zen-scroll, global) */\n.zen-scroll[data-v-38b756b6] { height: 100%; min-height: 0; overflow-y: auto; overflow-x: hidden;\n}\n.zen-scroll.x[data-v-38b756b6] { overflow-x: auto; overflow-y: hidden;\n}\n\n.zen-btn[data-v-7242ad73] {\n  display: inline-flex; align-items: center; justify-content: center; gap: 7px; cursor: pointer;\n  font-family: inherit; font-size: 12px; font-weight: 600; padding: 7px 12px; border-radius: var(--zen-radius, 8px);\n  border: 1px solid var(--zen-border, #3a3a44); background: var(--zen-surface, #202026); color: var(--zen-text, #e5e5ea);\n  transition: border-color .12s ease, background .12s ease, color .12s ease, filter .12s ease;\n}\n.zen-btn[data-v-7242ad73]:hover:not(:disabled) { border-color: var(--zen-accent, #3b82f6);\n}\n.zen-btn[data-v-7242ad73]:disabled { opacity: .5; cursor: default;\n}\n.zen-btn .mdi[data-v-7242ad73] { font-size: 15px;\n}\n.zen-btn.block[data-v-7242ad73] { width: 100%;\n}\n.zen-btn.sm[data-v-7242ad73] { padding: 5px 9px; font-size: 11px;\n}\n.zen-btn.primary[data-v-7242ad73] { background: var(--zen-accent, #3b82f6); border-color: var(--zen-accent, #3b82f6); color: var(--zen-accent-text, #fff);\n}\n.zen-btn.primary[data-v-7242ad73]:hover:not(:disabled) { filter: brightness(1.08);\n}\n.zen-btn.ghost[data-v-7242ad73] { background: transparent; border-color: transparent;\n}\n.zen-btn.ghost[data-v-7242ad73]:hover:not(:disabled) { background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent); border-color: transparent;\n}\n.zen-btn.danger[data-v-7242ad73]:hover:not(:disabled) { background: #b91c1c; border-color: #b91c1c; color: #fff;\n}\n\n.zen-iconbtn[data-v-fc152c1e] {\n  display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px;\n  border: 1px solid transparent; border-radius: var(--zen-radius, 6px); background: none; color: var(--zen-muted, #9aa0aa);\n  cursor: pointer; transition: background .1s ease, color .1s ease;\n}\n.zen-iconbtn[data-v-fc152c1e]:hover:not(:disabled) { background: color-mix(in srgb, var(--zen-text, #fff) 12%, transparent); color: var(--zen-text, #e5e5ea);\n}\n.zen-iconbtn.active[data-v-fc152c1e] { color: var(--zen-accent, #3b82f6);\n}\n.zen-iconbtn.danger[data-v-fc152c1e]:hover:not(:disabled) { background: #b91c1c; color: #fff;\n}\n.zen-iconbtn[data-v-fc152c1e]:disabled { opacity: .4; cursor: default;\n}\n.zen-iconbtn .mdi[data-v-fc152c1e] { font-size: 16px;\n}\n\n.zen-input[data-v-262ee20d] {\n  /* line-height: normal decouples from ComfyUI's inherited (small) line-height; the\n     asymmetric padding (1px more top than bottom) optically centres the glyphs, which\n     otherwise sit a touch high inside the field (line-height alone can't fix that). */\n  width: 100%; box-sizing: border-box; font: inherit; font-size: 12px; line-height: normal;\n  background: var(--zen-input, #1b1b20); color: var(--zen-text, #e5e5ea);\n  border: 1px solid var(--zen-border, #34343c); border-radius: var(--zen-radius, 7px);\n  padding: 8px 9px 6px; transition: border-color .12s ease;\n}\n.zen-input[data-v-262ee20d]::placeholder { color: var(--zen-muted, #9aa0aa);\n}\n.zen-input[data-v-262ee20d]:focus { outline: none; border-color: var(--zen-accent, #6366f1);\n}\n.zen-input[data-v-262ee20d]:disabled { opacity: .5; cursor: default;\n}\n.zen-input.sm[data-v-262ee20d] { padding: 6px 8px 4px; font-size: 11px;\n}\n.zen-input.area[data-v-262ee20d] { resize: vertical; min-height: 64px; line-height: 1.45;\n}\n\n.zen-num[data-v-55261609] { display: inline-flex; align-items: stretch; height: 28px; box-sizing: border-box; border: 1px solid var(--zen-border, #34343c); border-radius: var(--zen-radius, 6px); background: var(--zen-input, #1b1b20); overflow: hidden; user-select: none;\n}\n.zen-num[data-v-55261609]:focus-within { border-color: var(--zen-accent, #6366f1);\n}\n.zen-num.disabled[data-v-55261609] { opacity: .5; pointer-events: none;\n}\n.zn-step[data-v-55261609] { flex: none; width: 21px; border: none; background: none; color: var(--zen-muted, #9aa0aa); cursor: pointer; display: inline-flex; align-items: center; justify-content: center;\n}\n.zn-step.hot[data-v-55261609] { color: var(--zen-text, #e5e5ea); background: color-mix(in srgb, var(--zen-text, #fff) 9%, transparent);\n}\n.zn-step .mdi[data-v-55261609] { font-size: 13px;\n}\n.zn-val[data-v-55261609] { flex: 1; min-width: 40px; display: flex; align-items: center; justify-content: center; cursor: ew-resize; border-left: 1px solid var(--zen-border, #34343c); border-right: 1px solid var(--zen-border, #34343c); padding: 0 2px;\n}\n/* bare: no ±steppers — just a scrub/type value box (for tight inline use, e.g. ZenDimensions) */\n.zen-num.bare .zn-val[data-v-55261609] { border-left: none; border-right: none;\n}\n/* The input IS the value display: pointer-events off while blurred so the wrapper handles\n   drag-scrub; on when focused so the caret/selection work. line-height:normal decouples\n   from ComfyUI's inherited (small) line-height. */\n.zn-input[data-v-55261609] { width: 100%; background: none; border: none; outline: none; color: var(--zen-text, #e5e5ea); font: inherit; font-size: 11px; line-height: normal; text-align: center; font-variant-numeric: tabular-nums; pointer-events: none; cursor: ew-resize;\n}\n.zn-input.live[data-v-55261609] { pointer-events: auto; cursor: text;\n}\n.zn-input[data-v-55261609]:disabled { color: var(--zen-muted, #9aa0aa);\n}\n\n.zen-combo[data-v-cf4f46d5] { position: relative; width: 100%;\n}\n.zc-trigger[data-v-cf4f46d5] {\n  display: flex; align-items: center; gap: 6px; width: 100%; box-sizing: border-box; min-height: 28px;\n  background: var(--zen-input, #1b1b20); color: var(--zen-text, #e5e5ea);\n  border: 1px solid var(--zen-border, #34343c); border-radius: var(--zen-radius, 7px);\n  padding: 4px 8px; font: inherit; font-size: 12px; cursor: pointer; text-align: left;\n  transition: border-color .12s ease;\n}\n.zc-trigger[data-v-cf4f46d5]:hover:not(:disabled) { border-color: var(--zen-accent, #6366f1);\n}\n.zc-trigger[data-v-cf4f46d5]:disabled { opacity: .5; cursor: default;\n}\n.zen-combo.open .zc-trigger[data-v-cf4f46d5] { border-color: var(--zen-accent, #6366f1);\n}\n.zc-current[data-v-cf4f46d5] { flex: 1; min-width: 0; overflow: hidden;\n}\n.zc-caret[data-v-cf4f46d5] { flex: none; color: var(--zen-muted, #9aa0aa); transition: transform .12s ease;\n}\n.zen-combo.open .zc-caret[data-v-cf4f46d5] { transform: rotate(180deg);\n}\n\n/* Teleported menu — NOT scoped (lives at <body>); reads the same --zen-* tokens. */\n.zen-combo-menu {\n  position: fixed; z-index: 11000; display: flex; flex-direction: column; max-height: 360px;\n  background: var(--zen-surface, #202026); border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px); box-shadow: 0 12px 34px rgba(0, 0, 0, .5); overflow: hidden;\n  font-family: var(--p-font-family, system-ui, sans-serif); color: var(--zen-text, #e5e5ea);\n}\n.zen-combo-menu .zc-search { display: flex; align-items: center; gap: 6px; padding: 8px 10px; border-bottom: 1px solid var(--zen-border, #34343c);\n}\n.zen-combo-menu .zc-search > .mdi { color: var(--zen-muted, #9aa0aa); font-size: 16px;\n}\n.zen-combo-menu .zc-search input { flex: 1; min-width: 0; background: none; border: none; outline: none; color: inherit; font: inherit; font-size: 12px;\n}\n.zen-combo-menu .zc-clear { border: none; background: none; color: var(--zen-muted, #9aa0aa); cursor: pointer; padding: 0 2px;\n}\n.zen-combo-menu .zc-search-actions { flex: none; display: inline-flex; align-items: center;\n}\n.zen-combo-menu .zc-list { overflow-y: auto; padding: 4px; min-height: 0;\n}\n.zen-combo-menu .zc-virt { position: relative; width: 100%;\n}\n.zen-combo-menu .zc-win { position: absolute; top: 0; left: 0; right: 0;\n}\n.zen-combo-menu .zc-opt { display: flex; align-items: center; gap: 9px; padding: 6px 8px; border-radius: var(--zen-radius, 6px); cursor: pointer; font-size: 12px; box-sizing: border-box; overflow: hidden;\n}\n.zen-combo-menu .zc-opt.active { background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent);\n}\n.zen-combo-menu .zc-opt.sel { color: var(--zen-accent, #6366f1);\n}\n.zen-combo-menu .zc-opt-lbl { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\n}\n.zen-combo-menu .zc-sep { height: 1px; margin: 4px 6px; background: var(--zen-border, #34343c);\n}\n.zen-combo-menu .zc-empty { padding: 16px; text-align: center; font-size: 12px; color: var(--zen-muted, #9aa0aa);\n}\n.zen-combo-menu .zc-footer { border-top: 1px solid var(--zen-border, #34343c); padding: 6px;\n}\n/* grid mode: options become responsive cards (e.g. an image picker) */\n.zen-combo-menu.grid .zc-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(var(--zc-grid-min, 92px), 1fr)); gap: 6px; align-content: start;\n}\n.zen-combo-menu.grid .zc-opt { flex-direction: column; align-items: stretch; height: auto; gap: 4px; padding: 4px;\n}\n.zen-combo-menu.grid .zc-empty { grid-column: 1 / -1;\n}\n\n/* radius follows the theme's rounding token (--zen-radius, bridged from --radius), so\n   square/straight-edge themes like Mecha get a square toggle. Falls back to a pill +\n   round knob; override just the switch with --zen-switch-radius if needed. */\n.zen-switch[data-v-b969721c] { position: relative; flex: 0 0 auto; width: 42px; height: 23px; padding: 0; border: 1px solid var(--zen-border, #3a3a44); border-radius: var(--zen-switch-radius, var(--zen-radius, 999px)); background: var(--zen-surface, #202026); cursor: pointer; transition: background .15s ease, border-color .15s ease;\n}\n.zen-switch.on[data-v-b969721c] { background: var(--zen-accent, #3b82f6); border-color: var(--zen-accent, #3b82f6);\n}\n.zen-switch[data-v-b969721c]:disabled { opacity: .5; cursor: default;\n}\n.zen-switch .knob[data-v-b969721c] { position: absolute; top: 1px; left: 1px; width: 19px; height: 19px; border-radius: var(--zen-switch-radius, var(--zen-radius, 50%)); background: #fff; display: flex; align-items: center; justify-content: center; transition: transform .15s ease; box-shadow: 0 1px 2px rgba(0, 0, 0, .35);\n}\n.zen-switch.on .knob[data-v-b969721c] { transform: translateX(19px);\n}\n.zen-switch .knob .mdi[data-v-b969721c] { font-size: 12px; color: var(--zen-muted, #9aa0aa);\n}\n.zen-switch.on .knob .mdi[data-v-b969721c] { color: var(--zen-accent, #3b82f6);\n}\n\n.zen-tg[data-v-b8484c32] { display: inline-flex; border: 1px solid var(--zen-border, #3a3a44); border-radius: var(--zen-radius, 7px); overflow: hidden; background: var(--zen-surface, #202026);\n}\n.zen-tg-b[data-v-b8484c32] { display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 4px 9px; border: none; background: none; color: var(--zen-muted, #9aa0aa); font-size: 11px; font-weight: 600; font-family: inherit; cursor: pointer; transition: background .1s ease, color .1s ease;\n}\n.zen-tg-b + .zen-tg-b[data-v-b8484c32] { border-left: 1px solid var(--zen-border, #3a3a44);\n}\n.zen-tg-b[data-v-b8484c32]:hover { color: var(--zen-text, #e5e5ea);\n}\n.zen-tg-b.on[data-v-b8484c32] { background: color-mix(in srgb, var(--zen-accent, #3b82f6) 20%, transparent); color: var(--zen-accent, #3b82f6);\n}\n.zen-tg-b .mdi[data-v-b8484c32] { font-size: 14px;\n}\n\n.zen-slider[data-v-10c7ff78] { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: var(--zen-radius, 999px); background: var(--zen-border, #34343c); outline: none; cursor: pointer;\n}\n.zen-slider[data-v-10c7ff78]:disabled { opacity: .5; cursor: default;\n}\n.zen-slider[data-v-10c7ff78]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: var(--zen-radius, 50%); background: var(--zen-accent, #6366f1); border: 2px solid var(--zen-bg, #1a1a1f); cursor: pointer; box-shadow: 0 1px 3px rgba(0, 0, 0, .4);\n}\n.zen-slider[data-v-10c7ff78]::-moz-range-thumb { width: 14px; height: 14px; border: 2px solid var(--zen-bg, #1a1a1f); border-radius: var(--zen-radius, 50%); background: var(--zen-accent, #6366f1); cursor: pointer;\n}\n.zen-slider[data-v-10c7ff78]::-moz-range-track { height: 4px; border-radius: var(--zen-radius, 999px); background: var(--zen-border, #34343c);\n}\n.zen-slider[data-v-10c7ff78]:focus-visible { box-shadow: 0 0 0 2px color-mix(in srgb, var(--zen-accent, #6366f1) 50%, transparent);\n}\n\n/* one inline row; wraps only if the node gets very narrow */\n.zen-dims[data-v-f9393177] { display: flex; align-items: center; flex-wrap: wrap; gap: 5px;\n}\n.zd-n[data-v-f9393177] { flex: 1 1 60px; min-width: 48px;\n}\n.zd-x[data-v-f9393177] { flex: none; color: var(--zen-muted, #9aa0aa); font-size: 11px;\n}\n.zd-mp[data-v-f9393177] { flex: 0 1 56px; min-width: 44px;\n}\n.zd-unit[data-v-f9393177], .zd-aspect[data-v-f9393177] { flex: none; font-size: 10px; color: var(--zen-muted, #9aa0aa); font-variant-numeric: tabular-nums;\n}\n.zd-aspect[data-v-f9393177] { margin-left: auto;\n}\n\n/* Not scoped — teleported to <body>; reads --zen-* tokens. */\n.zen-modal-back {\n  position: fixed; inset: 0; z-index: 12000; display: flex; align-items: center; justify-content: center;\n  background: rgba(0, 0, 0, .55); backdrop-filter: blur(2px);\n}\n.zen-modal {\n  display: flex; flex-direction: column; max-width: 94vw; max-height: 90vh; overflow: hidden;\n  background: var(--zen-surface, #202026); color: var(--zen-text, #e5e5ea);\n  border: 1px solid var(--zen-border, #34343c); border-radius: calc(var(--zen-radius, 8px) + 2px);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, .6); font-family: var(--p-font-family, system-ui, sans-serif);\n}\n.zen-modal .zm-head { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-bottom: 1px solid var(--zen-border, #34343c); flex: none;\n}\n.zen-modal .zm-title { flex: none; font-size: 13px; font-weight: 600; white-space: nowrap;\n}\n.zen-modal .zm-head-mid { flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px;\n}\n.zen-modal .zm-x { border: none; background: none; color: var(--zen-muted, #9aa0aa); cursor: pointer; font-size: 18px; display: inline-flex;\n}\n.zen-modal .zm-x:hover { color: var(--zen-text, #e5e5ea);\n}\n.zen-modal .zm-body { flex: 1; min-height: 0; overflow: auto; padding: 14px;\n}\n.zen-modal .zm-foot { flex: none; border-top: 1px solid var(--zen-border, #34343c); padding: 10px 14px;\n}\n\n/* Fill layout (see mountWidget's `fill`): the widget takes the node body, the image grid\n   takes whatever height is left and scrolls, and the toolbar is pinned under it. Resizing\n   the node therefore shows more images, never more padding. */\n.fg[data-v-84e98745] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  height: 100%;\n  min-height: 0;\n  padding: 2px;\n  box-sizing: border-box;\n  font-size: 12px;\n  color: var(--zen-text, #e5e5ea);\n}\n\n/* flex-basis 0 (not auto) so the grid's content can't push the toolbar off the node */\n/* focused programmatically on hover (see armScroll) — never show a ring for it */\n.fg-scroll[data-v-84e98745] {\n  flex: 1 1 0;\n  min-height: 0;\n  outline: none;\n}\n.fg-grid[data-v-84e98745] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));\n  gap: 6px;\n  align-items: start;\n  padding-right: 2px;\n}\n.fg-card[data-v-84e98745] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  padding: 4px;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 9px);\n  background: var(--zen-input, #1b1b20);\n  transition:\n    border-color 0.12s ease,\n    opacity 0.12s ease;\n}\n.fg-card.off[data-v-84e98745] {\n  opacity: 0.5;\n}\n.fg-card.dragging[data-v-84e98745] {\n  opacity: 0.35;\n}\n.fg-card.over[data-v-84e98745] {\n  border-color: var(--zen-accent, #6366f1);\n  box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset;\n}\n.fg-thumb[data-v-84e98745] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1;\n  border-radius: var(--zen-radius, 6px);\n  background: var(--zen-surface, #202026);\n  overflow: hidden;\n  cursor: grab;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.fg-thumb[data-v-84e98745]:active {\n  cursor: grabbing;\n}\n/* contain on black: the encoder letterboxes with real black pixels, so the card shows the\n   actual frame it gets rather than flattering it with a themed backdrop */\n.fg-thumb img[data-v-84e98745] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: contain;\n  background: #000;\n}\n.fg-ph[data-v-84e98745] {\n  font-size: 30px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fg-ph.warn[data-v-84e98745] {\n  color: #e0a33a;\n}\n.fg-idx[data-v-84e98745] {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  border-radius: var(--zen-radius, 5px);\n  background: rgba(0, 0, 0, 0.62);\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.fg-acts[data-v-84e98745] {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  display: flex;\n  gap: 3px;\n  opacity: 0;\n  transition: opacity 0.12s ease;\n}\n.fg-card:hover .fg-acts[data-v-84e98745] {\n  opacity: 1;\n}\n.fg-act[data-v-84e98745] {\n  width: 19px;\n  height: 19px;\n  padding: 0;\n  border: none;\n  border-radius: var(--zen-radius, 5px);\n  background: rgba(0, 0, 0, 0.62);\n  color: #fff;\n  font-size: 12px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.fg-act[data-v-84e98745]:hover {\n  background: var(--zen-accent, #6366f1);\n}\n.fg-act.danger[data-v-84e98745]:hover {\n  background: #d9534f;\n}\n.fg-mutemark[data-v-84e98745] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.45);\n  color: #fff;\n  font-size: 22px;\n  pointer-events: none;\n}\n\n/* name + share ride in the thumb's bottom strip rather than costing the card its own rows */\n.fg-meta[data-v-84e98745] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 3px;\n  display: flex;\n  align-items: flex-end;\n  gap: 4px;\n  padding: 10px 5px 1px;\n  background: linear-gradient(transparent, rgba(0, 0, 0, 0.78));\n  pointer-events: none;\n}\n.fg-name[data-v-84e98745] {\n  flex: 1;\n  min-width: 0;\n  font-size: 9.5px;\n  color: #fff;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.fg-pct[data-v-84e98745] {\n  flex: none;\n  font-size: 9.5px;\n  font-weight: 700;\n  line-height: 1.25;\n  color: #fff;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);\n}\n.fg-pct.dim[data-v-84e98745] {\n  font-weight: 500;\n  color: var(--zen-muted, #9aa0aa);\n}\n/* the live share of the blend this source claims */\n.fg-share[data-v-84e98745] {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 3px;\n  background: var(--zen-accent, #6366f1);\n  transition: width 0.12s ease;\n  pointer-events: none;\n}\n.fg-foot[data-v-84e98745] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.fg-slider[data-v-84e98745] {\n  flex: 1;\n  min-width: 0;\n}\n.fg-num[data-v-84e98745] {\n  flex: none;\n  width: 46px;\n}\n\n/* fills the scroll area so the empty node reads as one big drop target */\n.fg-empty[data-v-84e98745] {\n  height: 100%;\n  min-height: 96px;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  padding: 18px 8px;\n  text-align: center;\n  color: var(--zen-muted, #9aa0aa);\n  border: 1px dashed var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  background: color-mix(in srgb, var(--zen-text, #fff) 3%, transparent);\n}\n.fg-empty > .mdi[data-v-84e98745] {\n  font-size: 26px;\n  opacity: 0.8;\n}\n.fg-empty > span[data-v-84e98745] {\n  font-size: 11px;\n}\n.fg-empty > small[data-v-84e98745] {\n  font-size: 10px;\n  opacity: 0.7;\n}\n.fg-warn[data-v-84e98745] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 8px;\n  border-radius: var(--zen-radius, 7px);\n  background: color-mix(in srgb, #e0a33a 14%, transparent);\n  color: #e0a33a;\n  font-size: 10.5px;\n}\n.fg-bar[data-v-84e98745] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.fg-add[data-v-84e98745] {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px;\n  border: 1px dashed var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 7px);\n  background: transparent;\n  color: var(--zen-muted, #9aa0aa);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    border-color 0.12s ease,\n    color 0.12s ease,\n    background 0.12s ease;\n}\n.fg-add[data-v-84e98745]:hover:not(:disabled) {\n  border-color: var(--zen-accent, #6366f1);\n  color: var(--zen-text, #e5e5ea);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 8%, transparent);\n}\n.fg-add[data-v-84e98745]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n.fg-add .mdi[data-v-84e98745] {\n  font-size: 15px;\n}\n.fg-add-n[data-v-84e98745] {\n  margin-left: 2px;\n  padding: 0 5px;\n  border-radius: var(--zen-radius, 8px);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 22%, transparent);\n  color: var(--zen-text, #e5e5ea);\n  font-size: 10px;\n  font-weight: 700;\n}\n.fg-dropmask[data-v-84e98745] {\n  position: absolute;\n  inset: 0;\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  border: 2px dashed var(--zen-accent, #6366f1);\n  border-radius: var(--zen-radius, 9px);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, rgba(0, 0, 0, 0.55));\n  color: var(--zen-text, #e5e5ea);\n  font-size: 11px;\n  font-weight: 600;\n  pointer-events: none;\n}\n.fg-dropmask .mdi[data-v-84e98745] {\n  font-size: 28px;\n}\n\n/* browse dialog */\n.fg-search[data-v-84e98745] {\n  flex: 1;\n  min-width: 0;\n  max-width: 320px;\n  display: flex;\n}\n.fg-bgrid[data-v-84e98745] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 12px;\n  align-items: start;\n}\n.fg-bcard[data-v-84e98745] {\n  display: flex;\n  flex-direction: column;\n  height: 170px;\n  padding: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 9px);\n  background: var(--zen-input, #1b1b20);\n  cursor: pointer;\n  overflow: hidden;\n  text-align: left;\n  color: inherit;\n  font: inherit;\n}\n.fg-bcard[data-v-84e98745]:hover {\n  border-color: var(--zen-accent, #6366f1);\n}\n.fg-bcard.sel[data-v-84e98745] {\n  border-color: var(--zen-accent, #6366f1);\n  box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset;\n}\n.fg-bcard-img[data-v-84e98745] {\n  position: relative;\n  flex: 1 1 0;\n  min-height: 0;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--zen-surface, #202026);\n  overflow: hidden;\n}\n.fg-bcard-img img[data-v-84e98745] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n}\n.fg-bcard-tick[data-v-84e98745] {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: var(--zen-accent, #6366f1);\n  color: var(--zen-accent-text, #fff);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n}\n.fg-bcard-meta[data-v-84e98745] {\n  flex: none;\n  height: 38px;\n  box-sizing: border-box;\n  padding: 5px 8px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  border-top: 1px solid var(--zen-border, #34343c);\n}\n.fg-bcard-name[data-v-84e98745] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 12px;\n}\n.fg-bcard-dir[data-v-84e98745] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 10px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fg-bgrid-empty[data-v-84e98745] {\n  grid-column: 1 / -1;\n  text-align: center;\n  color: var(--zen-muted, #9aa0aa);\n  padding: 30px;\n}\n\n.sp[data-v-aa95cced] {\n  position: relative;\n  display: inline-flex;\n}\n.sp-panel[data-v-aa95cced] {\n  position: absolute;\n  top: calc(100% + 5px);\n  z-index: 50;\n  min-width: 212px;\n  max-width: min(340px, 92vw);\n  padding: 8px;\n  box-sizing: border-box;\n  background: var(--zen-surface, #202026);\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n  color: var(--zen-text, #e5e5ea);\n  cursor: default;\n}\n.sp-panel.right[data-v-aa95cced] {\n  right: 0;\n}\n.sp-panel.left[data-v-aa95cced] {\n  left: 0;\n}\n.sp-panel.up[data-v-aa95cced] {\n  top: auto;\n  bottom: calc(100% + 5px);\n}\n\n.fs[data-v-018dedc0] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 2px;\n  box-sizing: border-box;\n  height: 100%;\n  min-height: 0;\n  font-size: 12px;\n  color: var(--zen-text, #e5e5ea);\n  /* Ideogram Studio radius hierarchy: panels at --zen-radius, controls tighter at --radius-sm. */\n  --fs-r: var(--zen-radius, 8px);\n  --fs-rs: var(--radius-sm, 5px);\n  --fs-sel: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, transparent);\n}\n.fs-bar[data-v-018dedc0] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.fs-sp[data-v-018dedc0] {\n  flex: 1;\n}\n.fs-div[data-v-018dedc0] {\n  flex: none;\n  width: 1px;\n  height: 18px;\n  background: var(--zen-border, #34343c);\n  margin: 0 2px;\n}\n/* resolution trigger — Ideogram-style solid control */\n.fs-tool[data-v-018dedc0] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  min-height: 24px;\n  padding: 3px 8px;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--fs-rs);\n  background: var(--zen-input, #1b1b20);\n  color: var(--zen-text, #e5e5ea);\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n  font-variant-numeric: tabular-nums;\n  transition: border-color 0.1s ease;\n}\n.fs-tool.fs-tool-icon[data-v-018dedc0] {\n  min-height: 24px;\n  padding: 3px 6px;\n}\n.fs-tool[data-v-018dedc0]:hover,\n.fs-tool.on[data-v-018dedc0] {\n  border-color: var(--zen-accent, #6366f1);\n}\n.fs-tool.on[data-v-018dedc0] {\n  color: var(--zen-text, #e5e5ea);\n}\n.fs-tool .mdi[data-v-018dedc0] {\n  font-size: 13px;\n  color: var(--zen-muted, #9aa0aa);\n}\n\n/* StudioPopover content is INLINE (inside .fs), so --fs-* would resolve — but --zen-* is used\n   for consistency with the rest and is always available at :root. */\n.fs-pop[data-v-018dedc0] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 4px;\n  min-width: 212px;\n}\n.fs-pop-sec[data-v-018dedc0] {\n  font-size: 9.5px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-pop-fuse[data-v-018dedc0] {\n  align-self: stretch;\n}\n.fs-pop-row[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.fs-pop-note[data-v-018dedc0] {\n  margin: 0;\n  font-size: 10px;\n  line-height: 1.35;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-pop-note b[data-v-018dedc0] {\n  color: var(--zen-text, #e5e5ea);\n}\n.fs-achips[data-v-018dedc0] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.fs-achip[data-v-018dedc0] {\n  min-width: 34px;\n  padding: 4px 7px;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 5px);\n  background: var(--zen-input, #1b1b20);\n  color: var(--zen-muted, #9aa0aa);\n  font: inherit;\n  font-size: 10.5px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.fs-achip[data-v-018dedc0]:hover {\n  border-color: var(--zen-accent, #6366f1);\n  color: var(--zen-text, #e5e5ea);\n}\n.fs-achip.on[data-v-018dedc0] {\n  border-color: var(--zen-accent, #6366f1);\n  color: var(--zen-text, #e5e5ea);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, var(--zen-input, #1b1b20));\n}\n.fs-color[data-v-018dedc0] {\n  display: inline-flex;\n  width: 28px;\n  height: 24px;\n}\n.fs-color input[data-v-018dedc0] {\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 5px);\n  background: var(--zen-input, #1b1b20);\n  cursor: pointer;\n}\n\n/* main two-pane */\n.fs-main[data-v-018dedc0] {\n  flex: 1 1 auto;\n  min-height: 0;\n  display: flex;\n  gap: 6px;\n}\n.fs-stagewrap[data-v-018dedc0] {\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.fs-stage[data-v-018dedc0] {\n  position: relative;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  overflow: hidden;\n  background: var(--zen-input, #1b1b20);\n  touch-action: none;\n}\n.fs-bg[data-v-018dedc0] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  pointer-events: none;\n  user-select: none;\n}\n.fs-bg-color[data-v-018dedc0] {\n  object-fit: fill;\n}\n.fs-grid[data-v-018dedc0] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(color-mix(in srgb, var(--zen-text, #fff) 5%, transparent) 1px, transparent 1px),\n    linear-gradient(90deg, color-mix(in srgb, var(--zen-text, #fff) 5%, transparent) 1px, transparent 1px);\n  background-size: 12.5% 12.5%;\n}\n.fs-layer[data-v-018dedc0] {\n  position: absolute;\n  cursor: grab;\n  box-sizing: border-box;\n}\n/* A muted (hidden) layer must read as OFF at a glance — not just a faint ghost. Desaturate and\n   dim the picture, lay a dashed outline + diagonal hatch over it, and stamp a \"hidden\" badge. */\n.fs-layer.muted .fs-layer-img[data-v-018dedc0],\n.fs-layer.muted .fs-broken[data-v-018dedc0] {\n  filter: grayscale(1) brightness(0.5) contrast(0.95);\n  opacity: 0.5;\n}\n.fs-layer.muted[data-v-018dedc0]::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  border: 1.5px dashed color-mix(in srgb, var(--zen-text, #fff) 60%, transparent);\n  border-radius: 2px;\n  background: repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.35) 0 5px, rgba(0, 0, 0, 0) 5px 12px);\n}\n.fs-hidden-badge[data-v-018dedc0] {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  z-index: 2;\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  padding: 1px 5px 1px 4px;\n  font-size: 9px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.72);\n  border-radius: 3px;\n  pointer-events: none;\n}\n.fs-hidden-badge .mdi[data-v-018dedc0] {\n  font-size: 11px;\n}\n/* locked layers are click-through on the canvas (select/edit them from the sidebar) */\n.fs-layer.locked[data-v-018dedc0] {\n  pointer-events: none;\n}\n.fs-layer-img[data-v-018dedc0] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  pointer-events: none;\n  user-select: none;\n}\n.fs-locked-badge[data-v-018dedc0] {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n  font-size: 11px;\n  color: #fff;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);\n  pointer-events: none;\n}\n/* selection box: floats above every layer so a covered layer stays grabbable */\n.fs-selbox[data-v-018dedc0] {\n  position: absolute;\n  z-index: 200;\n  border: 1.5px solid;\n  outline: 1px solid;\n  outline-offset: -2px;\n  border-radius: 2px;\n  box-sizing: border-box;\n  cursor: grab;\n}\n.fs-selbox[data-v-018dedc0]:active {\n  cursor: grabbing;\n}\n.fs-selbox-tag[data-v-018dedc0] {\n  position: absolute;\n  top: 2px;\n  left: 3px;\n  max-width: calc(100% - 6px);\n  padding: 0 3px;\n  font-size: 9.5px;\n  font-weight: 600;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.55);\n  border-radius: 3px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none;\n}\n.fs-broken[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 28px;\n  color: #e0a33a;\n  background: color-mix(in srgb, #e0a33a 12%, transparent);\n}\n.fs-h[data-v-018dedc0] {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background: #fff;\n  border: 1px solid #333;\n  border-radius: 2px;\n  z-index: 20;\n}\n.fs-h-nw[data-v-018dedc0] { top: -5px; left: -5px; cursor: nwse-resize;\n}\n.fs-h-n[data-v-018dedc0]  { top: -5px; left: 50%; margin-left: -5px; cursor: ns-resize;\n}\n.fs-h-ne[data-v-018dedc0] { top: -5px; right: -5px; cursor: nesw-resize;\n}\n.fs-h-e[data-v-018dedc0]  { top: 50%; right: -5px; margin-top: -5px; cursor: ew-resize;\n}\n.fs-h-se[data-v-018dedc0] { bottom: -5px; right: -5px; cursor: nwse-resize;\n}\n.fs-h-s[data-v-018dedc0]  { bottom: -5px; left: 50%; margin-left: -5px; cursor: ns-resize;\n}\n.fs-h-sw[data-v-018dedc0] { bottom: -5px; left: -5px; cursor: nesw-resize;\n}\n.fs-h-w[data-v-018dedc0]  { top: 50%; left: -5px; margin-top: -5px; cursor: ew-resize;\n}\n.fs-empty[data-v-018dedc0] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  color: var(--zen-muted, #9aa0aa);\n  text-align: center;\n}\n.fs-empty > .mdi[data-v-018dedc0] {\n  font-size: 28px;\n  opacity: 0.8;\n}\n.fs-empty small[data-v-018dedc0] {\n  font-size: 10px;\n  opacity: 0.7;\n}\n.fs-empty-add[data-v-018dedc0] {\n  margin-top: 6px;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 12px;\n  border: 1px solid var(--zen-accent, #6366f1);\n  border-radius: var(--fs-rs);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, transparent);\n  color: var(--zen-text, #e5e5ea);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n/* layer sidebar */\n.fs-side[data-v-018dedc0] {\n  flex: none;\n  width: 194px;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  background: color-mix(in srgb, var(--zen-text, #fff) 2%, transparent);\n  overflow: hidden;\n}\n.fs-side-head[data-v-018dedc0] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 5px 8px;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: var(--zen-muted, #9aa0aa);\n  border-bottom: 1px solid var(--zen-border, #34343c);\n}\n.fs-side-n[data-v-018dedc0] {\n  padding: 0 5px;\n  border-radius: 8px;\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 22%, transparent);\n  color: var(--zen-text, #e5e5ea);\n  font-size: 10px;\n}\n.fs-list[data-v-018dedc0] {\n  flex: 1 1 0;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 4px;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.fs-row[data-v-018dedc0] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  padding: 4px 4px 5px;\n  border: 1px solid transparent;\n  border-radius: var(--fs-rs);\n  background: var(--zen-input, #1b1b20);\n  cursor: pointer;\n}\n.fs-row[data-v-018dedc0]:hover {\n  border-color: color-mix(in srgb, var(--zen-accent, #6366f1) 50%, transparent);\n}\n.fs-row.sel[data-v-018dedc0] {\n  border-color: var(--zen-accent, #6366f1);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, var(--zen-input, #1b1b20));\n}\n.fs-row.dragging[data-v-018dedc0] {\n  opacity: 0.4;\n}\n.fs-row.muted[data-v-018dedc0] {\n  opacity: 0.55;\n}\n.fs-rowtop[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n}\n.fs-rowbot[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding-left: 2px;\n}\n.fs-wt[data-v-018dedc0] {\n  flex: none;\n  font-size: 12px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-wslider[data-v-018dedc0] {\n  flex: 1;\n  min-width: 0;\n}\n.fs-wnum[data-v-018dedc0] {\n  flex: none;\n  width: 26px;\n  text-align: right;\n  font-size: 9.5px;\n  font-variant-numeric: tabular-nums;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-grip[data-v-018dedc0] {\n  flex: none;\n  font-size: 14px;\n  color: var(--zen-muted, #9aa0aa);\n  cursor: grab;\n}\n.fs-grip[data-v-018dedc0]:active {\n  cursor: grabbing;\n}\n.fs-rowthumb[data-v-018dedc0] {\n  flex: none;\n  width: 26px;\n  height: 26px;\n  border-radius: 4px;\n  border: 1.5px solid;\n  overflow: hidden;\n  background: var(--zen-surface, #202026);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.fs-rowthumb img[data-v-018dedc0] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.fs-rowthumb > .mdi[data-v-018dedc0] {\n  font-size: 14px;\n  color: #e0a33a;\n}\n.fs-rowname[data-v-018dedc0] {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 10.5px;\n}\n.fs-ract[data-v-018dedc0] {\n  flex: none;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: none;\n  border-radius: var(--fs-rs);\n  background: transparent;\n  color: var(--zen-muted, #9aa0aa);\n  font-size: 12px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.fs-ract[data-v-018dedc0]:hover {\n  background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent);\n  color: var(--zen-text, #e5e5ea);\n}\n.fs-ract.act[data-v-018dedc0] {\n  color: var(--zen-accent, #6366f1);\n}\n.fs-ract.danger[data-v-018dedc0]:hover {\n  background: color-mix(in srgb, #d9534f 22%, transparent);\n  color: #ff6b66;\n}\n.fs-list-empty[data-v-018dedc0] {\n  margin: 0;\n  padding: 12px 6px;\n  text-align: center;\n  font-size: 10px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-side-foot[data-v-018dedc0] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px;\n  border-top: 1px solid var(--zen-border, #34343c);\n}\n/* solid control, matching Ideogram's UiButton (subtle fill, border, accent-border on hover) */\n.fs-add[data-v-018dedc0] {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  min-height: 26px;\n  padding: 4px 10px;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--fs-rs);\n  background: var(--zen-input, #1b1b20);\n  color: var(--zen-text, #e5e5ea);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    border-color 0.1s ease,\n    background 0.1s ease;\n}\n.fs-add[data-v-018dedc0]:hover:not(:disabled) {\n  border-color: var(--zen-accent, #6366f1);\n}\n.fs-add[data-v-018dedc0]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n/* selected-layer controls, in the sidebar (vertical) */\n.fs-props[data-v-018dedc0] {\n  flex: none;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  padding: 6px;\n  border-top: 1px solid var(--zen-border, #34343c);\n}\n.fs-props-h[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.fs-dot[data-v-018dedc0] {\n  flex: none;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n}\n.fs-props-name[data-v-018dedc0] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.fs-props-row[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.fs-props-sp[data-v-018dedc0] {\n  flex: 1;\n}\n.fs-pbtn[data-v-018dedc0] {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  padding: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--fs-rs);\n  background: var(--zen-input, #1b1b20);\n  color: var(--zen-muted, #9aa0aa);\n  cursor: pointer;\n  font-size: 13px;\n}\n.fs-pbtn[data-v-018dedc0]:hover {\n  color: var(--zen-text, #e5e5ea);\n  border-color: var(--zen-accent, #6366f1);\n}\n.fs-pbtn.on[data-v-018dedc0] {\n  color: var(--zen-accent, #6366f1);\n  border-color: var(--zen-accent, #6366f1);\n}\n.fs-select[data-v-018dedc0] {\n  width: 100%;\n  height: 24px;\n  padding: 0 4px;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--fs-rs);\n  background: var(--zen-input, #1b1b20);\n  color: var(--zen-text, #e5e5ea);\n  font: inherit;\n  font-size: 11px;\n  cursor: pointer;\n  text-transform: capitalize;\n}\n.fs-prop-slider[data-v-018dedc0] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-prop-slider .mdi[data-v-018dedc0] {\n  font-size: 13px;\n  flex: none;\n}\n.fs-prop-slider .fs-pslider[data-v-018dedc0] {\n  flex: 1;\n  min-width: 0;\n}\n.fs-prop-v[data-v-018dedc0] {\n  flex: none;\n  width: 26px;\n  text-align: right;\n  font-size: 9.5px;\n  font-variant-numeric: tabular-nums;\n}\n.fs-dropmask[data-v-018dedc0] {\n  position: absolute;\n  inset: 0;\n  z-index: 30;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  border: 2px dashed var(--zen-accent, #6366f1);\n  border-radius: var(--zen-radius, 9px);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, rgba(0, 0, 0, 0.55));\n  color: var(--zen-text, #e5e5ea);\n  font-size: 11px;\n  font-weight: 600;\n  pointer-events: none;\n}\n.fs-dropmask .mdi[data-v-018dedc0] {\n  font-size: 28px;\n}\n\n/* browse dialog */\n.fs-search[data-v-018dedc0] {\n  flex: 1;\n  min-width: 0;\n  max-width: 320px;\n  display: flex;\n}\n.fs-bgrid[data-v-018dedc0] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: 12px;\n  align-items: start;\n}\n.fs-bcard[data-v-018dedc0] {\n  display: flex;\n  flex-direction: column;\n  height: 160px;\n  padding: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 9px);\n  background: var(--zen-input, #1b1b20);\n  cursor: pointer;\n  overflow: hidden;\n  text-align: left;\n  color: inherit;\n  font: inherit;\n}\n.fs-bcard[data-v-018dedc0]:hover,\n.fs-bcard.sel[data-v-018dedc0] {\n  border-color: var(--zen-accent, #6366f1);\n}\n.fs-bcard.sel[data-v-018dedc0] {\n  box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset;\n}\n.fs-bcard-img[data-v-018dedc0] {\n  position: relative;\n  flex: 1 1 0;\n  min-height: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--zen-surface, #202026);\n  overflow: hidden;\n}\n.fs-bcard-img img[data-v-018dedc0] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n}\n.fs-bcard-tick[data-v-018dedc0] {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: var(--zen-accent, #6366f1);\n  color: var(--zen-accent-text, #fff);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n}\n.fs-bcard-meta[data-v-018dedc0] {\n  flex: none;\n  height: 32px;\n  box-sizing: border-box;\n  padding: 5px 8px;\n  display: flex;\n  align-items: center;\n  border-top: 1px solid var(--zen-border, #34343c);\n}\n.fs-bcard-name[data-v-018dedc0] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n}\n.fs-bgrid-empty[data-v-018dedc0] {\n  grid-column: 1 / -1;\n  text-align: center;\n  color: var(--zen-muted, #9aa0aa);\n  padding: 30px;\n}\n\n/* preset library */\n.fs-lib[data-v-018dedc0] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 12px;\n  align-items: start;\n}\n.fs-libcard[data-v-018dedc0] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 0;\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: inherit;\n  font: inherit;\n  text-align: left;\n}\n.fs-libcard-img[data-v-018dedc0] {\n  position: relative;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 9px);\n  background: var(--zen-surface, #202026);\n  overflow: hidden;\n}\n.fs-libcard:hover .fs-libcard-img[data-v-018dedc0] {\n  border-color: var(--zen-accent, #6366f1);\n}\n.fs-libcard-img img[data-v-018dedc0] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.fs-libcard-img > .mdi[data-v-018dedc0] {\n  font-size: 32px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fs-libdel[data-v-018dedc0] {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  font-size: 12px;\n  cursor: pointer;\n  opacity: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.12s ease;\n}\n.fs-libcard:hover .fs-libdel[data-v-018dedc0] {\n  opacity: 1;\n}\n.fs-libdel[data-v-018dedc0]:hover {\n  background: #d9534f;\n}\n.fs-libcard-name[data-v-018dedc0] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n  color: var(--zen-text, #e5e5ea);\n}\n.fs-lib-empty[data-v-018dedc0] {\n  grid-column: 1 / -1;\n  text-align: center;\n  color: var(--zen-muted, #9aa0aa);\n  padding: 30px;\n}\n.fs-libsave-name[data-v-018dedc0] {\n  flex: 1;\n  min-width: 0;\n  max-width: 260px;\n}\n\n.fi[data-v-9dce09b3] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  height: 100%;\n  min-height: 0;\n  padding: 2px;\n  box-sizing: border-box;\n  font-size: 12px;\n  color: var(--zen-text, #e5e5ea);\n  /* same radius hierarchy as Fusion Studio (panels vs controls). */\n  --fs-r: var(--zen-radius, 8px);\n  --fs-rs: var(--radius-sm, 5px);\n}\n.fi-empty[data-v-9dce09b3] {\n  height: 100%;\n  min-height: 120px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  color: var(--zen-muted, #9aa0aa);\n  text-align: center;\n}\n.fi-empty > .mdi[data-v-9dce09b3] {\n  font-size: 30px;\n  opacity: 0.8;\n}\n.fi-empty small[data-v-9dce09b3] {\n  font-size: 10px;\n  opacity: 0.75;\n}\n.fi-bar[data-v-9dce09b3] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.fi-main[data-v-9dce09b3] {\n  flex: 1 1 auto;\n  min-height: 0;\n  display: flex;\n  gap: 6px;\n}\n.fi-gridwrap[data-v-9dce09b3] {\n  position: relative;\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  background: #0e0e12;\n}\n.fi-caption[data-v-9dce09b3] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 3px 6px;\n  font-size: 9px;\n  line-height: 1.25;\n  text-align: center;\n  color: var(--zen-text, #e5e5ea);\n  background: linear-gradient(transparent, rgba(0, 0, 0, 0.72));\n  pointer-events: none;\n}\n.fi-canvas[data-v-9dce09b3] {\n  display: block;\n  image-rendering: pixelated;\n}\n.fi-side[data-v-9dce09b3] {\n  flex: none;\n  width: 190px;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  background: color-mix(in srgb, var(--zen-text, #fff) 2%, transparent);\n  overflow: hidden;\n}\n.fi-side-head[data-v-9dce09b3] {\n  flex: none;\n  padding: 5px 8px;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: var(--zen-muted, #9aa0aa);\n  border-bottom: 1px solid var(--zen-border, #34343c);\n}\n.fi-bars[data-v-9dce09b3],\n.fi-legend[data-v-9dce09b3] {\n  flex: 1 1 0;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fi-brow[data-v-9dce09b3],\n.fi-lrow[data-v-9dce09b3] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10.5px;\n}\n.fi-lrow[data-v-9dce09b3] {\n  padding: 3px;\n  border: 1px solid transparent;\n  border-radius: var(--fs-rs);\n  background: none;\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n  text-align: left;\n}\n.fi-lrow[data-v-9dce09b3]:hover {\n  border-color: color-mix(in srgb, var(--zen-accent, #6366f1) 50%, transparent);\n}\n.fi-lrow.on[data-v-9dce09b3] {\n  border-color: var(--zen-accent, #6366f1);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, transparent);\n}\n.fi-thumb[data-v-9dce09b3] {\n  flex: none;\n  width: 24px;\n  height: 24px;\n  border-radius: 4px;\n  border: 1.5px solid;\n  overflow: hidden;\n  background: var(--zen-surface, #202026);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.fi-thumb.sm[data-v-9dce09b3] {\n  width: 17px;\n  height: 17px;\n  border-radius: 3px;\n}\n.fi-thumb img[data-v-9dce09b3] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.fi-thumb-fill[data-v-9dce09b3] {\n  width: 100%;\n  height: 100%;\n}\n.fi-blabel[data-v-9dce09b3] {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.fi-btrack[data-v-9dce09b3] {\n  flex: 1.4;\n  height: 6px;\n  border-radius: 3px;\n  background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent);\n  overflow: hidden;\n}\n.fi-bfill[data-v-9dce09b3] {\n  display: block;\n  height: 100%;\n  border-radius: 3px;\n}\n.fi-bval[data-v-9dce09b3] {\n  flex: none;\n  width: 26px;\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fi-lstr[data-v-9dce09b3] {\n  flex: none;\n  font-variant-numeric: tabular-nums;\n  font-size: 10px;\n  color: var(--zen-text, #e5e5ea);\n}\n.fi-lmeta[data-v-9dce09b3] {\n  flex: none;\n  min-width: 30px;\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n  color: var(--zen-muted, #9aa0aa);\n}\n.fi-lhint[data-v-9dce09b3] {\n  flex: none;\n  margin: 0;\n  padding: 5px 7px;\n  font-size: 9.5px;\n  line-height: 1.3;\n  color: var(--zen-muted, #9aa0aa);\n  border-top: 1px solid var(--zen-border, #34343c);\n}\n.fi-lhint b[data-v-9dce09b3] {\n  color: var(--zen-text, #e5e5ea);\n}\n\n/* side-panel tabs */\n.fi-side-tabs[data-v-9dce09b3] {\n  flex: none;\n  display: flex;\n  gap: 3px;\n  padding: 4px;\n  border-bottom: 1px solid var(--zen-border, #34343c);\n}\n.fi-tab[data-v-9dce09b3] {\n  flex: 1;\n  padding: 3px 6px;\n  border: 1px solid transparent;\n  border-radius: var(--zen-radius, 5px);\n  background: none;\n  color: var(--zen-muted, #9aa0aa);\n  font: inherit;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  cursor: pointer;\n}\n.fi-tab[data-v-9dce09b3]:hover {\n  color: var(--zen-text, #e5e5ea);\n}\n.fi-tab.on[data-v-9dce09b3] {\n  color: var(--zen-text, #e5e5ea);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, transparent);\n}\n\n/* settings tab */\n.fi-settings[data-v-9dce09b3] {\n  flex: 1 1 0;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 4px 6px 6px;\n}\n.fi-sgroup[data-v-9dce09b3] {\n  margin-top: 5px;\n}\n.fi-sgroup-h[data-v-9dce09b3] {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: var(--zen-accent, #6366f1);\n  margin-bottom: 2px;\n}\n.fi-srow[data-v-9dce09b3] {\n  display: flex;\n  justify-content: space-between;\n  gap: 6px;\n  font-size: 10.5px;\n  padding: 1px 0;\n}\n.fi-srow.dim[data-v-9dce09b3] {\n  opacity: 0.4;\n}\n.fi-sk[data-v-9dce09b3] {\n  color: var(--zen-muted, #9aa0aa);\n}\n.fi-svv[data-v-9dce09b3] {\n  color: var(--zen-text, #e5e5ea);\n  font-variant-numeric: tabular-nums;\n  text-align: right;\n}\n\n/* natural content flow — the node auto-grows to fit (see mountWidget), so rows are never\n   scrolled and the Add button simply follows the last row. */\n.ls[data-v-eb7918f8] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 2px;\n  box-sizing: border-box;\n  font-size: 12px;\n  color: var(--zen-text, #e5e5ea);\n}\n.ls-mid[data-v-eb7918f8] {\n  display: flex;\n  flex-direction: column;\n}\n.ls-rows[data-v-eb7918f8] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.ls-empty[data-v-eb7918f8] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  padding: 14px 8px;\n  text-align: center;\n  color: var(--zen-muted, #9aa0aa);\n  border: 1px dashed var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 8px);\n  background: color-mix(in srgb, var(--zen-text, #fff) 3%, transparent);\n}\n.ls-empty > .mdi[data-v-eb7918f8] {\n  font-size: 24px;\n  opacity: 0.8;\n}\n.ls-empty > span[data-v-eb7918f8] {\n  font-size: 11px;\n}\n.ls-row[data-v-eb7918f8] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.ls-row.off[data-v-eb7918f8] {\n  opacity: 0.5;\n}\n.ls-row.dragging[data-v-eb7918f8] {\n  opacity: 0.4;\n}\n.ls-row.over[data-v-eb7918f8] {\n  outline: 2px solid var(--zen-accent, #6366f1);\n  outline-offset: -1px;\n  border-radius: var(--zen-radius, 6px);\n}\n.ls-grip[data-v-eb7918f8] {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2px;\n  cursor: grab;\n  color: var(--zen-muted, #9aa0aa);\n  font-size: 16px;\n}\n.ls-grip[data-v-eb7918f8]:active {\n  cursor: grabbing;\n}\n.ls-grip[data-v-eb7918f8]:hover {\n  color: var(--zen-text, #e5e5ea);\n}\n.ls-pick[data-v-eb7918f8] {\n  flex: 1;\n  min-width: 0;\n}\n/* fixed width so every row's combo lines up regardless of the strength digits */\n.ls-str[data-v-eb7918f8] {\n  flex: none;\n  width: 84px;\n}\n.ls-foot[data-v-eb7918f8] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.ls-add[data-v-eb7918f8] {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px;\n  border: 1px dashed var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 7px);\n  background: transparent;\n  color: var(--zen-muted, #9aa0aa);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    border-color 0.12s ease,\n    color 0.12s ease,\n    background 0.12s ease;\n}\n.ls-add[data-v-eb7918f8]:hover {\n  border-color: var(--zen-accent, #6366f1);\n  color: var(--zen-text, #e5e5ea);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 8%, transparent);\n}\n.ls-add .mdi[data-v-eb7918f8] {\n  font-size: 15px;\n}\n.ls-add-n[data-v-eb7918f8] {\n  margin-left: 4px;\n  padding: 0 5px;\n  border-radius: var(--zen-radius, 8px);\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 22%, transparent);\n  color: var(--zen-text, #e5e5ea);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n/* browse-modal folder navigation */\n.ls-crumbs[data-v-eb7918f8] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 2px;\n  padding-bottom: 10px;\n}\n.ls-crumb[data-v-eb7918f8] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font: inherit;\n  font-size: 12px;\n  padding: 2px 6px;\n  border-radius: var(--zen-radius, 5px);\n  color: var(--zen-muted, #9aa0aa);\n}\n.ls-crumb[data-v-eb7918f8]:hover {\n  color: var(--zen-text, #e5e5ea);\n  background: color-mix(in srgb, var(--zen-text, #fff) 6%, transparent);\n}\n.ls-crumb.on[data-v-eb7918f8] {\n  color: var(--zen-text, #e5e5ea);\n  font-weight: 600;\n}\n.ls-crumbs .mdi[data-v-eb7918f8] {\n  color: var(--zen-muted, #9aa0aa);\n  font-size: 14px;\n}\n.ls-folder .ls-card-img[data-v-eb7918f8] {\n  background: color-mix(in srgb, var(--zen-accent, #6366f1) 8%, var(--zen-surface, #202026));\n}\n.ls-folder .ls-card-img > .mdi[data-v-eb7918f8] {\n  font-size: 40px;\n  color: var(--zen-accent, #6366f1);\n}\n.ls-sel[data-v-eb7918f8] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n}\n.ls-sel-name[data-v-eb7918f8] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n/* a chosen LoRA that no longer exists on disk */\n.ls-sel.missing .ls-sel-name[data-v-eb7918f8] {\n  color: var(--zen-danger, #f5665f);\n}\n.ls-thumb.warn[data-v-eb7918f8] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--zen-danger, #f5665f);\n  background: color-mix(in srgb, var(--zen-danger, #f5665f) 14%, transparent);\n  border-color: color-mix(in srgb, var(--zen-danger, #f5665f) 45%, transparent);\n  font-size: 12px;\n}\n.ls-thumb[data-v-eb7918f8] {\n  flex: none;\n  box-sizing: border-box;\n  width: 40px;\n  height: 40px;\n  object-fit: contain;\n  border-radius: var(--zen-radius, 6px);\n  background: var(--zen-input, #1b1b20);\n  border: 1px solid var(--zen-border, #34343c);\n}\n.ls-thumb.sm[data-v-eb7918f8] {\n  width: 18px;\n  height: 18px;\n  border-radius: var(--zen-radius, 5px);\n}\n.ls-thumb.ph[data-v-eb7918f8] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--zen-muted, #9aa0aa);\n  font-size: 20px;\n}\n.ls-thumb.sm.ph[data-v-eb7918f8] {\n  font-size: 11px;\n}\n.ls-opt-txt[data-v-eb7918f8] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  line-height: 1.25;\n}\n.ls-opt-name[data-v-eb7918f8] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 12.5px;\n}\n.ls-opt-dir[data-v-eb7918f8] {\n  font-size: 10px;\n  color: var(--zen-muted, #9aa0aa);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ls-star[data-v-eb7918f8] {\n  flex: none;\n  border: none;\n  background: none;\n  cursor: pointer;\n  color: var(--zen-muted, #9aa0aa);\n  font-size: 15px;\n  padding: 2px;\n  display: inline-flex;\n}\n.ls-star.on[data-v-eb7918f8],\n.ls-star[data-v-eb7918f8]:hover {\n  color: #f5b301;\n}\n\n/* browser dialog */\n.ls-search[data-v-eb7918f8] {\n  flex: 1;\n  min-width: 0;\n  max-width: 320px;\n  display: flex;\n}\n.ls-grid[data-v-eb7918f8] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 12px;\n  align-items: start;\n}\n/* every card is a fixed size: fixed-height image + fixed-height meta, so neither the\n   image dimensions nor the text length can change a card's footprint. */\n.ls-card[data-v-eb7918f8] {\n  display: flex;\n  flex-direction: column;\n  height: 170px;\n  padding: 0;\n  border: 1px solid var(--zen-border, #34343c);\n  border-radius: var(--zen-radius, 9px);\n  background: var(--zen-input, #1b1b20);\n  cursor: pointer;\n  overflow: hidden;\n  text-align: left;\n  color: inherit;\n  font: inherit;\n}\n.ls-card[data-v-eb7918f8]:hover {\n  border-color: var(--zen-accent, #6366f1);\n}\n.ls-card.sel[data-v-eb7918f8] {\n  border-color: var(--zen-accent, #6366f1);\n  box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset;\n}\n.ls-card-img[data-v-eb7918f8] {\n  position: relative;\n  flex: 1 1 0;\n  min-height: 0;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--zen-surface, #202026);\n  overflow: hidden;\n}\n.ls-card-img img[data-v-eb7918f8] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n}\n.ls-card-img > .mdi[data-v-eb7918f8] {\n  font-size: 32px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.ls-card-star[data-v-eb7918f8] {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.5);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 14px;\n}\n.ls-card-star.on[data-v-eb7918f8] {\n  color: #f5b301;\n}\n/* fixed-height meta so every card is identical regardless of folder/name length */\n.ls-card-meta[data-v-eb7918f8] {\n  flex: none;\n  height: 38px;\n  box-sizing: border-box;\n  padding: 5px 8px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 1px;\n  border-top: 1px solid var(--zen-border, #34343c);\n}\n.ls-card-name[data-v-eb7918f8] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 12px;\n}\n.ls-card-dir[data-v-eb7918f8] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 10px;\n  color: var(--zen-muted, #9aa0aa);\n}\n.ls-grid-empty[data-v-eb7918f8] {\n  grid-column: 1 / -1;\n  text-align: center;\n  color: var(--zen-muted, #9aa0aa);\n  padding: 30px;\n}\n/* ZenKit ↔ ComfyUI theme bridge — the runtime-free way to theme @zenkit/ui.\n *\n * @zenkit/ui components read --zen-* tokens. WITH the ZenKit runtime installed,\n * @zenkit/core sets those from the active theme pack (the derivation in @zenkit/theme's\n * zen.ts → zenAliases). Consumers that use @zenkit/ui WITHOUT the runtime import this file\n * instead: it maps the same --zen-* set straight onto ComfyUI's native theme variables, so\n * the components follow the user's selected ComfyUI theme with zero JS.\n *\n * Declared at :root so teleported overlays (ZenPopover / ZenCombo menus, ZenModal) — which\n * mount outside any component subtree — pick the tokens up too. The right-hand fallbacks keep\n * every token sane if ComfyUI renames or drops a variable. Kept in lockstep with zen.ts: the\n * same 10 tokens, sourced from the host instead of a pack. (The other --zen-* tokens the\n * components use — glass, mono, scrollbar, switch-radius — resolve through inline fallbacks\n * that chain back to these, so this set is sufficient on its own.)\n *\n * Import once, near your extension entry:  import '@zenkit/ui/comfy-bridge.css'\n */\n:root {\n  --zen-bg: var(--comfy-menu-bg, #1a1a1f);\n  --zen-surface: var(--comfy-menu-secondary-bg, #202026);\n  --zen-surface-2: var(--comfy-menu-secondary-bg, #26262d);\n  --zen-input: var(--comfy-input-bg, #1b1b20);\n  --zen-border: var(--border-color, #34343c);\n  --zen-text: var(--input-text, var(--fg-color, #e5e5ea));\n  --zen-muted: var(--descrip-text, #9aa0aa);\n  --zen-accent: var(--p-primary-color, #6366f1);\n  --zen-accent-text: var(--p-button-text-primary-color, #fff);\n  --zen-radius: var(--border-radius-base, 7px);\n}\n";document.head.appendChild(s);})();import { app } from "../../../scripts/app.js";
import { api } from "../../../scripts/api.js";
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
const camelizeRE = /-\w/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  // TODO isolatedDeclarations "__v_skip"
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this._warnOnRun = true;
    this.__v_skip = true;
    if (!detached && activeEffectScope) {
      if (activeEffectScope.active) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      } else {
        this._active = false;
        this._warnOnRun = false;
      }
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (activeEffectScope === this) {
        activeEffectScope = this.prevScope;
      } else {
        let current = activeEffectScope;
        while (current) {
          if (current.prevScope === this) {
            current.prevScope = this.prevScope;
            break;
          }
          current = current.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope) {
      if (activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      } else {
        this.flags &= -2;
      }
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self2) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self2, acc);
        }
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self2, result) : result;
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver) && result) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const rawValue = /* @__PURE__ */ toRaw(value);
        const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  if (target["__v_skip"] || !Object.isExtensible(target)) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = targetTypeMap(toRawType(target));
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
const toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef(source)) {
    getter = () => source.value;
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
    getter = () => source.map((s) => {
      if (/* @__PURE__ */ isRef(s)) {
        return s.value;
      } else if (/* @__PURE__ */ isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      const res = _cb(...args);
      watchHandle();
      return res;
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (/* @__PURE__ */ isRef(value)) {
    value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = /* @__PURE__ */ toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function provide(key, value) {
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const pendingMounts = /* @__PURE__ */ new WeakMap();
const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment, parentNode }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { dynamicChildren } = n2;
    const mount = (vnode, container2, anchor2) => {
      if (vnode.shapeFlag & 16) {
        mountChildren(
          vnode.children,
          container2,
          anchor2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const mountToTarget = (vnode = n2) => {
      const disabled2 = isTeleportDisabled(vnode.props);
      const target = vnode.target = resolveTarget(vnode.props, querySelector);
      const targetAnchor = prepareAnchor(target, vnode, createText, insert);
      if (target) {
        if (namespace !== "svg" && isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace !== "mathml" && isTargetMathML(target)) {
          namespace = "mathml";
        }
        if (parentComponent && parentComponent.isCE) {
          (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
        }
        if (!disabled2) {
          mount(vnode, target, targetAnchor);
          updateCssVars(vnode, false);
        }
      }
    };
    const queuePendingMount = (vnode) => {
      const mountJob = () => {
        if (pendingMounts.get(vnode) !== mountJob) return;
        pendingMounts.delete(vnode);
        if (isTeleportDisabled(vnode.props)) {
          const mountContainer = parentNode(vnode.el) || container;
          mount(vnode, mountContainer, vnode.anchor);
          updateCssVars(vnode, true);
        }
        mountToTarget(vnode);
      };
      pendingMounts.set(vnode, mountJob);
      queuePostRenderEffect(mountJob, parentSuspense);
    };
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
        queuePendingMount(n2);
        return;
      }
      if (disabled) {
        mount(n2, container, mainAnchor);
        updateCssVars(n2, true);
      }
      mountToTarget();
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const pendingMount = pendingMounts.get(n1);
      if (pendingMount) {
        pendingMount.flags |= 8;
        pendingMounts.delete(n1);
        queuePendingMount(n2);
        return;
      }
      n2.targetStart = n1.targetStart;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            n2.target = nextTarget;
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props
    } = vnode;
    const disabled = isTeleportDisabled(props);
    const shouldRemove = doRemove || !disabled;
    const pendingMount = pendingMounts.get(vnode);
    if (pendingMount) {
      pendingMount.flags |= 8;
      pendingMounts.delete(vnode);
    }
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (!pendingMount && (disabled || target) && shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!pendingMounts.has(vnode) && (!isReorder || isTeleportDisabled(props))) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector, insert, createText }
}, hydrateChildren) {
  function hydrateAnchor(target2, targetNode) {
    let targetAnchor = targetNode;
    while (targetAnchor) {
      if (targetAnchor && targetAnchor.nodeType === 8) {
        if (targetAnchor.data === "teleport start anchor") {
          vnode.targetStart = targetAnchor;
        } else if (targetAnchor.data === "teleport anchor") {
          vnode.targetAnchor = targetAnchor;
          target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
          break;
        }
      }
      targetAnchor = nextSibling(targetAnchor);
    }
  }
  function hydrateDisabledTeleport(node2, vnode2) {
    vnode2.anchor = hydrateChildren(
      nextSibling(node2),
      vnode2,
      parentNode(node2),
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
  }
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  const disabled = isTeleportDisabled(vnode.props);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        hydrateDisabledTeleport(node, vnode);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(
            target,
            vnode,
            createText,
            insert,
            // if target is the same as the main view, insert anchors before current node
            // to avoid hydrating mismatch
            parentNode(node) === target ? node : null
          );
        }
      } else {
        vnode.anchor = nextSibling(node);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode, disabled);
  } else if (disabled) {
    if (vnode.shapeFlag & 16) {
      hydrateDisabledTeleport(node, vnode);
      vnode.targetStart = node;
      vnode.targetAnchor = nextSibling(node);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert, anchor = null) {
  const targetStart = vnode.targetStart = createText("");
  const targetAnchor = vnode.targetAnchor = createText("");
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target, anchor);
    insert(targetAnchor, target, anchor);
  }
  return targetAnchor;
}
const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function isTemplateRefKey(refs, key) {
  let desc;
  return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = /* @__PURE__ */ toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    if (isTemplateRefKey(refs, key)) {
      return false;
    }
    return hasOwn(rawSetupState, key);
  };
  const canSetRef = (ref22, key) => {
    if (key && isTemplateRefKey(refs, key)) {
      return false;
    }
    return true;
  };
  if (oldRef != null && oldRef !== ref3) {
    invalidatePendingSetRef(oldRawRef);
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (/* @__PURE__ */ isRef(oldRef)) {
      const oldRawRefAtom = oldRawRef;
      if (canSetRef(oldRef, oldRawRefAtom.k)) {
        oldRef.value = null;
      }
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref3)) {
    pauseTracking();
    try {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } finally {
      resetTracking();
    }
  } else {
    const _isString = isString(ref3);
    const _isRef = /* @__PURE__ */ isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                const newVal = [refValue];
                if (canSetRef(ref3, rawRef.k)) {
                  ref3.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          if (canSetRef(ref3, rawRef.k)) {
            ref3.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !/* @__PURE__ */ isShallow(source);
      isReadonlySource = /* @__PURE__ */ isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached);
      }
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
    const hasProps = Object.keys(props).length > 0;
    if (name !== "default") props.name = name;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", props, fallback && fallback())],
      hasProps ? -2 : 64
    );
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  const rendered = createBlock(
    Fragment,
    {
      key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
      (!validSlotContent && fallback ? "_fb" : "")
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function useSlots() {
  return getContext().slots;
}
function getContext(calledFunctionName) {
  const i = getCurrentInstance();
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted: mounted2,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) ;
    else {
      instance.data = /* @__PURE__ */ reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted2);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (/* @__PURE__ */ isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app2._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app2._instance,
            16
          );
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app2;
  };
}
let currentApp = null;
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2);
  key = key === "Once" ? key : key.replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? /* @__PURE__ */ shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? /* @__PURE__ */ shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return /* @__PURE__ */ shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? /* @__PURE__ */ shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
  const nextProp = nextProps[key];
  const prevProp = prevProps[key];
  if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
    return !looseEqual(nextProp, prevProp);
  }
  return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.suspense.vnode.el = root.el = el;
      vnode = root;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
  if (suspense && suspense.activeBranch === vnode) {
    suspense.vnode.el = el;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = /* @__PURE__ */ toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref3 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        try {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        } finally {
        }
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (
      // #6385 the old vnode may be a user-wrapped non-isomorphic block
      // Force full diff when block metadata is unstable.
      dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce && root.ce._hasShadowRoot()) {
            root.ce._injectChildStyle(
              type,
              instance.parent ? instance.parent.type : void 0
            );
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              queuePostRenderEffect(() => {
                if (!instance.isUnmounted) update();
              }, parentSuspense);
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        if (transition.persisted && !el[leaveCbKey]) {
          hostInsert(el, container, anchor);
        } else {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        }
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          const wasLeaving = el._isLeaving || !!el[leaveCbKey];
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          if (transition.persisted && !wasLeaving) {
            remove22();
          } else {
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          }
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex,
      memo
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    const shouldInvalidateMemo = memo != null && cacheIndex == null;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        if (shouldInvalidateMemo) {
          vnode.el = null;
        }
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    let instance;
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
        instance = container._vnode.component;
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs(instance);
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        if (c2.patchFlag === -1) {
          c2 = ch2[i] = cloneIfMounted(c2);
        }
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
  if (anchorVnode.placeholder) {
    return anchorVnode.placeholder;
  }
  const instance = anchorVnode.component;
  if (instance) {
    return resolveAsyncComponentPlaceholder(instance.subTree);
  }
  return null;
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
const Text = /* @__PURE__ */ Symbol.for("v-txt");
const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
const Static = /* @__PURE__ */ Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (/* @__PURE__ */ isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    if (shapeFlag & (1 | 64)) {
      normalizeChildren(vnode, { default: children });
      return;
    }
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        } else if (incoming == null && existing == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !isModelListener(key)) {
          ret[key] = incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance) {
    const inferFromRegistry = (registry2) => {
      for (const key in registry2) {
        if (registry2[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
const version = "3.5.39";
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = /* @__PURE__ */ Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      const value = next[key];
      if (value != null) {
        if (!shouldPreserveTextareaResizeStyle(
          el,
          key,
          !isString(prev) && prev ? prev[key] : void 0,
          value
        )) {
          setStyle(style, key, value);
        }
      } else {
        setStyle(style, key, "");
      }
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
  return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(Once|Passive|Capture)$/;
const optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  let m;
  while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
    if (!options) options = {};
    name = name.slice(0, name.length - m[1].length);
    options[m[1].toLowerCase()] = true;
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    const value = invoker.value;
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      const handlers = value.slice();
      const args = [e];
      for (let i = 0; i < handlers.length; i++) {
        if (e._stopped) {
          break;
        }
        const handler = handlers[i];
        if (handler) {
          callWithAsyncErrorHandling(
            handler,
            instance,
            5,
            args
          );
        }
      }
    } else {
      callWithAsyncErrorHandling(
        value,
        instance,
        5,
        [e]
      );
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && // #12408 check if it's declared prop or it's async custom element
    (shouldSetAsPropForVueCE(el, key) || // @ts-expect-error _def is private
    el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
  const props = (
    // @ts-expect-error _def is private
    el._def.props
  );
  if (!props) {
    return false;
  }
  const camelKey = camelize(key);
  return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = /* @__PURE__ */ Symbol("_assign");
function castValue(value, trim, number) {
  if (trim) value = value.trim();
  if (number) value = looseToNumber(value);
  return value;
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      el[assignKey](castValue(el.value, trim, castToNumber));
    });
    if (trim || castToNumber) {
      addEventListener(el, "change", () => {
        el.value = castValue(el.value, trim, castToNumber);
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    const rootNode = el.getRootNode();
    if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  if (!fn) return fn;
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  }));
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some(
      (k) => k === eventKey || keyNames[k] === eventKey
    )) {
      return fn(event);
    }
  }));
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = ((...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
});
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const live = /* @__PURE__ */ new WeakMap();
function mountWidget(node, opts) {
  const fill = !!opts.fill;
  const container = document.createElement("div");
  container.dataset["nynxz"] = opts.widgetType;
  Object.assign(container.style, {
    width: "100%",
    overflow: fill ? "hidden" : "visible",
    pointerEvents: opts.dragThrough ? "none" : "auto",
    ...fill ? { height: "100%", minHeight: `${opts.minHeight ?? 80}px` } : {}
  });
  const inner = document.createElement("div");
  inner.style.width = "100%";
  if (fill)
    Object.assign(inner.style, {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxSizing: "border-box"
    });
  container.appendChild(inner);
  const floor = opts.minHeight ?? 40;
  const serialize = opts.serialize !== false;
  let stored = opts.defaultValue;
  const widget = node.addDOMWidget(opts.widgetName, opts.widgetType, container, {
    // fill: report a fixed floor and let ComfyUI hand the widget the node's spare
    // height (the component fills it). content: grow to fit the rendered content.
    getMinHeight: () => fill ? floor : Math.max(floor, Math.ceil(inner.scrollHeight)),
    hideOnZoom: false,
    serialize,
    getValue: () => stored,
    setValue: (v) => {
      stored = v;
    }
  });
  if (serialize) widget.serializeValue = () => stored;
  function fit() {
    try {
      if (typeof node.computeSize === "function" && typeof node.setSize === "function") {
        const sz = node.computeSize();
        node.setSize([node.size?.[0] ?? sz[0], sz[1]]);
      }
    } catch {
    }
    node.graph?.setDirtyCanvas?.(true, true);
  }
  Promise.resolve().then(() => {
    try {
      const app2 = createApp(opts.component, { widget, node });
      app2.mount(inner);
      let ro;
      if (!fill && typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => fit());
        ro.observe(inner);
      }
      live.set(widget, { app: app2, ro });
      if (!fill) fit();
      if (opts.dragThrough) {
        const transp = () => {
          const h = container.parentElement;
          if (h) h.style.pointerEvents = "none";
        };
        transp();
        [60, 200, 600, 1500].forEach((t) => window.setTimeout(transp, t));
      }
    } catch (err) {
      console.error("[Nynxz] failed to mount widget", opts.widgetType, err);
    }
  });
  const prevOnRemove = widget.onRemove;
  widget.onRemove = () => {
    try {
      const l = live.get(widget);
      if (l) {
        l.ro?.disconnect();
        l.app.unmount();
        live.delete(widget);
      }
    } catch (err) {
      console.error("[Nynxz] widget unmount error", err);
    }
    try {
      prevOnRemove?.call(widget);
    } catch (err) {
      console.error("[Nynxz] chained onRemove error", err);
    }
  };
  return { widget };
}
function getZenKit() {
  return typeof window !== "undefined" && window.ZenKit || null;
}
function whenZenKit(timeout = 6e3) {
  const now = getZenKit();
  if (now) return now.ready ?? Promise.resolve(now);
  if (typeof window === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("zen:ready", finish);
      resolve(getZenKit());
    };
    window.addEventListener("zen:ready", finish);
    window.setTimeout(finish, timeout);
  });
}
function registerSlotLink(spec) {
  whenZenKit().then((zen) => {
    try {
      zen?.graph?.slotLink?.(spec);
    } catch {
    }
  });
}
const asArray = (v) => Array.isArray(v) ? v : [v];
function registerNodes(name, defs) {
  const byClass = /* @__PURE__ */ new Map();
  for (const def2 of defs) for (const cls of asArray(def2.is)) byClass.set(cls, def2);
  const widgets = {};
  for (const def2 of defs)
    for (const w of def2.widgets ?? []) {
      if (widgets[w.type]) continue;
      widgets[w.type] = (node) => mountWidget(node, {
        widgetName: w.name,
        widgetType: w.type,
        component: w.component,
        minHeight: w.minHeight,
        fill: w.fill,
        dragThrough: w.dragThrough,
        serialize: w.serialize,
        defaultValue: w.default
      });
    }
  const settings = defs.flatMap((d) => d.settings ?? []);
  app.registerExtension({
    name,
    ...settings.length ? { settings } : {},
    getCustomWidgets() {
      return widgets;
    },
    nodeCreated(node) {
      const lg = node;
      const def2 = byClass.get(lg.constructor?.comfyClass ?? "");
      if (!def2) return;
      if (def2.minSize)
        lg.setSize([Math.max(lg.size[0], def2.minSize[0]), Math.max(lg.size[1], def2.minSize[1])]);
      if (def2.hideOutputImages) lg.hideOutputImages = true;
      if (def2.output) {
        const { widget, from } = def2.output;
        const prev = lg.onExecuted;
        lg.onExecuted = function(output) {
          prev?.call(this, output);
          const w = lg.widgets?.find((c) => c.name === widget);
          if (!w) return;
          const value = from(output ?? {});
          w.value = value;
          try {
            w.callback?.(value);
          } catch {
          }
        };
      }
    }
  });
  for (const def2 of defs)
    for (const sl of def2.slotLinks ?? [])
      for (const cls of asArray(def2.is))
        registerSlotLink({
          on: sl.input != null ? { node: cls, input: sl.input } : { node: cls, output: sl.output },
          spawn: sl.spawn
        });
}
function defineNode(def2) {
  return def2;
}
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "ZenScroll",
  props: {
    horizontal: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["zen-scroll", { x: __props.horizontal }])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const ZenScroll = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-38b756b6"]]);
const _hoisted_1$d = ["disabled"];
const _hoisted_2$b = {
  key: 1,
  class: "lbl"
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ZenButton",
  props: {
    variant: { default: "default" },
    icon: {},
    block: { type: Boolean, default: false },
    sm: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass(["zen-btn", [__props.variant, { block: __props.block, sm: __props.sm }]]),
        disabled: __props.disabled
      }, [
        __props.icon ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(__props.icon)
        }, null, 2)) : createCommentVNode("", true),
        _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_2$b, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 10, _hoisted_1$d);
    };
  }
});
const ZenButton = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-7242ad73"]]);
const _hoisted_1$c = ["disabled"];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "ZenIconButton",
  props: {
    icon: {},
    danger: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass(["zen-iconbtn", { danger: __props.danger, active: __props.active }]),
        disabled: __props.disabled
      }, [
        createBaseVNode("i", {
          class: normalizeClass(__props.icon)
        }, null, 2)
      ], 10, _hoisted_1$c);
    };
  }
});
const ZenIconButton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-fc152c1e"]]);
const _hoisted_1$b = ["rows", "placeholder", "disabled", "value"];
const _hoisted_2$a = ["type", "placeholder", "disabled", "min", "max", "step", "value"];
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "ZenInput",
  props: {
    modelValue: {},
    type: { default: "text" },
    placeholder: {},
    rows: { default: 4 },
    min: {},
    max: {},
    step: {},
    disabled: { type: Boolean, default: false },
    sm: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit2 = __emit;
    function onInput(e) {
      const v = e.target.value;
      if (props.type === "number") {
        const n = Number(v);
        emit2("update:modelValue", v === "" || Number.isNaN(n) ? 0 : n);
      } else {
        emit2("update:modelValue", v);
      }
    }
    return (_ctx, _cache2) => {
      return __props.type === "textarea" ? (openBlock(), createElementBlock("textarea", {
        key: 0,
        class: normalizeClass(["zen-input area", { sm: __props.sm }]),
        rows: __props.rows,
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        value: __props.modelValue,
        onInput
      }, null, 42, _hoisted_1$b)) : (openBlock(), createElementBlock("input", {
        key: 1,
        class: normalizeClass(["zen-input", { sm: __props.sm }]),
        type: __props.type,
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        min: __props.min,
        max: __props.max,
        step: __props.step,
        value: __props.modelValue,
        onInput
      }, null, 42, _hoisted_2$a));
    };
  }
});
const ZenInput = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-262ee20d"]]);
const _hoisted_1$a = ["aria-disabled"];
const _hoisted_2$9 = ["value", "disabled", "onKeydown"];
const _hoisted_3$7 = ["aria-disabled"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "ZenNumber",
  props: {
    modelValue: {},
    min: {},
    max: {},
    step: { default: 0.05 },
    precision: {},
    disabled: { type: Boolean, default: false },
    bare: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit2 = __emit;
    const el = /* @__PURE__ */ ref(null);
    const focused = /* @__PURE__ */ ref(false);
    const text = /* @__PURE__ */ ref("");
    const hover = /* @__PURE__ */ ref(0);
    const prec = computed(() => props.precision ?? (String(props.step).split(".")[1]?.length ?? 0));
    const display = computed(() => (Number.isFinite(props.modelValue) ? props.modelValue : 0).toFixed(prec.value));
    function clamp2(v) {
      if (props.min != null) v = Math.max(props.min, v);
      if (props.max != null) v = Math.min(props.max, v);
      const p2 = Math.pow(10, prec.value);
      return Math.round(v * p2) / p2;
    }
    function set(v) {
      if (Number.isFinite(v)) emit2("update:modelValue", clamp2(v));
    }
    function bump(dir) {
      if (props.disabled) return;
      const v = clamp2((props.modelValue || 0) + dir * props.step);
      set(v);
      if (focused.value) text.value = v.toFixed(prec.value);
    }
    function onFocus() {
      focused.value = true;
      text.value = display.value;
      requestAnimationFrame(() => el.value?.select());
    }
    function onBlur() {
      focused.value = false;
      commit();
    }
    function onInput(e) {
      text.value = e.target.value;
    }
    function commit() {
      const v = parseFloat(text.value);
      if (Number.isFinite(v)) set(v);
    }
    function revert() {
      text.value = display.value;
      el.value?.blur();
    }
    let scrubbing = false, moved = false, startX = 0, startVal = 0;
    function onDown(e) {
      if (props.disabled || focused.value) return;
      scrubbing = true;
      moved = false;
      startX = e.clientX;
      startVal = props.modelValue || 0;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    function onMove(e) {
      if (!scrubbing) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      if (moved) {
        e.preventDefault();
        set(startVal + dx / 4 * props.step);
      }
    }
    function onUp(e) {
      if (!scrubbing) return;
      scrubbing = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
      }
      if (!moved) el.value?.focus();
    }
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["zen-num", { disabled: __props.disabled, bare: __props.bare }]),
        onPointerleave: _cache2[11] || (_cache2[11] = ($event) => hover.value = 0)
      }, [
        !__props.bare ? (openBlock(), createElementBlock("span", {
          key: 0,
          role: "button",
          "aria-label": "Decrease",
          class: normalizeClass(["zn-step", { hot: hover.value === -1 }]),
          tabindex: "-1",
          "aria-disabled": __props.disabled || void 0,
          onPointerenter: _cache2[0] || (_cache2[0] = ($event) => hover.value = -1),
          onPointerleave: _cache2[1] || (_cache2[1] = ($event) => hover.value = 0),
          onPointerdown: _cache2[2] || (_cache2[2] = withModifiers(() => {
          }, ["prevent"])),
          onClick: _cache2[3] || (_cache2[3] = ($event) => bump(-1))
        }, [..._cache2[12] || (_cache2[12] = [
          createBaseVNode("i", {
            class: "mdi mdi-minus",
            "aria-hidden": "true"
          }, null, -1)
        ])], 42, _hoisted_1$a)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "zn-val",
          onPointerdown: onDown,
          onPointermove: onMove,
          onPointerup: onUp
        }, [
          createBaseVNode("input", {
            ref_key: "el",
            ref: el,
            class: normalizeClass(["zn-input", { live: focused.value }]),
            type: "text",
            inputmode: "decimal",
            value: focused.value ? text.value : display.value,
            disabled: __props.disabled,
            onFocus,
            onBlur,
            onInput,
            onKeydown: [
              _cache2[4] || (_cache2[4] = withKeys(withModifiers(($event) => bump(1), ["prevent"]), ["up"])),
              _cache2[5] || (_cache2[5] = withKeys(withModifiers(($event) => bump(-1), ["prevent"]), ["down"])),
              _cache2[6] || (_cache2[6] = withKeys(withModifiers(($event) => el.value?.blur(), ["prevent"]), ["enter"])),
              withKeys(withModifiers(revert, ["prevent"]), ["esc"])
            ]
          }, null, 42, _hoisted_2$9)
        ], 32),
        !__props.bare ? (openBlock(), createElementBlock("span", {
          key: 1,
          role: "button",
          "aria-label": "Increase",
          class: normalizeClass(["zn-step", { hot: hover.value === 1 }]),
          tabindex: "-1",
          "aria-disabled": __props.disabled || void 0,
          onPointerenter: _cache2[7] || (_cache2[7] = ($event) => hover.value = 1),
          onPointerleave: _cache2[8] || (_cache2[8] = ($event) => hover.value = 0),
          onPointerdown: _cache2[9] || (_cache2[9] = withModifiers(() => {
          }, ["prevent"])),
          onClick: _cache2[10] || (_cache2[10] = ($event) => bump(1))
        }, [..._cache2[13] || (_cache2[13] = [
          createBaseVNode("i", {
            class: "mdi mdi-plus",
            "aria-hidden": "true"
          }, null, -1)
        ])], 42, _hoisted_3$7)) : createCommentVNode("", true)
      ], 34);
    };
  }
});
const ZenNumber = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-55261609"]]);
const _hoisted_1$9 = ["disabled"];
const _hoisted_2$8 = { class: "zc-current" };
const _hoisted_3$6 = {
  key: 0,
  class: "zc-search"
};
const _hoisted_4$5 = {
  key: 1,
  class: "zc-search-actions"
};
const _hoisted_5$5 = ["onMouseenter", "onClick"];
const _hoisted_6$4 = { class: "zc-opt-lbl" };
const _hoisted_7$4 = {
  key: 0,
  class: "zc-sep"
};
const _hoisted_8$4 = ["onMouseenter", "onClick"];
const _hoisted_9$4 = { class: "zc-opt-lbl" };
const _hoisted_10$4 = {
  key: 2,
  class: "zc-empty"
};
const _hoisted_11$4 = {
  key: 1,
  class: "zc-footer"
};
const OVERSCAN = 4;
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ZenCombo",
  props: {
    modelValue: {},
    items: {},
    placeholder: { default: "Select…" },
    searchable: { type: Boolean, default: true },
    pinned: {},
    emptyText: { default: "No matches" },
    disabled: { type: Boolean, default: false },
    menuWidth: {},
    itemHeight: {},
    grid: { type: Boolean, default: false },
    gridMin: {}
  },
  emits: ["update:modelValue", "open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit2 = __emit;
    const slots = useSlots();
    const open = /* @__PURE__ */ ref(false);
    const query = /* @__PURE__ */ ref("");
    const active = /* @__PURE__ */ ref(0);
    const scrollTop = /* @__PURE__ */ ref(0);
    const viewportH = /* @__PURE__ */ ref(240);
    const listMaxH = /* @__PURE__ */ ref(240);
    const root = /* @__PURE__ */ ref(null);
    const menuRef = /* @__PURE__ */ ref(null);
    const listRef = /* @__PURE__ */ ref(null);
    const searchRef = /* @__PURE__ */ ref(null);
    const menuStyle = /* @__PURE__ */ ref({});
    const virtual = computed(() => !props.grid && !!props.itemHeight && props.itemHeight > 0);
    const pinnedSet = computed(() => new Set(props.pinned ?? []));
    const current = computed(() => props.items.find((i) => i.value === props.modelValue));
    const labelOf = (i) => i.label ?? String(i.value);
    const filtered = computed(() => {
      const q = query.value.trim().toLowerCase();
      let list = props.items;
      if (q) {
        const terms = q.split(/\s+/);
        list = list.filter((i) => {
          const hay = (labelOf(i) + " " + String(i.value) + " " + (i.keywords ?? "")).toLowerCase();
          return terms.every((t) => hay.includes(t));
        });
      }
      const pin = pinnedSet.value;
      return [...list].sort((a, b) => {
        const pa = pin.has(a.value) ? 0 : 1;
        const pb = pin.has(b.value) ? 0 : 1;
        if (pa !== pb) return pa - pb;
        return labelOf(a).localeCompare(labelOf(b));
      });
    });
    const firstUnpinnedIndex = computed(() => filtered.value.findIndex((i) => !pinnedSet.value.has(i.value)));
    const startIndex = computed(() => {
      if (!virtual.value) return 0;
      return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - OVERSCAN);
    });
    const windowItems = computed(() => {
      if (!virtual.value) return [];
      const count = Math.ceil(viewportH.value / props.itemHeight) + OVERSCAN * 2;
      const end = Math.min(filtered.value.length, startIndex.value + count);
      const out = [];
      for (let i = startIndex.value; i < end; i++) out.push({ item: filtered.value[i], index: i });
      return out;
    });
    function onDoc(e) {
      const t = e.target;
      if (root.value?.contains(t) || menuRef.value?.contains(t)) return;
      close();
    }
    function place() {
      const trig = root.value?.querySelector(".zc-trigger");
      if (!trig) return;
      const r = trig.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const want = props.menuWidth ?? Math.max(r.width, 240);
      const width = Math.round(Math.min(want, vw - 16));
      let left = r.left;
      if (left + width > vw - 8) left = vw - width - 8;
      if (left < 8) left = 8;
      const rows = virtual.value ? filtered.value.length * props.itemHeight : filtered.value.length * 32;
      const estH = Math.min(360, rows + (props.searchable ? 46 : 8) + 8);
      const below = vh - r.bottom;
      const above = r.top;
      const flipUp = below < estH + 8 && above > below;
      const maxHeight = Math.max(160, Math.round((flipUp ? above : below) - 12));
      const reserved = (props.searchable ? 46 : 0) + (slots.footer ? 48 : 0) + 8;
      listMaxH.value = Math.max(120, maxHeight - reserved);
      menuStyle.value = {
        left: left + "px",
        width: width + "px",
        maxHeight: maxHeight + "px",
        ...flipUp ? { bottom: vh - r.top + 4 + "px" } : { top: r.bottom + 4 + "px" }
      };
    }
    function measure() {
      if (listRef.value) viewportH.value = listRef.value.clientHeight;
    }
    function onScroll(e) {
      scrollTop.value = e.target.scrollTop;
    }
    function openMenu() {
      if (props.disabled) return;
      emit2("open");
      query.value = "";
      scrollTop.value = 0;
      active.value = Math.max(0, filtered.value.findIndex((i) => i.value === props.modelValue));
      place();
      open.value = true;
      nextTick(() => {
        searchRef.value?.focus();
        if (listRef.value) listRef.value.scrollTop = 0;
        measure();
        scrollToActive();
        window.addEventListener("pointerdown", onDoc, true);
      });
    }
    function close() {
      if (!open.value) return;
      open.value = false;
      window.removeEventListener("pointerdown", onDoc, true);
    }
    function pick(v) {
      emit2("update:modelValue", v);
      close();
    }
    function scrollToActive() {
      if (virtual.value) {
        const ih = props.itemHeight;
        const top = active.value * ih;
        const el = listRef.value;
        if (!el) return;
        if (top < el.scrollTop) el.scrollTop = top;
        else if (top + ih > el.scrollTop + el.clientHeight) el.scrollTop = top + ih - el.clientHeight;
      } else {
        nextTick(() => {
          const el = menuRef.value?.querySelector(".zc-opt.active");
          el?.scrollIntoView({ block: "nearest" });
        });
      }
    }
    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active.value = Math.min(active.value + 1, filtered.value.length - 1);
        scrollToActive();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active.value = Math.max(active.value - 1, 0);
        scrollToActive();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered.value[active.value];
        if (it) pick(it.value);
      }
    }
    watch(query, () => {
      active.value = 0;
      scrollTop.value = 0;
      if (listRef.value) listRef.value.scrollTop = 0;
    });
    onBeforeUnmount(close);
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: normalizeClass(["zen-combo", { open: open.value, disabled: __props.disabled }])
      }, [
        createBaseVNode("button", {
          type: "button",
          class: "zc-trigger",
          disabled: __props.disabled,
          onClick: _cache2[0] || (_cache2[0] = ($event) => open.value ? close() : openMenu())
        }, [
          createBaseVNode("span", _hoisted_2$8, [
            renderSlot(_ctx.$slots, "selected", { item: current.value }, () => [
              createTextVNode(toDisplayString(current.value ? labelOf(current.value) : __props.placeholder), 1)
            ], true)
          ]),
          _cache2[3] || (_cache2[3] = createBaseVNode("i", { class: "zc-caret mdi mdi-chevron-down" }, null, -1))
        ], 8, _hoisted_1$9),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          open.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "menuRef",
            ref: menuRef,
            class: normalizeClass(["zen-combo-menu", { grid: __props.grid }]),
            style: normalizeStyle([menuStyle.value, __props.grid && __props.gridMin ? { "--zc-grid-min": __props.gridMin + "px" } : {}]),
            onKeydown: onKey
          }, [
            __props.searchable ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
              _cache2[5] || (_cache2[5] = createBaseVNode("i", { class: "mdi mdi-magnify" }, null, -1)),
              withDirectives(createBaseVNode("input", {
                ref_key: "searchRef",
                ref: searchRef,
                "onUpdate:modelValue": _cache2[1] || (_cache2[1] = ($event) => query.value = $event),
                type: "text",
                placeholder: "Search…",
                spellcheck: "false"
              }, null, 512), [
                [vModelText, query.value]
              ]),
              query.value ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "zc-clear",
                title: "Clear",
                onClick: _cache2[2] || (_cache2[2] = ($event) => query.value = "")
              }, [..._cache2[4] || (_cache2[4] = [
                createBaseVNode("i", { class: "mdi mdi-close" }, null, -1)
              ])])) : createCommentVNode("", true),
              _ctx.$slots.search ? (openBlock(), createElementBlock("span", _hoisted_4$5, [
                renderSlot(_ctx.$slots, "search", {}, void 0, true)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              ref_key: "listRef",
              ref: listRef,
              class: "zc-list zen-scroll",
              style: normalizeStyle({ maxHeight: listMaxH.value + "px" }),
              onScroll
            }, [
              virtual.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "zc-virt",
                style: normalizeStyle({ height: filtered.value.length * __props.itemHeight + "px" })
              }, [
                createBaseVNode("div", {
                  class: "zc-win",
                  style: normalizeStyle({ transform: "translateY(" + startIndex.value * __props.itemHeight + "px)" })
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(windowItems.value, (w) => {
                    return openBlock(), createElementBlock("div", {
                      key: String(w.item.value),
                      class: normalizeClass(["zc-opt", { active: w.index === active.value, sel: w.item.value === __props.modelValue, pinned: pinnedSet.value.has(w.item.value) }]),
                      style: normalizeStyle({ height: __props.itemHeight + "px" }),
                      onMouseenter: ($event) => active.value = w.index,
                      onClick: ($event) => pick(w.item.value)
                    }, [
                      renderSlot(_ctx.$slots, "option", {
                        item: w.item,
                        active: w.index === active.value,
                        pinned: pinnedSet.value.has(w.item.value)
                      }, () => [
                        createBaseVNode("span", _hoisted_6$4, toDisplayString(labelOf(w.item)), 1)
                      ], true)
                    ], 46, _hoisted_5$5);
                  }), 128))
                ], 4)
              ], 4)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(filtered.value, (it, i) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: String(it.value)
                }, [
                  !query.value && firstUnpinnedIndex.value > 0 && i === firstUnpinnedIndex.value ? (openBlock(), createElementBlock("div", _hoisted_7$4)) : createCommentVNode("", true),
                  createBaseVNode("div", {
                    class: normalizeClass(["zc-opt", { active: i === active.value, sel: it.value === __props.modelValue, pinned: pinnedSet.value.has(it.value) }]),
                    onMouseenter: ($event) => active.value = i,
                    onClick: ($event) => pick(it.value)
                  }, [
                    renderSlot(_ctx.$slots, "option", {
                      item: it,
                      active: i === active.value,
                      pinned: pinnedSet.value.has(it.value)
                    }, () => [
                      createBaseVNode("span", _hoisted_9$4, toDisplayString(labelOf(it)), 1)
                    ], true)
                  ], 42, _hoisted_8$4)
                ], 64);
              }), 128)),
              !filtered.value.length ? (openBlock(), createElementBlock("div", _hoisted_10$4, toDisplayString(__props.emptyText), 1)) : createCommentVNode("", true)
            ], 36),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_11$4, [
              renderSlot(_ctx.$slots, "footer", { close }, void 0, true)
            ])) : createCommentVNode("", true)
          ], 38)) : createCommentVNode("", true)
        ]))
      ], 2);
    };
  }
});
const ZenCombo = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-cf4f46d5"]]);
const _hoisted_1$8 = ["aria-checked", "disabled"];
const _hoisted_2$7 = { class: "knob" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ZenSwitch",
  props: {
    modelValue: { type: Boolean },
    onIcon: {},
    offIcon: {},
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit2 = __emit;
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass(["zen-switch", { on: __props.modelValue }]),
        role: "switch",
        "aria-checked": __props.modelValue,
        disabled: __props.disabled,
        onClick: _cache2[0] || (_cache2[0] = ($event) => emit2("update:modelValue", !__props.modelValue))
      }, [
        createBaseVNode("span", _hoisted_2$7, [
          __props.onIcon || __props.offIcon ? (openBlock(), createElementBlock("i", {
            key: 0,
            class: normalizeClass(__props.modelValue ? __props.onIcon : __props.offIcon)
          }, null, 2)) : createCommentVNode("", true)
        ])
      ], 10, _hoisted_1$8);
    };
  }
});
const ZenSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-b969721c"]]);
const _hoisted_1$7 = {
  class: "zen-tg",
  role: "tablist"
};
const _hoisted_2$6 = ["title", "aria-selected", "onClick"];
const _hoisted_3$5 = { key: 1 };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ZenToggleGroup",
  props: {
    modelValue: {},
    options: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit2 = __emit;
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (o) => {
          return openBlock(), createElementBlock("button", {
            key: String(o.value),
            class: normalizeClass(["zen-tg-b", { on: o.value === __props.modelValue }]),
            title: o.title || o.label,
            role: "tab",
            "aria-selected": o.value === __props.modelValue,
            onClick: ($event) => emit2("update:modelValue", o.value)
          }, [
            o.icon ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: normalizeClass(o.icon)
            }, null, 2)) : createCommentVNode("", true),
            o.label ? (openBlock(), createElementBlock("span", _hoisted_3$5, toDisplayString(o.label), 1)) : createCommentVNode("", true)
          ], 10, _hoisted_2$6);
        }), 128))
      ]);
    };
  }
});
const ZenToggleGroup = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-b8484c32"]]);
const _hoisted_1$6 = ["min", "max", "step", "value", "disabled"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ZenSlider",
  props: {
    modelValue: {},
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit2 = __emit;
    function onInput(e) {
      const v = Number(e.target.value);
      if (Number.isFinite(v)) emit2("update:modelValue", v);
    }
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("input", {
        class: "zen-slider",
        type: "range",
        min: __props.min,
        max: __props.max,
        step: __props.step,
        value: __props.modelValue,
        disabled: __props.disabled,
        onInput
      }, null, 40, _hoisted_1$6);
    };
  }
});
const ZenSlider = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-10c7ff78"]]);
const MIN_DIMENSION = 64;
const MAX_DIMENSION = 8192;
function clamp(value, lo, hi) {
  return Math.min(hi, Math.max(lo, value));
}
function clampDimension(value, lo = MIN_DIMENSION, hi = MAX_DIMENSION) {
  return clamp(Math.round(value), lo, hi);
}
function snap(value, step) {
  if (!Number.isFinite(step) || step <= 1) return Math.round(value);
  return Math.round(value / step) * step;
}
function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y > 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x || 1;
}
function aspectRatio(width, height) {
  if (!width || !height) return "—";
  const g = gcd(Math.round(width), Math.round(height));
  const aw = Math.round(width / g);
  const ah = Math.round(height / g);
  if (aw <= 32 && ah <= 32) return `${aw}:${ah}`;
  return `${(width / height).toFixed(2)} : 1`;
}
function megapixels(width, height) {
  return width * height / 1e6;
}
function scaleToMegapixels(width, height, targetMp, step = 1) {
  const cur = width * height;
  if (cur <= 0 || targetMp <= 0) return { width, height };
  const factor = Math.sqrt(targetMp * 1e6 / cur);
  return {
    width: clampDimension(snap(width * factor, step)),
    height: clampDimension(snap(height * factor, step))
  };
}
const _hoisted_1$5 = { class: "zen-dims" };
const _hoisted_2$5 = {
  key: 3,
  class: "zd-aspect",
  title: "Aspect ratio"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ZenDimensions",
  props: {
    modelValue: {},
    min: { default: MIN_DIMENSION },
    max: { default: MAX_DIMENSION },
    step: { default: 8 },
    lockAspect: { type: Boolean, default: false },
    showLock: { type: Boolean, default: true },
    showSwap: { type: Boolean, default: false },
    showMp: { type: Boolean, default: false },
    showAspect: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:lockAspect"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit2 = __emit;
    const w = computed(() => clampDimension(props.modelValue?.width ?? 1024, props.min, props.max));
    const h = computed(() => clampDimension(props.modelValue?.height ?? 1024, props.min, props.max));
    const ratio = computed(() => aspectRatio(w.value, h.value));
    const mpNum = computed(() => Number(megapixels(w.value, h.value).toFixed(2)));
    const lockedRatio = /* @__PURE__ */ ref(w.value / Math.max(1, h.value));
    let selfEdit = false;
    function baseline() {
      lockedRatio.value = w.value / Math.max(1, h.value);
    }
    watch(() => [props.modelValue?.width, props.modelValue?.height], () => {
      if (selfEdit) {
        selfEdit = false;
        return;
      }
      baseline();
    });
    watch(() => props.lockAspect, (on) => {
      if (on) baseline();
    });
    function commit(nw, nh, keepRatio) {
      selfEdit = keepRatio;
      emit2("update:modelValue", {
        width: clampDimension(snap(nw, props.step), props.min, props.max),
        height: clampDimension(snap(nh, props.step), props.min, props.max)
      });
    }
    function setW(v) {
      const nw = clampDimension(snap(v, props.step), props.min, props.max);
      commit(nw, props.lockAspect ? nw / (lockedRatio.value || 1) : h.value, props.lockAspect);
    }
    function setH(v) {
      const nh = clampDimension(snap(v, props.step), props.min, props.max);
      commit(props.lockAspect ? nh * (lockedRatio.value || 1) : w.value, nh, props.lockAspect);
    }
    function scaleToMp(target) {
      if (!Number.isFinite(target) || target <= 0) return;
      const r = scaleToMegapixels(w.value, h.value, target, props.step);
      commit(r.width, r.height, true);
    }
    function swap() {
      commit(h.value, w.value, false);
    }
    function toggleLock() {
      emit2("update:lockAspect", !props.lockAspect);
    }
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createVNode(ZenNumber, {
          bare: "",
          class: "zd-n",
          "model-value": w.value,
          min: __props.min,
          max: __props.max,
          step: __props.step,
          precision: 0,
          title: "Width",
          "onUpdate:modelValue": setW
        }, null, 8, ["model-value", "min", "max", "step"]),
        _cache2[1] || (_cache2[1] = createBaseVNode("span", { class: "zd-x" }, "×", -1)),
        createVNode(ZenNumber, {
          bare: "",
          class: "zd-n",
          "model-value": h.value,
          min: __props.min,
          max: __props.max,
          step: __props.step,
          precision: 0,
          title: "Height",
          "onUpdate:modelValue": setH
        }, null, 8, ["model-value", "min", "max", "step"]),
        __props.showLock ? (openBlock(), createBlock(ZenIconButton, {
          key: 0,
          active: __props.lockAspect,
          icon: __props.lockAspect ? "mdi mdi-link-variant" : "mdi mdi-link-variant-off",
          title: "Lock aspect ratio",
          onClick: toggleLock
        }, null, 8, ["active", "icon"])) : createCommentVNode("", true),
        __props.showSwap ? (openBlock(), createBlock(ZenIconButton, {
          key: 1,
          icon: "mdi mdi-swap-horizontal",
          title: "Swap width / height",
          onClick: swap
        })) : createCommentVNode("", true),
        __props.showMp ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createVNode(ZenNumber, {
            bare: "",
            class: "zd-mp",
            "model-value": mpNum.value,
            min: 0.1,
            max: 64,
            step: 0.25,
            precision: 2,
            title: "Megapixels — scales W/H, keeps aspect",
            "onUpdate:modelValue": scaleToMp
          }, null, 8, ["model-value"]),
          _cache2[0] || (_cache2[0] = createBaseVNode("span", { class: "zd-unit" }, "MP", -1))
        ], 64)) : createCommentVNode("", true),
        __props.showAspect ? (openBlock(), createElementBlock("span", _hoisted_2$5, toDisplayString(ratio.value), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
const ZenDimensions = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-f9393177"]]);
const _hoisted_1$4 = { class: "zm-head" };
const _hoisted_2$4 = {
  key: 0,
  class: "zm-title"
};
const _hoisted_3$4 = { class: "zm-head-mid" };
const _hoisted_4$4 = { class: "zm-body zen-scroll" };
const _hoisted_5$4 = {
  key: 0,
  class: "zm-foot"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ZenModal",
  props: {
    open: { type: Boolean },
    title: {},
    width: { default: "720px" },
    height: { default: "70vh" }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit2 = __emit;
    function close() {
      emit2("update:open", false);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    watch(
      () => props.open,
      (o) => {
        if (o) window.addEventListener("keydown", onKey, true);
        else window.removeEventListener("keydown", onKey, true);
      }
    );
    onBeforeUnmount(() => window.removeEventListener("keydown", onKey, true));
    return (_ctx, _cache2) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        __props.open ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "zen-modal-back",
          onPointerdown: withModifiers(close, ["self"])
        }, [
          createBaseVNode("div", {
            class: "zen-modal",
            style: normalizeStyle({ width: __props.width, height: __props.height })
          }, [
            createBaseVNode("div", _hoisted_1$4, [
              __props.title ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_3$4, [
                renderSlot(_ctx.$slots, "header")
              ]),
              createBaseVNode("button", {
                class: "zm-x",
                title: "Close",
                onClick: close
              }, [..._cache2[0] || (_cache2[0] = [
                createBaseVNode("i", { class: "mdi mdi-close" }, null, -1)
              ])])
            ]),
            createBaseVNode("div", _hoisted_4$4, [
              renderSlot(_ctx.$slots, "default")
            ]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
              renderSlot(_ctx.$slots, "footer")
            ])) : createCommentVNode("", true)
          ], 4)
        ], 32)) : createCommentVNode("", true)
      ]);
    };
  }
});
const _cache = /* @__PURE__ */ new Map();
function listImages(type = "input", force = false) {
  if (force || !_cache.has(type)) _cache.set(type, fetchImages(type));
  return _cache.get(type);
}
async function fetchImages(type) {
  try {
    const d = await (await fetch("/nynxz/experimental/images?type=" + type)).json();
    const arr = Array.isArray(d.images) ? d.images : [];
    return arr.map((x) => ({
      name: String(x.name).replace(/\\/g, "/"),
      filename: String(x.filename),
      subfolder: String(x.subfolder ?? ""),
      type: x.type ?? type,
      size: typeof x.size === "number" ? x.size : void 0,
      mtime: typeof x.mtime === "number" ? x.mtime : void 0
    }));
  } catch {
    return [];
  }
}
function thumbUrl(ref2, type = "input") {
  const slash = ref2.lastIndexOf("/");
  const params = new URLSearchParams({
    filename: slash === -1 ? ref2 : ref2.slice(slash + 1),
    subfolder: slash === -1 ? "" : ref2.slice(0, slash),
    type
  });
  return "/view?" + params.toString();
}
async function uploadImage(file) {
  try {
    const body = new FormData();
    body.append("image", file, file.name);
    body.append("type", "input");
    const d = await (await fetch("/upload/image", { method: "POST", body })).json();
    if (!d || !d.name) return null;
    const subfolder = String(d.subfolder ?? "");
    const filename = String(d.name);
    _cache.delete("input");
    return { ref: subfolder ? `${subfolder}/${filename}` : filename, type: "input" };
  } catch {
    return null;
  }
}
function shortName(ref2) {
  return ref2.split("/").pop() || ref2;
}
async function listStages() {
  try {
    const d = await (await fetch("/nynxz/experimental/stages")).json();
    return Array.isArray(d.stages) ? d.stages : [];
  } catch {
    return [];
  }
}
async function saveStage(name, stage, thumb, overwrite = true) {
  try {
    const d = await (await fetch("/nynxz/experimental/stages/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, stage, thumb, overwrite })
    })).json();
    return d?.ok ? String(d.stem) : null;
  } catch {
    return null;
  }
}
async function deleteStage(stem) {
  try {
    const d = await (await fetch("/nynxz/experimental/stages/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stem })
    })).json();
    return !!d?.ok;
  } catch {
    return false;
  }
}
function stageThumbUrl(stem, mtime = 0) {
  return `/nynxz/experimental/stage_thumb?stem=${encodeURIComponent(stem)}&v=${mtime}`;
}
const _hoisted_1$3 = {
  key: 0,
  class: "fg-dropmask"
};
const _hoisted_2$3 = {
  key: 0,
  class: "fg-grid"
};
const _hoisted_3$3 = ["onDragover", "onDrop"];
const _hoisted_4$3 = ["onDragstart"];
const _hoisted_5$3 = ["src", "onError"];
const _hoisted_6$3 = {
  key: 1,
  class: "mdi mdi-image-broken-variant fg-ph warn",
  title: "This file is gone from the folder"
};
const _hoisted_7$3 = ["title"];
const _hoisted_8$3 = { class: "fg-acts" };
const _hoisted_9$3 = ["title", "onClick"];
const _hoisted_10$3 = ["title", "onClick"];
const _hoisted_11$3 = ["onClick"];
const _hoisted_12$3 = {
  key: 2,
  class: "fg-mutemark"
};
const _hoisted_13$3 = { class: "fg-meta" };
const _hoisted_14$3 = ["title"];
const _hoisted_15$3 = { class: "fg-foot" };
const _hoisted_16$3 = {
  key: 1,
  class: "fg-empty"
};
const _hoisted_17$3 = {
  key: 1,
  class: "fg-warn"
};
const _hoisted_18$3 = { class: "fg-bar" };
const _hoisted_19$3 = ["disabled"];
const _hoisted_20$3 = {
  key: 0,
  class: "fg-add-n"
};
const _hoisted_21$3 = { class: "fg-search" };
const _hoisted_22$2 = { class: "fg-bgrid" };
const _hoisted_23$2 = ["onClick"];
const _hoisted_24$2 = { class: "fg-bcard-img" };
const _hoisted_25$2 = ["src"];
const _hoisted_26$2 = {
  key: 0,
  class: "fg-bcard-tick"
};
const _hoisted_27$2 = { class: "fg-bcard-meta" };
const _hoisted_28$2 = ["title"];
const _hoisted_29$2 = { class: "fg-bcard-dir" };
const _hoisted_30$2 = {
  key: 0,
  class: "fg-bgrid-empty"
};
const DEFAULT_FIT = "contain";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FusionGrid",
  props: {
    widget: {},
    node: {}
  },
  setup(__props) {
    const FITS = ["contain", "cover", "stretch"];
    const props = __props;
    const TYPES = ["input", "temp", "output"];
    const SRC_OPTS = [
      { value: "input", label: "Input" },
      { value: "output", label: "Output" },
      { value: "temp", label: "Temp" }
    ];
    const rows = /* @__PURE__ */ ref(parseRows(props.widget?.value));
    const missing = /* @__PURE__ */ ref(/* @__PURE__ */ new Set());
    const busy = /* @__PURE__ */ ref(false);
    const fileInput = /* @__PURE__ */ ref(null);
    const root = /* @__PURE__ */ ref(null);
    const dragOver = /* @__PURE__ */ ref(false);
    const dragIndex = /* @__PURE__ */ ref(-1);
    const dropIndex = /* @__PURE__ */ ref(-1);
    const browse = /* @__PURE__ */ ref(false);
    const images = /* @__PURE__ */ ref([]);
    const srcType = /* @__PURE__ */ ref("input");
    const bq = /* @__PURE__ */ ref("");
    const picked = /* @__PURE__ */ ref(/* @__PURE__ */ new Set());
    let seq = 0;
    function nextId() {
      return `r${Date.now().toString(36)}${(seq++).toString(36)}`;
    }
    function num(v, fallback) {
      const n = +v;
      return Number.isFinite(n) ? n : fallback;
    }
    function parseRows(v) {
      let arr = v;
      if (typeof arr === "string") {
        try {
          arr = JSON.parse(arr || "[]");
        } catch {
          arr = [];
        }
      }
      if (!Array.isArray(arr)) return [];
      return arr.filter((r) => r && typeof r === "object" && r.ref).map((r) => ({
        id: String(r.id ?? nextId()),
        ref: String(r.ref),
        type: TYPES.includes(r.type) ? r.type : "input",
        on: r.on !== false,
        strength: Math.max(0, num(r.strength, 1)),
        fit: FITS.includes(r.fit) ? r.fit : DEFAULT_FIT
      }));
    }
    function commit() {
      if (props.widget) {
        const snapshot = rows.value.map((r) => ({ ...r }));
        props.widget.value = snapshot;
        try {
          props.widget.callback?.(snapshot);
        } catch {
        }
      }
      props.node?.graph?.setDirtyCanvas?.(true, true);
    }
    const enabledCount = computed(() => rows.value.filter((r) => r.on).length);
    const totalStrength = computed(
      () => rows.value.reduce((sum, r) => r.on ? sum + r.strength : sum, 0)
    );
    function share(row) {
      if (!row.on) return 0;
      const total = totalStrength.value;
      return total > 0 ? row.strength / total * 100 : 0;
    }
    function onImgError(row) {
      missing.value = new Set(missing.value).add(row.ref);
    }
    function setStrength(i, v) {
      const row = rows.value[i];
      if (!row) return;
      row.strength = Math.max(0, v);
      commit();
    }
    function toggleOn(i) {
      const r = rows.value[i];
      if (r) {
        r.on = !r.on;
        commit();
      }
    }
    function removeRow(i) {
      rows.value.splice(i, 1);
      commit();
    }
    const FIT_META = {
      contain: { icon: "mdi-fit-to-page-outline", label: "Contain — whole image, letterboxed" },
      cover: { icon: "mdi-crop", label: "Cover — center-crop to fill" },
      stretch: { icon: "mdi-arrow-expand-all", label: "Stretch — distort to fill" }
    };
    function fitCss(fit) {
      return fit === "stretch" ? "fill" : fit;
    }
    function cycleFit(i) {
      const r = rows.value[i];
      if (!r) return;
      r.fit = FITS[(FITS.indexOf(r.fit) + 1) % FITS.length];
      commit();
    }
    function balance() {
      for (const r of rows.value) r.strength = 1;
      commit();
    }
    function clearAll() {
      rows.value = [];
      commit();
    }
    const scrollEl = /* @__PURE__ */ ref(null);
    let prevFocus = null;
    function scroller() {
      return scrollEl.value?.$el ?? null;
    }
    function isTyping(el) {
      const t = el;
      return !!t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT");
    }
    function armScroll() {
      const el = scroller();
      if (!el) return;
      if (el.scrollHeight <= el.clientHeight) return;
      const active = document.activeElement;
      if (el.contains(active)) return;
      if (isTyping(active)) return;
      prevFocus = active;
      el.focus({ preventScroll: true });
    }
    function disarmScroll() {
      const el = scroller();
      if (!el || document.activeElement !== el) return;
      if (prevFocus && prevFocus !== document.body && document.contains(prevFocus))
        prevFocus.focus({ preventScroll: true });
      else el.blur();
      prevFocus = null;
    }
    function triggerUpload() {
      fileInput.value?.click();
    }
    async function onUpload(e) {
      const input = e.target;
      await addFiles([...input.files ?? []]);
      input.value = "";
    }
    function addRef(ref2, type = "input") {
      rows.value.push({ id: nextId(), ref: ref2, type, on: true, strength: 1, fit: DEFAULT_FIT });
    }
    async function addFiles(files) {
      const imgs = files.filter((f) => f.type.startsWith("image/"));
      if (!imgs.length) return;
      busy.value = true;
      try {
        const existing = await listImages("input", true);
        const already = /* @__PURE__ */ new Map();
        for (const it of existing) {
          const key = `${shortName(it.name)} ${it.size ?? ""}`;
          if (!already.has(key) || shortName(it.name) === it.name) already.set(key, it.name);
        }
        for (const file of imgs) {
          const key = `${file.name} ${file.size}`;
          const hit = already.get(key);
          if (hit) {
            addRef(hit, "input");
            continue;
          }
          const up = await uploadImage(file);
          if (up) {
            addRef(up.ref, up.type);
            already.set(key, up.ref);
          } else console.error("[Nynxz] fusion grid upload failed", file.name);
        }
        commit();
      } finally {
        busy.value = false;
      }
    }
    function onDragOver(e) {
      if (dragIndex.value >= 0) return;
      if (!e.dataTransfer?.types?.includes("Files")) return;
      dragOver.value = true;
    }
    function onDragLeave(e) {
      const to = e.relatedTarget;
      if (to && root.value?.contains(to)) return;
      dragOver.value = false;
    }
    async function onDrop(e) {
      dragOver.value = false;
      if (dragIndex.value >= 0) return;
      await addFiles([...e.dataTransfer?.files ?? []]);
    }
    function startReorder(i, e) {
      dragIndex.value = i;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(i));
      }
    }
    function onRowDragOver(i, e) {
      if (dragIndex.value < 0) return;
      e.stopPropagation();
      dropIndex.value = i;
    }
    function onRowDrop(to, e) {
      if (dragIndex.value < 0) return;
      e.preventDefault();
      e.stopPropagation();
      const from = dragIndex.value;
      endReorder();
      if (from === to) return;
      const moved = rows.value.splice(from, 1)[0];
      if (!moved) return;
      rows.value.splice(to, 0, moved);
      commit();
    }
    function endReorder() {
      dragIndex.value = -1;
      dropIndex.value = -1;
    }
    const browseItems = computed(() => {
      const q = bq.value.trim().toLowerCase();
      return images.value.filter((it) => !q || it.name.toLowerCase().includes(q));
    });
    async function ensureImages(force = false) {
      images.value = await listImages(srcType.value, force);
    }
    function openBrowse() {
      picked.value = /* @__PURE__ */ new Set();
      bq.value = "";
      browse.value = true;
      void ensureImages();
    }
    function setSrc(v) {
      srcType.value = v;
      picked.value = /* @__PURE__ */ new Set();
      void ensureImages();
    }
    function togglePick(name) {
      const next = new Set(picked.value);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      picked.value = next;
    }
    function addPicked() {
      for (const it of images.value) if (picked.value.has(it.name)) addRef(it.name, it.type);
      commit();
      browse.value = false;
    }
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: normalizeClass(["fg", { dropping: dragOver.value }]),
        onDragover: withModifiers(onDragOver, ["prevent"]),
        onDragleave: onDragLeave,
        onDrop: withModifiers(onDrop, ["prevent"])
      }, [
        dragOver.value ? (openBlock(), createElementBlock("div", _hoisted_1$3, [..._cache2[3] || (_cache2[3] = [
          createBaseVNode("i", { class: "mdi mdi-tray-arrow-down" }, null, -1),
          createBaseVNode("span", null, "Drop images to add", -1)
        ])])) : createCommentVNode("", true),
        createVNode(unref(ZenScroll), {
          ref_key: "scrollEl",
          ref: scrollEl,
          class: "fg-scroll",
          tabindex: "-1",
          "data-capture-wheel": "true",
          onPointerenter: armScroll,
          onPointerleave: disarmScroll
        }, {
          default: withCtx(() => [
            rows.value.length ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row, i) => {
                return openBlock(), createElementBlock("div", {
                  key: row.id,
                  class: normalizeClass(["fg-card", {
                    off: !row.on,
                    dragging: dragIndex.value === i,
                    over: dropIndex.value === i && dragIndex.value !== i
                  }]),
                  onDragover: withModifiers(($event) => onRowDragOver(i, $event), ["prevent"]),
                  onDrop: ($event) => onRowDrop(i, $event),
                  onDragend: endReorder
                }, [
                  createBaseVNode("div", {
                    class: "fg-thumb",
                    draggable: "true",
                    onDragstart: ($event) => startReorder(i, $event)
                  }, [
                    !missing.value.has(row.ref) ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: unref(thumbUrl)(row.ref, row.type),
                      style: normalizeStyle({ objectFit: fitCss(row.fit) }),
                      loading: "lazy",
                      onError: ($event) => onImgError(row)
                    }, null, 44, _hoisted_5$3)) : (openBlock(), createElementBlock("i", _hoisted_6$3)),
                    createBaseVNode("span", {
                      class: "fg-idx",
                      title: `Source ${i + 1} — drag to reorder`
                    }, toDisplayString(i + 1), 9, _hoisted_7$3),
                    createBaseVNode("div", _hoisted_8$3, [
                      createBaseVNode("button", {
                        class: "fg-act",
                        title: FIT_META[row.fit].label + " (click to change)",
                        onClick: withModifiers(($event) => cycleFit(i), ["stop"])
                      }, [
                        createBaseVNode("i", {
                          class: normalizeClass(["mdi", FIT_META[row.fit].icon])
                        }, null, 2)
                      ], 8, _hoisted_9$3),
                      createBaseVNode("button", {
                        class: "fg-act",
                        title: row.on ? "Mute this image" : "Unmute this image",
                        onClick: withModifiers(($event) => toggleOn(i), ["stop"])
                      }, [
                        createBaseVNode("i", {
                          class: normalizeClass(["mdi", row.on ? "mdi-eye-outline" : "mdi-eye-off-outline"])
                        }, null, 2)
                      ], 8, _hoisted_10$3),
                      createBaseVNode("button", {
                        class: "fg-act danger",
                        title: "Remove",
                        onClick: withModifiers(($event) => removeRow(i), ["stop"])
                      }, [..._cache2[4] || (_cache2[4] = [
                        createBaseVNode("i", { class: "mdi mdi-close" }, null, -1)
                      ])], 8, _hoisted_11$3)
                    ]),
                    !row.on ? (openBlock(), createElementBlock("span", _hoisted_12$3, [..._cache2[5] || (_cache2[5] = [
                      createBaseVNode("i", { class: "mdi mdi-eye-off" }, null, -1)
                    ])])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_13$3, [
                      createBaseVNode("span", {
                        class: "fg-name",
                        title: row.ref
                      }, toDisplayString(unref(shortName)(row.ref)), 9, _hoisted_14$3),
                      createBaseVNode("span", {
                        class: normalizeClass(["fg-pct", { dim: !row.on }])
                      }, toDisplayString(row.on ? Math.round(share(row)) + "%" : "muted"), 3)
                    ]),
                    createBaseVNode("span", {
                      class: "fg-share",
                      style: normalizeStyle({ width: share(row) + "%" })
                    }, null, 4)
                  ], 40, _hoisted_4$3),
                  createBaseVNode("div", _hoisted_15$3, [
                    createVNode(unref(ZenSlider), {
                      class: "fg-slider",
                      "model-value": row.strength,
                      min: 0,
                      max: 2,
                      step: 0.05,
                      disabled: !row.on,
                      "onUpdate:modelValue": ($event) => setStrength(i, $event)
                    }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                    createVNode(unref(ZenNumber), {
                      class: "fg-num",
                      bare: "",
                      "model-value": row.strength,
                      min: 0,
                      max: 10,
                      step: 0.05,
                      disabled: !row.on,
                      "onUpdate:modelValue": ($event) => setStrength(i, $event)
                    }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
                  ])
                ], 42, _hoisted_3$3);
              }), 128))
            ])) : (openBlock(), createElementBlock("div", _hoisted_16$3, [..._cache2[6] || (_cache2[6] = [
              createBaseVNode("i", { class: "mdi mdi-image-multiple-outline" }, null, -1),
              createBaseVNode("span", null, "Drop images here", -1),
              createBaseVNode("small", null, "One is enough — more will blend", -1)
            ])]))
          ]),
          _: 1
        }, 512),
        rows.value.length && !enabledCount.value ? (openBlock(), createElementBlock("div", _hoisted_17$3, [..._cache2[7] || (_cache2[7] = [
          createBaseVNode("i", { class: "mdi mdi-alert-outline" }, null, -1),
          createBaseVNode("span", null, "Every image is muted — fusion needs at least one", -1)
        ])])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_18$3, [
          createBaseVNode("button", {
            class: "fg-add",
            disabled: busy.value,
            onClick: triggerUpload
          }, [
            createBaseVNode("i", {
              class: normalizeClass(["mdi", busy.value ? "mdi-loading mdi-spin" : "mdi-plus"])
            }, null, 2),
            createTextVNode(" " + toDisplayString(busy.value ? "Uploading…" : "Add images") + " ", 1),
            rows.value.length ? (openBlock(), createElementBlock("span", _hoisted_20$3, toDisplayString(rows.value.length), 1)) : createCommentVNode("", true)
          ], 8, _hoisted_19$3),
          createVNode(unref(ZenIconButton), {
            icon: "mdi mdi-view-grid-outline",
            title: "Browse images",
            onClick: openBrowse
          }),
          createVNode(unref(ZenIconButton), {
            icon: "mdi mdi-scale-balance",
            title: "Reset every strength to 1.0",
            disabled: !rows.value.length,
            onClick: balance
          }, null, 8, ["disabled"]),
          rows.value.length ? (openBlock(), createBlock(unref(ZenIconButton), {
            key: 0,
            icon: "mdi mdi-broom",
            danger: "",
            title: "Remove all images",
            onClick: clearAll
          })) : createCommentVNode("", true)
        ]),
        createBaseVNode("input", {
          ref_key: "fileInput",
          ref: fileInput,
          type: "file",
          accept: "image/*",
          multiple: "",
          style: { "display": "none" },
          onChange: onUpload
        }, null, 544),
        createVNode(unref(_sfc_main$5), {
          open: browse.value,
          "onUpdate:open": _cache2[2] || (_cache2[2] = ($event) => browse.value = $event),
          title: `${srcType.value} images`,
          width: "880px",
          height: "78vh"
        }, {
          header: withCtx(() => [
            createBaseVNode("span", _hoisted_21$3, [
              createVNode(unref(ZenInput), {
                modelValue: bq.value,
                "onUpdate:modelValue": _cache2[0] || (_cache2[0] = ($event) => bq.value = $event),
                placeholder: "Search images…",
                sm: ""
              }, null, 8, ["modelValue"])
            ]),
            createVNode(unref(ZenToggleGroup), {
              "model-value": srcType.value,
              options: SRC_OPTS,
              "onUpdate:modelValue": setSrc
            }, null, 8, ["model-value"]),
            createVNode(unref(ZenButton), {
              variant: "ghost",
              sm: "",
              icon: "mdi mdi-upload",
              onClick: triggerUpload
            }, {
              default: withCtx(() => [..._cache2[8] || (_cache2[8] = [
                createTextVNode("Upload", -1)
              ])]),
              _: 1
            })
          ]),
          footer: withCtx(() => [
            createVNode(unref(ZenButton), {
              variant: "ghost",
              sm: "",
              onClick: _cache2[1] || (_cache2[1] = ($event) => browse.value = false)
            }, {
              default: withCtx(() => [..._cache2[10] || (_cache2[10] = [
                createTextVNode("Cancel", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(ZenButton), {
              variant: "primary",
              sm: "",
              disabled: !picked.value.size,
              onClick: addPicked
            }, {
              default: withCtx(() => [
                createTextVNode(" Add " + toDisplayString(picked.value.size || "") + " image" + toDisplayString(picked.value.size === 1 ? "" : "s"), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_22$2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(browseItems.value, (it) => {
                return openBlock(), createElementBlock("button", {
                  key: it.type + ":" + it.name,
                  class: normalizeClass(["fg-bcard", { sel: picked.value.has(it.name) }]),
                  onClick: ($event) => togglePick(it.name)
                }, [
                  createBaseVNode("div", _hoisted_24$2, [
                    createBaseVNode("img", {
                      src: unref(thumbUrl)(it.name, it.type),
                      loading: "lazy"
                    }, null, 8, _hoisted_25$2),
                    picked.value.has(it.name) ? (openBlock(), createElementBlock("span", _hoisted_26$2, [..._cache2[9] || (_cache2[9] = [
                      createBaseVNode("i", { class: "mdi mdi-check" }, null, -1)
                    ])])) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_27$2, [
                    createBaseVNode("span", {
                      class: "fg-bcard-name",
                      title: it.name
                    }, toDisplayString(unref(shortName)(it.name)), 9, _hoisted_28$2),
                    createBaseVNode("span", _hoisted_29$2, toDisplayString(it.subfolder || "—"), 1)
                  ])
                ], 10, _hoisted_23$2);
              }), 128)),
              !browseItems.value.length ? (openBlock(), createElementBlock("p", _hoisted_30$2, "No images in " + toDisplayString(srcType.value) + "/.", 1)) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["open", "title"])
      ], 34);
    };
  }
});
const FusionGrid = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-84e98745"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StudioPopover",
  props: {
    align: { default: "left" },
    up: { type: Boolean, default: false }
  },
  setup(__props) {
    const open = /* @__PURE__ */ ref(false);
    const root = /* @__PURE__ */ ref(null);
    function onDoc(e) {
      if (root.value && !root.value.contains(e.target)) close();
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    function bind() {
      document.addEventListener("pointerdown", onDoc, true);
      document.addEventListener("keydown", onKey);
    }
    function unbind() {
      document.removeEventListener("pointerdown", onDoc, true);
      document.removeEventListener("keydown", onKey);
    }
    function close() {
      open.value = false;
      unbind();
    }
    function toggle() {
      open.value = !open.value;
      if (open.value) bind();
      else unbind();
    }
    onBeforeUnmount(unbind);
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("span", {
        ref_key: "root",
        ref: root,
        class: "sp"
      }, [
        createBaseVNode("span", {
          class: "sp-trigger",
          onClick: toggle
        }, [
          renderSlot(_ctx.$slots, "trigger", { active: open.value }, void 0, true)
        ]),
        open.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["sp-panel", [__props.align, { up: __props.up }]]),
          onPointerdown: _cache2[0] || (_cache2[0] = withModifiers(() => {
          }, ["stop"]))
        }, [
          renderSlot(_ctx.$slots, "default", { close }, void 0, true)
        ], 34)) : createCommentVNode("", true)
      ], 512);
    };
  }
});
const StudioPopover = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-aa95cced"]]);
const _hoisted_1$2 = {
  key: 0,
  class: "fs-dropmask"
};
const _hoisted_2$2 = { class: "fs-pop" };
const _hoisted_3$2 = { class: "fs-achips" };
const _hoisted_4$2 = ["onClick"];
const _hoisted_5$2 = { class: "fs-pop" };
const _hoisted_6$2 = { class: "fs-pop-note" };
const _hoisted_7$2 = { class: "fs-pop-row" };
const _hoisted_8$2 = {
  class: "fs-color",
  title: "Background colour"
};
const _hoisted_9$2 = ["value"];
const _hoisted_10$2 = { class: "fs-main" };
const _hoisted_11$2 = ["src"];
const _hoisted_12$2 = ["data-idx"];
const _hoisted_13$2 = ["src", "data-idx", "onError"];
const _hoisted_14$2 = ["data-idx"];
const _hoisted_15$2 = {
  key: 2,
  class: "mdi mdi-lock fs-locked-badge"
};
const _hoisted_16$2 = {
  key: 3,
  class: "fs-hidden-badge"
};
const _hoisted_17$2 = ["data-idx"];
const _hoisted_18$2 = { class: "fs-selbox-tag" };
const _hoisted_19$2 = ["data-idx", "data-handle"];
const _hoisted_20$2 = {
  key: 3,
  class: "fs-empty"
};
const _hoisted_21$2 = { class: "fs-side-head" };
const _hoisted_22$1 = { class: "fs-side-n" };
const _hoisted_23$1 = { class: "fs-list" };
const _hoisted_24$1 = ["onClick", "onDrop"];
const _hoisted_25$1 = { class: "fs-rowtop" };
const _hoisted_26$1 = ["onDragstart"];
const _hoisted_27$1 = ["src"];
const _hoisted_28$1 = {
  key: 1,
  class: "mdi mdi-image-broken-variant"
};
const _hoisted_29$1 = ["title"];
const _hoisted_30$1 = ["title", "onClick"];
const _hoisted_31$1 = ["title", "onClick"];
const _hoisted_32$1 = ["title", "onClick"];
const _hoisted_33$1 = ["onClick"];
const _hoisted_34$1 = { class: "fs-wnum" };
const _hoisted_35 = {
  key: 0,
  class: "fs-list-empty"
};
const _hoisted_36 = { class: "fs-props-h" };
const _hoisted_37 = ["title"];
const _hoisted_38 = { class: "fs-props-row" };
const _hoisted_39 = ["value"];
const _hoisted_40 = ["value"];
const _hoisted_41 = {
  class: "fs-prop-slider",
  title: "Opacity"
};
const _hoisted_42 = { class: "fs-prop-v" };
const _hoisted_43 = {
  class: "fs-prop-slider",
  title: "Soft edge"
};
const _hoisted_44 = { class: "fs-prop-v" };
const _hoisted_45 = { class: "fs-side-foot" };
const _hoisted_46 = ["disabled"];
const _hoisted_47 = { class: "fs-search" };
const _hoisted_48 = { class: "fs-bgrid" };
const _hoisted_49 = ["onClick"];
const _hoisted_50 = { class: "fs-bcard-img" };
const _hoisted_51 = ["src"];
const _hoisted_52 = {
  key: 0,
  class: "fs-bcard-tick"
};
const _hoisted_53 = { class: "fs-bcard-meta" };
const _hoisted_54 = ["title"];
const _hoisted_55 = {
  key: 0,
  class: "fs-bgrid-empty"
};
const _hoisted_56 = { class: "fs-lib" };
const _hoisted_57 = ["onClick"];
const _hoisted_58 = { class: "fs-libcard-img" };
const _hoisted_59 = ["src"];
const _hoisted_60 = {
  key: 1,
  class: "mdi mdi-layers-outline"
};
const _hoisted_61 = ["onClick"];
const _hoisted_62 = ["title"];
const _hoisted_63 = {
  key: 0,
  class: "fs-lib-empty"
};
const MIN = 0.02;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FusionStage",
  props: {
    widget: {},
    node: {}
  },
  setup(__props) {
    const props = __props;
    const FITS = ["contain", "cover", "stretch"];
    const BLENDS = ["normal", "multiply", "screen", "overlay", "soft_light", "hard_light", "darken", "lighten", "difference", "exclusion", "add", "subtract", "color_dodge", "color_burn"];
    const ASPECTS = [
      { label: "1:1", r: 1 },
      { label: "4:3", r: 4 / 3 },
      { label: "3:4", r: 3 / 4 },
      { label: "3:2", r: 3 / 2 },
      { label: "2:3", r: 2 / 3 },
      { label: "16:9", r: 16 / 9 },
      { label: "9:16", r: 9 / 16 }
    ];
    const FIT_OPTS = [
      { value: "contain", label: "", icon: "mdi mdi-fit-to-page-outline", title: "Contain" },
      { value: "cover", label: "", icon: "mdi mdi-crop", title: "Cover" },
      { value: "stretch", label: "", icon: "mdi mdi-arrow-expand-all", title: "Stretch" }
    ];
    const FUSE_OPTS = [
      { value: "layers", label: "Layers", title: "Each layer = a region-tagged fusion source" },
      { value: "flattened", label: "Flat", title: "The composite as one fusion source" },
      { value: "off", label: "Off", title: "Pass the upstream fusion_input through" }
    ];
    const SRC_OPTS = [
      { value: "input", label: "Input" },
      { value: "output", label: "Output" },
      { value: "temp", label: "Temp" }
    ];
    const TYPES = ["input", "temp", "output"];
    const PALETTE = ["#6366f1", "#ec4899", "#22c55e", "#f59e0b", "#06b6d4", "#a855f7", "#ef4444", "#84cc16"];
    const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
    const clamp2 = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const clamp01 = (v) => clamp2(v, 0, 1);
    function num(v, fallback) {
      const n = +v;
      return Number.isFinite(n) ? n : fallback;
    }
    let seq = 0;
    function nextId() {
      return `l${Date.now().toString(36)}${(seq++).toString(36)}`;
    }
    function normLayer(r, i) {
      const o = r ?? {};
      return {
        id: String(o.id ?? nextId()),
        ref: String(o.ref ?? ""),
        type: TYPES.includes(o.type) ? o.type : "input",
        x: clamp01(num(o.x, 0.1)),
        y: clamp01(num(o.y, 0.1)),
        w: clamp2(num(o.w, 0.4), MIN, 1),
        h: clamp2(num(o.h, 0.4), MIN, 1),
        fit: FITS.includes(o.fit) ? o.fit : "contain",
        opacity: clamp01(num(o.opacity, 1)),
        blend: BLENDS.includes(String(o.blend)) ? String(o.blend) : "normal",
        feather: clamp2(num(o.feather, 0), 0, 0.5),
        flip_h: o.flip_h === true,
        flip_v: o.flip_v === true,
        matte: o.matte !== false,
        on: o.on !== false,
        locked: o.locked === true,
        strength: Math.max(0, num(o.strength, 1)),
        label: String(o.label ?? o.ref ?? `layer ${i + 1}`)
      };
    }
    function parse(v) {
      const o = v ?? {};
      const canvas = o.canvas ?? {};
      const bg = o.background ?? {};
      const arr = Array.isArray(o.layers) ? o.layers : [];
      return {
        canvasW: Math.max(64, Math.min(4096, Math.round(num(canvas.width, 1024)))),
        canvasH: Math.max(64, Math.min(4096, Math.round(num(canvas.height, 1024)))),
        bgRef: String(bg.ref ?? ""),
        bgType: TYPES.includes(bg.type) ? bg.type : "input",
        bgColor: /^#[0-9a-fA-F]{6}$/.test(String(bg.color)) ? String(bg.color) : "#000000",
        layers: arr.map((r, i) => normLayer(r, i)),
        fuseAs: ["layers", "flattened", "off"].includes(o.fuse_as) ? o.fuse_as : "layers"
      };
    }
    const init = parse(props.widget?.value);
    const canvasW = /* @__PURE__ */ ref(init.canvasW);
    const canvasH = /* @__PURE__ */ ref(init.canvasH);
    const bgRef = /* @__PURE__ */ ref(init.bgRef);
    const bgType = /* @__PURE__ */ ref(init.bgType);
    const bgColor = /* @__PURE__ */ ref(init.bgColor);
    const bgMissing = /* @__PURE__ */ ref(false);
    const layers = /* @__PURE__ */ ref(init.layers);
    const fuseAs = /* @__PURE__ */ ref(init.fuseAs);
    const selected = /* @__PURE__ */ ref(init.layers.length ? 0 : -1);
    const wrapEl = /* @__PURE__ */ ref(null);
    const stageEl = /* @__PURE__ */ ref(null);
    const fileInput = /* @__PURE__ */ ref(null);
    const stageW = /* @__PURE__ */ ref(280);
    const stageH = /* @__PURE__ */ ref(280);
    const missing = /* @__PURE__ */ ref(/* @__PURE__ */ new Set());
    const busy = /* @__PURE__ */ ref(false);
    const dragOver = /* @__PURE__ */ ref(false);
    const sel = computed(() => layers.value[selected.value] ?? null);
    const listRows = computed(() => layers.value.map((l, i) => ({ l, i })).reverse());
    const color = (i) => PALETTE[i % PALETTE.length];
    function fitCss(fit2) {
      return fit2 === "stretch" ? "fill" : fit2;
    }
    function layerStyle(_i, l) {
      return {
        left: `${l.x * 100}%`,
        top: `${l.y * 100}%`,
        width: `${l.w * 100}%`,
        height: `${l.h * 100}%`,
        zIndex: _i + 1
      };
    }
    const selboxStyle = computed(() => {
      const l = sel.value;
      if (!l) return {};
      const c = color(selected.value);
      return {
        left: `${l.x * 100}%`,
        top: `${l.y * 100}%`,
        width: `${l.w * 100}%`,
        height: `${l.h * 100}%`,
        borderColor: c,
        color: c
      };
    });
    function snapshot() {
      return {
        version: 1,
        canvas: { width: canvasW.value, height: canvasH.value },
        background: { ref: bgRef.value, type: bgType.value, color: bgColor.value },
        layers: layers.value.map((l) => ({ ...l })),
        fuse_as: fuseAs.value
      };
    }
    function commit() {
      if (props.widget) {
        const snap2 = snapshot();
        props.widget.value = snap2;
        try {
          props.widget.callback?.(snap2);
        } catch {
        }
      }
      props.node?.graph?.setDirtyCanvas?.(true, true);
      scheduleCheckpoint();
    }
    const undoStack = /* @__PURE__ */ ref([]);
    const redoStack = /* @__PURE__ */ ref([]);
    let baseline = "";
    let restoring = false;
    let histTimer;
    const canUndo = computed(() => undoStack.value.length > 0);
    const canRedo = computed(() => redoStack.value.length > 0);
    function snapStr() {
      return JSON.stringify(snapshot());
    }
    function scheduleCheckpoint() {
      if (restoring) return;
      if (histTimer) window.clearTimeout(histTimer);
      histTimer = window.setTimeout(checkpoint, 350);
    }
    function checkpoint() {
      if (histTimer) {
        window.clearTimeout(histTimer);
        histTimer = void 0;
      }
      const s = snapStr();
      if (s === baseline) return;
      undoStack.value = [...undoStack.value, baseline].slice(-60);
      redoStack.value = [];
      baseline = s;
    }
    function restoreFrom(s) {
      restoring = true;
      try {
        const p2 = parse(JSON.parse(s));
        canvasW.value = p2.canvasW;
        canvasH.value = p2.canvasH;
        bgRef.value = p2.bgRef;
        bgType.value = p2.bgType;
        bgColor.value = p2.bgColor;
        bgMissing.value = false;
        missing.value = /* @__PURE__ */ new Set();
        layers.value = p2.layers;
        fuseAs.value = p2.fuseAs;
        if (selected.value >= p2.layers.length) selected.value = p2.layers.length - 1;
        commit();
        fit();
      } finally {
        restoring = false;
      }
    }
    function undo() {
      checkpoint();
      if (!undoStack.value.length) return;
      redoStack.value = [...redoStack.value, baseline];
      baseline = undoStack.value[undoStack.value.length - 1];
      undoStack.value = undoStack.value.slice(0, -1);
      restoreFrom(baseline);
    }
    function redo() {
      if (!redoStack.value.length) return;
      undoStack.value = [...undoStack.value, baseline];
      baseline = redoStack.value[redoStack.value.length - 1];
      redoStack.value = redoStack.value.slice(0, -1);
      restoreFrom(baseline);
    }
    function onImgError(l) {
      missing.value = new Set(missing.value).add(l.ref);
    }
    function writeLayer(i, patch) {
      const next = layers.value.slice();
      if (!next[i]) return;
      next[i] = { ...next[i], ...patch };
      layers.value = next;
      commit();
    }
    function setField(i, key, v) {
      if (key === "fit") writeLayer(i, { fit: FITS.includes(v) ? v : "contain" });
      else if (key === "blend") writeLayer(i, { blend: String(v) });
      else if (key === "opacity" || key === "feather" || key === "strength") writeLayer(i, { [key]: num(v, key === "strength" ? 1 : 0) });
    }
    function toggleOn(i) {
      writeLayer(i, { on: !(layers.value[i]?.on ?? true) });
    }
    function toggleMatte(i) {
      writeLayer(i, { matte: !(layers.value[i]?.matte ?? false) });
    }
    function toggleLock(i) {
      writeLayer(i, { locked: !(layers.value[i]?.locked ?? false) });
    }
    function toggleFlip(i, axis) {
      writeLayer(i, { [axis]: !(layers.value[i]?.[axis] ?? false) });
    }
    function flipTransform(l) {
      return `scaleX(${l.flip_h ? -1 : 1}) scaleY(${l.flip_v ? -1 : 1})`;
    }
    function removeLayer(i) {
      const next = layers.value.slice();
      next.splice(i, 1);
      layers.value = next;
      if (selected.value >= next.length) selected.value = next.length - 1;
      commit();
    }
    function reorder(from, to) {
      if (to < 0 || to >= layers.value.length || from === to) return;
      const next = layers.value.slice();
      const moved = next.splice(from, 1)[0];
      next.splice(to, 0, moved);
      layers.value = next;
      selected.value = to;
      commit();
    }
    const aspectLabel = computed(() => {
      const r = canvasW.value / Math.max(1, canvasH.value);
      return ASPECTS.find((a) => Math.abs(a.r - r) < 0.02)?.label ?? "";
    });
    function setDims(v) {
      canvasW.value = Math.max(64, Math.min(4096, Math.round(num(v.width, canvasW.value))));
      canvasH.value = Math.max(64, Math.min(4096, Math.round(num(v.height, canvasH.value))));
      fit();
      commit();
    }
    function setAspect(r) {
      const area = Math.max(1, canvasW.value * canvasH.value);
      canvasW.value = Math.max(64, Math.min(4096, Math.round(Math.sqrt(area * r) / 8) * 8));
      canvasH.value = Math.max(64, Math.min(4096, Math.round(canvasW.value / r / 8) * 8));
      fit();
      commit();
    }
    function setFuseAs(v) {
      fuseAs.value = ["layers", "flattened", "off"].includes(v) ? v : "layers";
      commit();
    }
    function setColor(v) {
      bgColor.value = /^#[0-9a-fA-F]{6}$/.test(v) ? v : "#000000";
      commit();
    }
    function clearBg() {
      bgRef.value = "";
      bgMissing.value = false;
      commit();
    }
    const rowDrag = /* @__PURE__ */ ref(-1);
    function startRowDrag(i, e) {
      rowDrag.value = i;
      selected.value = i;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(i));
      }
    }
    function onRowDrop(to, e) {
      e.preventDefault();
      const from = rowDrag.value;
      rowDrag.value = -1;
      if (from >= 0 && from !== to) reorder(from, to);
    }
    let dragState = null;
    function stageNorm(e) {
      const rect = stageEl.value?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return { nx: 0, ny: 0 };
      return { nx: clamp2((e.clientX - rect.left) / rect.width, 0, 1), ny: clamp2((e.clientY - rect.top) / rect.height, 0, 1) };
    }
    function onDown(e) {
      e.stopPropagation();
      const el = e.target;
      const idxAttr = el.dataset.idx;
      if (idxAttr == null) {
        selected.value = -1;
        return;
      }
      e.preventDefault();
      const idx = +idxAttr;
      selected.value = idx;
      const l = layers.value[idx];
      if (!l || !l.on || l.locked) return;
      const { nx, ny } = stageNorm(e);
      dragState = { idx, handle: el.dataset.handle ?? null, offX: nx - l.x, offY: ny - l.y };
      try {
        stageEl.value?.setPointerCapture(e.pointerId);
      } catch {
      }
    }
    function onMove(e) {
      if (!dragState) return;
      const { nx, ny } = stageNorm(e);
      const l = layers.value[dragState.idx];
      if (!l) return;
      if (!dragState.handle) {
        writeLayer(dragState.idx, { x: clamp2(nx - dragState.offX, 0, 1 - l.w), y: clamp2(ny - dragState.offY, 0, 1 - l.h) });
        return;
      }
      let { x, y, w, h } = l;
      const hd = dragState.handle;
      if (hd.includes("e")) w = clamp2(nx - x, MIN, 1 - x);
      if (hd.includes("s")) h = clamp2(ny - y, MIN, 1 - y);
      if (hd.includes("w")) {
        const right = x + w;
        x = clamp2(nx, 0, right - MIN);
        w = right - x;
      }
      if (hd.includes("n")) {
        const bottom = y + h;
        y = clamp2(ny, 0, bottom - MIN);
        h = bottom - y;
      }
      writeLayer(dragState.idx, { x, y, w, h });
    }
    function onUp(e) {
      dragState = null;
      if (e) {
        try {
          stageEl.value?.releasePointerCapture(e.pointerId);
        } catch {
        }
      }
    }
    function fit() {
      const wrap = wrapEl.value;
      if (!wrap) return;
      const bw = wrap.clientWidth;
      const bh = wrap.clientHeight;
      if (bw <= 0 || bh <= 0) return;
      const asp = canvasW.value > 0 && canvasH.value > 0 ? canvasW.value / canvasH.value : 1;
      let cw = bw;
      let ch = bw / asp;
      if (ch > bh) {
        ch = bh;
        cw = bh * asp;
      }
      stageW.value = Math.max(1, Math.floor(cw));
      stageH.value = Math.max(1, Math.floor(ch));
    }
    function triggerUpload() {
      fileInput.value?.click();
    }
    async function onUpload(e) {
      const input = e.target;
      await addFiles([...input.files ?? []]);
      input.value = "";
    }
    function defaultBox(i) {
      const off = i % 4 * 0.1;
      return { x: 0.1 + off, y: 0.1 + off, w: 0.4, h: 0.4 };
    }
    function setBg(ref2, type) {
      bgRef.value = ref2;
      bgType.value = type;
      bgMissing.value = false;
    }
    function addRef(ref2, type = "input") {
      const i = layers.value.length;
      const box = defaultBox(i);
      layers.value = [...layers.value, normLayer({ id: nextId(), ref: ref2, type, ...box, matte: true, label: shortName(ref2) }, i)];
      selected.value = layers.value.length - 1;
    }
    async function addFiles(files) {
      const imgs = files.filter((f) => f.type.startsWith("image/"));
      if (!imgs.length) return;
      busy.value = true;
      try {
        const existing = await listImages("input", true);
        const already = /* @__PURE__ */ new Map();
        for (const it of existing) {
          const key = `${shortName(it.name)} ${it.size ?? ""}`;
          if (!already.has(key) || shortName(it.name) === it.name) already.set(key, it.name);
        }
        for (const file of imgs) {
          const key = `${file.name} ${file.size}`;
          const hit = already.get(key);
          if (hit) {
            addRef(hit, "input");
            continue;
          }
          const up = await uploadImage(file);
          if (up) {
            addRef(up.ref, up.type);
            already.set(key, up.ref);
          } else console.error("[Nynxz] fusion stage upload failed", file.name);
        }
        commit();
      } finally {
        busy.value = false;
      }
    }
    function onDragOver(e) {
      if (rowDrag.value >= 0) return;
      if (!e.dataTransfer?.types?.includes("Files")) return;
      dragOver.value = true;
    }
    function onDragLeave(e) {
      const to = e.relatedTarget;
      if (to && e.currentTarget?.contains(to)) return;
      dragOver.value = false;
    }
    async function onDrop(e) {
      dragOver.value = false;
      if (rowDrag.value >= 0) return;
      await addFiles([...e.dataTransfer?.files ?? []]);
    }
    const browse = /* @__PURE__ */ ref(false);
    const bgPick = /* @__PURE__ */ ref(false);
    const images = /* @__PURE__ */ ref([]);
    const srcType = /* @__PURE__ */ ref("input");
    const bq = /* @__PURE__ */ ref("");
    const picked = /* @__PURE__ */ ref(/* @__PURE__ */ new Set());
    const browseItems = computed(() => {
      const q = bq.value.trim().toLowerCase();
      return images.value.filter((it) => !q || it.name.toLowerCase().includes(q));
    });
    async function ensureImages(force = false) {
      images.value = await listImages(srcType.value, force);
    }
    function openBrowse() {
      bgPick.value = false;
      picked.value = /* @__PURE__ */ new Set();
      bq.value = "";
      browse.value = true;
      void ensureImages();
    }
    function openBgBrowse() {
      bgPick.value = true;
      picked.value = /* @__PURE__ */ new Set();
      bq.value = "";
      browse.value = true;
      void ensureImages();
    }
    watch(browse, (open) => {
      if (!open) bgPick.value = false;
    });
    function setSrc(v) {
      srcType.value = v;
      picked.value = /* @__PURE__ */ new Set();
      void ensureImages();
    }
    function onPick(name) {
      if (bgPick.value) {
        const it = images.value.find((x) => x.name === name);
        setBg(name, it?.type ?? srcType.value);
        commit();
        browse.value = false;
        return;
      }
      const next = new Set(picked.value);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      picked.value = next;
    }
    function addPicked() {
      for (const it of images.value) if (picked.value.has(it.name)) addRef(it.name, it.type);
      commit();
      browse.value = false;
    }
    const library = /* @__PURE__ */ ref(false);
    const stages = /* @__PURE__ */ ref([]);
    const saveName = /* @__PURE__ */ ref("");
    const saving = /* @__PURE__ */ ref(false);
    async function refreshStages() {
      stages.value = await listStages();
    }
    function openLibrary() {
      library.value = true;
      saveName.value = "";
      void refreshStages();
    }
    function makeThumb() {
      try {
        const w = 240;
        const h = Math.max(1, Math.round(w * canvasH.value / Math.max(1, canvasW.value)));
        const cv = document.createElement("canvas");
        cv.width = w;
        cv.height = h;
        const ctx = cv.getContext("2d");
        if (!ctx) return void 0;
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, w, h);
        layers.value.forEach((l, i) => {
          const c = color(i);
          const x = l.x * w;
          const y = l.y * h;
          const bw = l.w * w;
          const bh = l.h * h;
          ctx.globalAlpha = l.on ? 0.5 : 0.2;
          ctx.fillStyle = c;
          ctx.fillRect(x, y, bw, bh);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = c;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, bw, bh);
        });
        return cv.toDataURL("image/jpeg", 0.8);
      } catch {
        return void 0;
      }
    }
    async function doSave() {
      const name = saveName.value.trim();
      if (!name || saving.value) return;
      saving.value = true;
      try {
        await saveStage(name, snapshot(), makeThumb());
        saveName.value = "";
        await refreshStages();
      } finally {
        saving.value = false;
      }
    }
    function loadStage(st) {
      const p2 = parse(st.stage);
      canvasW.value = p2.canvasW;
      canvasH.value = p2.canvasH;
      bgRef.value = p2.bgRef;
      bgType.value = p2.bgType;
      bgColor.value = p2.bgColor;
      bgMissing.value = false;
      missing.value = /* @__PURE__ */ new Set();
      layers.value = p2.layers;
      fuseAs.value = p2.fuseAs;
      selected.value = p2.layers.length ? 0 : -1;
      commit();
      fit();
      library.value = false;
    }
    async function delStage(st) {
      await deleteStage(st.stem);
      await refreshStages();
    }
    let ro;
    onMounted(() => {
      baseline = snapStr();
      fit();
      if (wrapEl.value && typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => fit());
        ro.observe(wrapEl.value);
      }
      [0, 80, 300].forEach((t) => window.setTimeout(fit, t));
    });
    onBeforeUnmount(() => {
      onUp();
      ro?.disconnect();
      if (histTimer) window.clearTimeout(histTimer);
    });
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["fs", { dropping: dragOver.value }]),
        onDragover: withModifiers(onDragOver, ["prevent", "stop"]),
        onDragleave: onDragLeave,
        onDrop: withModifiers(onDrop, ["prevent", "stop"])
      }, [
        dragOver.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [..._cache2[20] || (_cache2[20] = [
          createBaseVNode("i", { class: "mdi mdi-tray-arrow-down" }, null, -1),
          createBaseVNode("span", null, "Drop images to add layers", -1)
        ])])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "fs-bar",
          onPointerdown: _cache2[2] || (_cache2[2] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createVNode(unref(ZenIconButton), {
            icon: "mdi mdi-undo",
            disabled: !canUndo.value,
            title: "Undo (Ctrl+Z)",
            onClick: undo
          }, null, 8, ["disabled"]),
          createVNode(unref(ZenIconButton), {
            icon: "mdi mdi-redo",
            disabled: !canRedo.value,
            title: "Redo (Ctrl+Shift+Z)",
            onClick: redo
          }, null, 8, ["disabled"]),
          _cache2[31] || (_cache2[31] = createBaseVNode("span", { class: "fs-div" }, null, -1)),
          createVNode(StudioPopover, { align: "left" }, {
            trigger: withCtx(({ active }) => [
              createBaseVNode("button", {
                class: normalizeClass(["fs-tool", { on: active }]),
                title: "Canvas resolution"
              }, [
                _cache2[21] || (_cache2[21] = createBaseVNode("i", { class: "mdi mdi-aspect-ratio" }, null, -1)),
                createTextVNode(" " + toDisplayString(canvasW.value) + "×" + toDisplayString(canvasH.value) + " ", 1),
                _cache2[22] || (_cache2[22] = createBaseVNode("i", { class: "mdi mdi-chevron-down" }, null, -1))
              ], 2)
            ]),
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$2, [
                _cache2[23] || (_cache2[23] = createBaseVNode("div", { class: "fs-pop-sec" }, "Aspect ratio", -1)),
                createBaseVNode("div", _hoisted_3$2, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(ASPECTS, (a) => {
                    return createBaseVNode("button", {
                      key: a.label,
                      class: normalizeClass(["fs-achip", { on: aspectLabel.value === a.label }]),
                      onClick: ($event) => setAspect(a.r)
                    }, toDisplayString(a.label), 11, _hoisted_4$2);
                  }), 64))
                ]),
                _cache2[24] || (_cache2[24] = createBaseVNode("div", { class: "fs-pop-sec" }, "Size", -1)),
                createVNode(unref(ZenDimensions), {
                  "model-value": { width: canvasW.value, height: canvasH.value },
                  min: 64,
                  max: 4096,
                  step: 8,
                  "show-swap": "",
                  "show-mp": "",
                  "show-aspect": "",
                  "onUpdate:modelValue": setDims
                }, null, 8, ["model-value"])
              ])
            ]),
            _: 1
          }),
          _cache2[32] || (_cache2[32] = createBaseVNode("span", { class: "fs-sp" }, null, -1)),
          createVNode(unref(ZenIconButton), {
            icon: "mdi mdi-bookmark-multiple-outline",
            title: "Preset library",
            onClick: openLibrary
          }),
          createVNode(StudioPopover, { align: "right" }, {
            trigger: withCtx(({ active }) => [
              createBaseVNode("button", {
                class: normalizeClass(["fs-tool fs-tool-icon", { on: active }]),
                title: "Fusion & background settings"
              }, [..._cache2[25] || (_cache2[25] = [
                createBaseVNode("i", { class: "mdi mdi-tune-variant" }, null, -1)
              ])], 2)
            ]),
            default: withCtx(({ close }) => [
              createBaseVNode("div", _hoisted_5$2, [
                _cache2[29] || (_cache2[29] = createBaseVNode("div", { class: "fs-pop-sec" }, "Fuse output", -1)),
                createVNode(unref(ZenToggleGroup), {
                  class: "fs-pop-fuse",
                  "model-value": fuseAs.value,
                  options: FUSE_OPTS,
                  "onUpdate:modelValue": _cache2[0] || (_cache2[0] = ($event) => setFuseAs($event))
                }, null, 8, ["model-value"]),
                createBaseVNode("p", _hoisted_6$2, [
                  fuseAs.value === "layers" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    _cache2[26] || (_cache2[26] = createTextVNode("Each layer becomes a spatial region — needs ", -1)),
                    _cache2[27] || (_cache2[27] = createBaseVNode("b", null, "Region Strength", -1)),
                    _cache2[28] || (_cache2[28] = createTextVNode(" > 0 on the encode node.", -1))
                  ], 64)) : fuseAs.value === "flattened" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode("The flattened composite, as one fusion source.")
                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                    createTextVNode("Passes the upstream fusion input straight through.")
                  ], 64))
                ]),
                _cache2[30] || (_cache2[30] = createBaseVNode("div", { class: "fs-pop-sec" }, "Background", -1)),
                createBaseVNode("div", _hoisted_7$2, [
                  createVNode(unref(ZenButton), {
                    variant: "ghost",
                    sm: "",
                    icon: "mdi mdi-image-outline",
                    onClick: ($event) => {
                      close();
                      openBgBrowse();
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(bgRef.value ? "Change" : "Image"), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createBaseVNode("label", _hoisted_8$2, [
                    createBaseVNode("input", {
                      type: "color",
                      value: bgColor.value,
                      onInput: _cache2[1] || (_cache2[1] = ($event) => setColor($event.target.value))
                    }, null, 40, _hoisted_9$2)
                  ]),
                  bgRef.value ? (openBlock(), createBlock(unref(ZenIconButton), {
                    key: 0,
                    icon: "mdi mdi-image-off-outline",
                    title: "Clear image",
                    onClick: clearBg
                  })) : createCommentVNode("", true)
                ])
              ])
            ]),
            _: 1
          })
        ], 32),
        createBaseVNode("div", _hoisted_10$2, [
          createBaseVNode("div", {
            ref_key: "wrapEl",
            ref: wrapEl,
            class: "fs-stagewrap"
          }, [
            createBaseVNode("div", {
              ref_key: "stageEl",
              ref: stageEl,
              class: "fs-stage",
              style: normalizeStyle({ width: stageW.value + "px", height: stageH.value + "px" }),
              onPointerdown: onDown,
              onPointermove: onMove,
              onPointerup: onUp,
              onPointercancel: onUp
            }, [
              bgRef.value && !bgMissing.value ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: "fs-bg",
                src: unref(thumbUrl)(bgRef.value, bgType.value),
                draggable: "false",
                alt: "background",
                onError: _cache2[3] || (_cache2[3] = ($event) => bgMissing.value = true)
              }, null, 40, _hoisted_11$2)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: "fs-bg fs-bg-color",
                style: normalizeStyle({ background: bgColor.value })
              }, null, 4)),
              _cache2[38] || (_cache2[38] = createBaseVNode("div", { class: "fs-grid" }, null, -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(layers.value, (l, i) => {
                return openBlock(), createElementBlock("div", {
                  key: l.id,
                  class: normalizeClass(["fs-layer", { muted: !l.on, locked: l.locked }]),
                  style: normalizeStyle(layerStyle(i, l)),
                  "data-idx": i
                }, [
                  !missing.value.has(l.ref) ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    class: "fs-layer-img",
                    src: unref(thumbUrl)(l.ref, l.type),
                    style: normalizeStyle({ objectFit: fitCss(l.fit), opacity: l.opacity, transform: flipTransform(l) }),
                    draggable: "false",
                    loading: "lazy",
                    "data-idx": i,
                    onError: ($event) => onImgError(l)
                  }, null, 44, _hoisted_13$2)) : (openBlock(), createElementBlock("i", {
                    key: 1,
                    class: "mdi mdi-image-broken-variant fs-broken",
                    "data-idx": i,
                    title: "File is gone from the folder"
                  }, null, 8, _hoisted_14$2)),
                  l.locked ? (openBlock(), createElementBlock("i", _hoisted_15$2)) : createCommentVNode("", true),
                  !l.on ? (openBlock(), createElementBlock("span", _hoisted_16$2, [..._cache2[33] || (_cache2[33] = [
                    createBaseVNode("i", { class: "mdi mdi-eye-off" }, null, -1),
                    createTextVNode("hidden", -1)
                  ])])) : createCommentVNode("", true)
                ], 14, _hoisted_12$2);
              }), 128)),
              sel.value && sel.value.on && !sel.value.locked ? (openBlock(), createElementBlock("div", {
                key: 2,
                class: "fs-selbox",
                style: normalizeStyle(selboxStyle.value),
                "data-idx": selected.value
              }, [
                createBaseVNode("span", _hoisted_18$2, toDisplayString(sel.value.label), 1),
                (openBlock(), createElementBlock(Fragment, null, renderList(HANDLES, (hd) => {
                  return createBaseVNode("i", {
                    key: hd,
                    class: normalizeClass(["fs-h", "fs-h-" + hd]),
                    "data-idx": selected.value,
                    "data-handle": hd
                  }, null, 10, _hoisted_19$2);
                }), 64))
              ], 12, _hoisted_17$2)) : createCommentVNode("", true),
              !layers.value.length ? (openBlock(), createElementBlock("div", _hoisted_20$2, [
                _cache2[35] || (_cache2[35] = createBaseVNode("i", { class: "mdi mdi-image-plus-outline" }, null, -1)),
                _cache2[36] || (_cache2[36] = createBaseVNode("span", null, "Add images to build a scene", -1)),
                _cache2[37] || (_cache2[37] = createBaseVNode("small", null, "each layer becomes a fusion region", -1)),
                createBaseVNode("button", {
                  class: "fs-empty-add",
                  onClick: triggerUpload
                }, [..._cache2[34] || (_cache2[34] = [
                  createBaseVNode("i", { class: "mdi mdi-plus" }, null, -1),
                  createTextVNode(" Add images", -1)
                ])])
              ])) : createCommentVNode("", true)
            ], 36)
          ], 512),
          createBaseVNode("div", {
            class: "fs-side",
            onPointerdown: _cache2[14] || (_cache2[14] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", _hoisted_21$2, [
              _cache2[39] || (_cache2[39] = createBaseVNode("span", null, "Layers", -1)),
              createBaseVNode("span", _hoisted_22$1, toDisplayString(layers.value.length), 1)
            ]),
            createBaseVNode("div", _hoisted_23$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(listRows.value, (row) => {
                return openBlock(), createElementBlock("div", {
                  key: row.l.id,
                  class: normalizeClass(["fs-row", { sel: selected.value === row.i, dragging: rowDrag.value === row.i, muted: !row.l.on }]),
                  onClick: ($event) => selected.value = row.i,
                  onDragover: _cache2[6] || (_cache2[6] = withModifiers(() => {
                  }, ["prevent"])),
                  onDrop: ($event) => onRowDrop(row.i, $event)
                }, [
                  createBaseVNode("div", _hoisted_25$1, [
                    createBaseVNode("i", {
                      class: "mdi mdi-drag-vertical fs-grip",
                      draggable: "true",
                      title: "Drag to reorder",
                      onDragstart: ($event) => startRowDrag(row.i, $event),
                      onDragend: _cache2[4] || (_cache2[4] = ($event) => rowDrag.value = -1)
                    }, null, 40, _hoisted_26$1),
                    createBaseVNode("span", {
                      class: "fs-rowthumb",
                      style: normalizeStyle({ borderColor: color(row.i) })
                    }, [
                      !missing.value.has(row.l.ref) ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        src: unref(thumbUrl)(row.l.ref, row.l.type),
                        style: normalizeStyle({ transform: flipTransform(row.l) }),
                        loading: "lazy"
                      }, null, 12, _hoisted_27$1)) : (openBlock(), createElementBlock("i", _hoisted_28$1))
                    ], 4),
                    createBaseVNode("span", {
                      class: "fs-rowname",
                      title: row.l.label
                    }, toDisplayString(row.l.label), 9, _hoisted_29$1),
                    createBaseVNode("button", {
                      class: normalizeClass(["fs-ract", { act: row.l.locked }]),
                      title: row.l.locked ? "Locked — click to unlock (click-through on canvas)" : "Lock — makes it click-through on the canvas",
                      onClick: withModifiers(($event) => toggleLock(row.i), ["stop"])
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["mdi", row.l.locked ? "mdi-lock" : "mdi-lock-open-variant-outline"])
                      }, null, 2)
                    ], 10, _hoisted_30$1),
                    createBaseVNode("button", {
                      class: normalizeClass(["fs-ract", { act: row.l.matte }]),
                      title: row.l.matte ? `Cutout on — uses the image's transparency` : "Cutout off — place the full image",
                      onClick: withModifiers(($event) => toggleMatte(row.i), ["stop"])
                    }, [..._cache2[40] || (_cache2[40] = [
                      createBaseVNode("i", { class: "mdi mdi-scissors-cutting" }, null, -1)
                    ])], 10, _hoisted_31$1),
                    createBaseVNode("button", {
                      class: "fs-ract",
                      title: row.l.on ? "Hide layer" : "Show layer",
                      onClick: withModifiers(($event) => toggleOn(row.i), ["stop"])
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["mdi", row.l.on ? "mdi-eye-outline" : "mdi-eye-off-outline"])
                      }, null, 2)
                    ], 8, _hoisted_32$1),
                    createBaseVNode("button", {
                      class: "fs-ract danger",
                      title: "Remove layer",
                      onClick: withModifiers(($event) => removeLayer(row.i), ["stop"])
                    }, [..._cache2[41] || (_cache2[41] = [
                      createBaseVNode("i", { class: "mdi mdi-close" }, null, -1)
                    ])], 8, _hoisted_33$1)
                  ]),
                  createBaseVNode("div", {
                    class: "fs-rowbot",
                    onClick: _cache2[5] || (_cache2[5] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    _cache2[42] || (_cache2[42] = createBaseVNode("i", {
                      class: "mdi mdi-weight fs-wt",
                      title: "Fusion strength"
                    }, null, -1)),
                    createVNode(unref(ZenSlider), {
                      class: "fs-wslider",
                      "model-value": row.l.strength,
                      min: 0,
                      max: 4,
                      step: 0.05,
                      "onUpdate:modelValue": ($event) => setField(row.i, "strength", $event)
                    }, null, 8, ["model-value", "onUpdate:modelValue"]),
                    createBaseVNode("span", _hoisted_34$1, toDisplayString(row.l.strength.toFixed(2)), 1)
                  ])
                ], 42, _hoisted_24$1);
              }), 128)),
              !layers.value.length ? (openBlock(), createElementBlock("p", _hoisted_35, "No layers yet.")) : createCommentVNode("", true)
            ]),
            sel.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fs-props",
              onClick: _cache2[13] || (_cache2[13] = withModifiers(() => {
              }, ["stop"]))
            }, [
              createBaseVNode("div", _hoisted_36, [
                createBaseVNode("span", {
                  class: "fs-dot",
                  style: normalizeStyle({ background: color(selected.value) })
                }, null, 4),
                createBaseVNode("span", {
                  class: "fs-props-name",
                  title: sel.value.label
                }, toDisplayString(sel.value.label), 9, _hoisted_37)
              ]),
              createBaseVNode("div", _hoisted_38, [
                createVNode(unref(ZenToggleGroup), {
                  "model-value": sel.value.fit,
                  options: FIT_OPTS,
                  "onUpdate:modelValue": _cache2[7] || (_cache2[7] = ($event) => setField(selected.value, "fit", $event))
                }, null, 8, ["model-value"]),
                _cache2[45] || (_cache2[45] = createBaseVNode("span", { class: "fs-props-sp" }, null, -1)),
                createBaseVNode("button", {
                  class: normalizeClass(["fs-pbtn", { on: sel.value.flip_h }]),
                  title: "Flip horizontal",
                  onClick: _cache2[8] || (_cache2[8] = ($event) => toggleFlip(selected.value, "flip_h"))
                }, [..._cache2[43] || (_cache2[43] = [
                  createBaseVNode("i", { class: "mdi mdi-flip-horizontal" }, null, -1)
                ])], 2),
                createBaseVNode("button", {
                  class: normalizeClass(["fs-pbtn", { on: sel.value.flip_v }]),
                  title: "Flip vertical",
                  onClick: _cache2[9] || (_cache2[9] = ($event) => toggleFlip(selected.value, "flip_v"))
                }, [..._cache2[44] || (_cache2[44] = [
                  createBaseVNode("i", { class: "mdi mdi-flip-vertical" }, null, -1)
                ])], 2)
              ]),
              createBaseVNode("select", {
                class: "fs-select",
                value: sel.value.blend,
                title: "Blend mode",
                onChange: _cache2[10] || (_cache2[10] = ($event) => setField(selected.value, "blend", $event.target.value))
              }, [
                (openBlock(), createElementBlock(Fragment, null, renderList(BLENDS, (b) => {
                  return createBaseVNode("option", {
                    key: b,
                    value: b
                  }, toDisplayString(b.replace("_", " ")), 9, _hoisted_40);
                }), 64))
              ], 40, _hoisted_39),
              createBaseVNode("label", _hoisted_41, [
                _cache2[46] || (_cache2[46] = createBaseVNode("i", { class: "mdi mdi-opacity" }, null, -1)),
                createVNode(unref(ZenSlider), {
                  class: "fs-pslider",
                  "model-value": sel.value.opacity,
                  min: 0,
                  max: 1,
                  step: 0.02,
                  "onUpdate:modelValue": _cache2[11] || (_cache2[11] = ($event) => setField(selected.value, "opacity", $event))
                }, null, 8, ["model-value"]),
                createBaseVNode("span", _hoisted_42, toDisplayString(Math.round(sel.value.opacity * 100)), 1)
              ]),
              createBaseVNode("label", _hoisted_43, [
                _cache2[47] || (_cache2[47] = createBaseVNode("i", { class: "mdi mdi-blur" }, null, -1)),
                createVNode(unref(ZenSlider), {
                  class: "fs-pslider",
                  "model-value": sel.value.feather,
                  min: 0,
                  max: 0.5,
                  step: 0.01,
                  "onUpdate:modelValue": _cache2[12] || (_cache2[12] = ($event) => setField(selected.value, "feather", $event))
                }, null, 8, ["model-value"]),
                createBaseVNode("span", _hoisted_44, toDisplayString(sel.value.feather.toFixed(2)), 1)
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_45, [
              createBaseVNode("button", {
                class: "fs-add",
                disabled: busy.value,
                onClick: triggerUpload
              }, [
                createBaseVNode("i", {
                  class: normalizeClass(["mdi", busy.value ? "mdi-loading mdi-spin" : "mdi-plus"])
                }, null, 2),
                _cache2[48] || (_cache2[48] = createTextVNode(" Add", -1))
              ], 8, _hoisted_46),
              createVNode(unref(ZenIconButton), {
                icon: "mdi mdi-view-grid-outline",
                title: "Browse images",
                onClick: openBrowse
              })
            ])
          ], 32)
        ]),
        createBaseVNode("input", {
          ref_key: "fileInput",
          ref: fileInput,
          type: "file",
          accept: "image/*",
          multiple: "",
          style: { "display": "none" },
          onChange: onUpload
        }, null, 544),
        createVNode(unref(_sfc_main$5), {
          open: browse.value,
          "onUpdate:open": _cache2[17] || (_cache2[17] = ($event) => browse.value = $event),
          title: bgPick.value ? "Pick background" : "Add layers",
          width: "880px",
          height: "78vh"
        }, {
          header: withCtx(() => [
            createBaseVNode("span", _hoisted_47, [
              createVNode(unref(ZenInput), {
                modelValue: bq.value,
                "onUpdate:modelValue": _cache2[15] || (_cache2[15] = ($event) => bq.value = $event),
                placeholder: "Search images…",
                sm: ""
              }, null, 8, ["modelValue"])
            ]),
            createVNode(unref(ZenToggleGroup), {
              "model-value": srcType.value,
              options: SRC_OPTS,
              "onUpdate:modelValue": setSrc
            }, null, 8, ["model-value"]),
            createVNode(unref(ZenButton), {
              variant: "ghost",
              sm: "",
              icon: "mdi mdi-upload",
              onClick: triggerUpload
            }, {
              default: withCtx(() => [..._cache2[49] || (_cache2[49] = [
                createTextVNode("Upload", -1)
              ])]),
              _: 1
            })
          ]),
          footer: withCtx(() => [
            createVNode(unref(ZenButton), {
              variant: "ghost",
              sm: "",
              onClick: _cache2[16] || (_cache2[16] = ($event) => browse.value = false)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(bgPick.value ? "Cancel" : "Done"), 1)
              ]),
              _: 1
            }),
            !bgPick.value ? (openBlock(), createBlock(unref(ZenButton), {
              key: 0,
              variant: "primary",
              sm: "",
              disabled: !picked.value.size,
              onClick: addPicked
            }, {
              default: withCtx(() => [
                createTextVNode("Add " + toDisplayString(picked.value.size || "") + " layer" + toDisplayString(picked.value.size === 1 ? "" : "s"), 1)
              ]),
              _: 1
            }, 8, ["disabled"])) : createCommentVNode("", true)
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_48, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(browseItems.value, (it) => {
                return openBlock(), createElementBlock("button", {
                  key: it.type + ":" + it.name,
                  class: normalizeClass(["fs-bcard", { sel: picked.value.has(it.name) }]),
                  onClick: ($event) => onPick(it.name)
                }, [
                  createBaseVNode("div", _hoisted_50, [
                    createBaseVNode("img", {
                      src: unref(thumbUrl)(it.name, it.type),
                      loading: "lazy"
                    }, null, 8, _hoisted_51),
                    picked.value.has(it.name) ? (openBlock(), createElementBlock("span", _hoisted_52, [..._cache2[50] || (_cache2[50] = [
                      createBaseVNode("i", { class: "mdi mdi-check" }, null, -1)
                    ])])) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_53, [
                    createBaseVNode("span", {
                      class: "fs-bcard-name",
                      title: it.name
                    }, toDisplayString(unref(shortName)(it.name)), 9, _hoisted_54)
                  ])
                ], 10, _hoisted_49);
              }), 128)),
              !browseItems.value.length ? (openBlock(), createElementBlock("p", _hoisted_55, "No images in " + toDisplayString(srcType.value) + "/.", 1)) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["open", "title"]),
        createVNode(unref(_sfc_main$5), {
          open: library.value,
          "onUpdate:open": _cache2[19] || (_cache2[19] = ($event) => library.value = $event),
          title: "Stage presets",
          width: "760px",
          height: "72vh"
        }, {
          footer: withCtx(() => [
            createVNode(unref(ZenInput), {
              modelValue: saveName.value,
              "onUpdate:modelValue": _cache2[18] || (_cache2[18] = ($event) => saveName.value = $event),
              class: "fs-libsave-name",
              placeholder: "Preset name…",
              sm: "",
              onKeydown: withKeys(doSave, ["enter"])
            }, null, 8, ["modelValue"]),
            createVNode(unref(ZenButton), {
              variant: "primary",
              sm: "",
              disabled: !saveName.value.trim() || saving.value,
              onClick: doSave
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(saving.value ? "Saving…" : "Save current"), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_56, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(stages.value, (st) => {
                return openBlock(), createElementBlock("button", {
                  key: st.stem,
                  class: "fs-libcard",
                  onClick: ($event) => loadStage(st)
                }, [
                  createBaseVNode("div", _hoisted_58, [
                    st.has_thumb ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: unref(stageThumbUrl)(st.stem, st.mtime),
                      loading: "lazy",
                      alt: ""
                    }, null, 8, _hoisted_59)) : (openBlock(), createElementBlock("i", _hoisted_60)),
                    createBaseVNode("button", {
                      class: "fs-libdel",
                      title: "Delete preset",
                      onClick: withModifiers(($event) => delStage(st), ["stop"])
                    }, [..._cache2[51] || (_cache2[51] = [
                      createBaseVNode("i", { class: "mdi mdi-close" }, null, -1)
                    ])], 8, _hoisted_61)
                  ]),
                  createBaseVNode("span", {
                    class: "fs-libcard-name",
                    title: st.name
                  }, toDisplayString(st.name), 9, _hoisted_62)
                ], 8, _hoisted_57);
              }), 128)),
              !stages.value.length ? (openBlock(), createElementBlock("p", _hoisted_63, "No saved presets yet — build a stage and save it below.")) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["open"])
      ], 34);
    };
  }
});
const FusionStage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-018dedc0"]]);
const _hoisted_1$1 = { class: "fi" };
const _hoisted_2$1 = {
  key: 0,
  class: "fi-empty"
};
const _hoisted_3$1 = { class: "fi-main" };
const _hoisted_4$1 = {
  key: 0,
  class: "fi-caption"
};
const _hoisted_5$1 = { class: "fi-side-tabs" };
const _hoisted_6$1 = {
  key: 0,
  class: "fi-settings"
};
const _hoisted_7$1 = { class: "fi-sgroup-h" };
const _hoisted_8$1 = { class: "fi-sk" };
const _hoisted_9$1 = { class: "fi-svv" };
const _hoisted_10$1 = { class: "fi-side-head" };
const _hoisted_11$1 = { class: "fi-bars" };
const _hoisted_12$1 = ["src"];
const _hoisted_13$1 = ["title"];
const _hoisted_14$1 = { class: "fi-btrack" };
const _hoisted_15$1 = { class: "fi-bval" };
const _hoisted_16$1 = { class: "fi-legend" };
const _hoisted_17$1 = ["title", "onClick"];
const _hoisted_18$1 = ["src"];
const _hoisted_19$1 = ["title"];
const _hoisted_20$1 = {
  class: "fi-lstr",
  title: "strength you set on the slider"
};
const _hoisted_21$1 = {
  class: "fi-lmeta",
  title: "this source's share of the grid"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FusionInspector",
  props: {
    widget: {},
    node: {}
  },
  setup(__props) {
    const props = __props;
    const VIEWS = ["dominant", "per-source", "contest", "blend", "isolate"];
    const VIEW_OPTS = [
      { value: "dominant", label: "Dominant", title: "Winner colour per cell, dimmed by how contested it is" },
      { value: "per-source", label: "Per-source", title: "One small panel per source — that source’s weight as a ramp, nothing mixed" },
      { value: "contest", label: "Contest", title: "Where the blend is contested — the ONLY cells where strength / feather / blend have any effect (bright = contested, dark = one source owns it)" },
      { value: "blend", label: "Blend", title: "Weighted average of all source colours" },
      { value: "isolate", label: "Isolate", title: "One source’s weight as a ramp (pick it in the legend)" }
    ];
    function parse(v) {
      const o = v;
      if (!o || typeof o !== "object" || !Array.isArray(o.weights) || !o.num_sources) return null;
      const g = Array.isArray(o.grid) ? o.grid : [0, 0];
      return {
        grid: [Number(g[0]) || 0, Number(g[1]) || 0],
        num_sources: Number(o.num_sources) || 0,
        sources: Array.isArray(o.sources) ? o.sources : [],
        weights: o.weights,
        settings: o.settings && typeof o.settings === "object" ? o.settings : {},
        has_regions: !!o.has_regions
      };
    }
    const payload = /* @__PURE__ */ ref(parse(props.widget?.value));
    const view = /* @__PURE__ */ ref("dominant");
    const sideTab = /* @__PURE__ */ ref("legend");
    const selected = /* @__PURE__ */ ref(0);
    const hovered = /* @__PURE__ */ ref(-1);
    const wrapEl = /* @__PURE__ */ ref(null);
    const canvasEl = /* @__PURE__ */ ref(null);
    const cssW = /* @__PURE__ */ ref(0);
    const cssH = /* @__PURE__ */ ref(0);
    const gridH = computed(() => payload.value?.grid[0] ?? 0);
    const gridW = computed(() => payload.value?.grid[1] ?? 0);
    const cellRow = computed(() => gridW.value ? Math.floor(hovered.value / gridW.value) : 0);
    const cellCol = computed(() => gridW.value ? hovered.value % gridW.value : 0);
    function setView(v) {
      view.value = VIEWS.includes(v) ? v : "dominant";
      if (view.value === "per-source") hovered.value = -1;
    }
    function isolate(i) {
      selected.value = i;
      view.value = "isolate";
      sideTab.value = "legend";
    }
    const settingGroups = computed(() => {
      const p2 = payload.value;
      if (!p2) return [];
      const s = p2.settings;
      const num = (k, d = 0) => Number.isFinite(Number(s[k])) ? Number(s[k]) : d;
      const str = (k, d = "") => s[k] == null ? d : String(s[k]);
      const method = str("fusion_method", "spatial-checkerboard");
      const cMode = str("content_mode", "none");
      const yMode = str("style_mode", "none");
      const f2 = (k) => num(k).toFixed(2);
      return [
        { title: "Pattern", rows: [
          { k: "method", v: method.replace("spatial-", "") },
          { k: "block", v: String(num("block_size")), dim: method !== "spatial-block-interleave" },
          { k: "dither", v: f2("dither_ratio"), dim: method !== "spatial-dither-random" },
          { k: "jitter", v: f2("pattern_jitter"), dim: num("pattern_jitter") <= 0 }
        ] },
        { title: "Blend", rows: [
          { k: "blend", v: f2("blend_strength"), dim: num("blend_strength") <= 0 },
          { k: "feather", v: f2("feather"), dim: num("feather") <= 0 },
          { k: "norm", v: s.preserve_norm ? "on" : "off", dim: !s.preserve_norm }
        ] },
        { title: "Content", rows: [
          { k: "mode", v: cMode, dim: cMode === "none" },
          { k: "strength", v: f2("content_strength"), dim: cMode === "none" || num("content_strength") <= 0 }
        ] },
        { title: "Style", rows: [
          { k: "mode", v: yMode, dim: yMode === "none" },
          { k: "strength", v: f2("style_strength"), dim: yMode === "none" || num("style_strength") <= 0 }
        ] },
        { title: "Regions", rows: [
          { k: "strength", v: f2("region_strength"), dim: num("region_strength") <= 0 },
          { k: "in input", v: p2.has_regions ? "yes" : "no", dim: !p2.has_regions }
        ] },
        { title: "Variation", rows: [
          { k: "seed", v: String(num("seed")) },
          { k: "roll", v: f2("strength_roll"), dim: num("strength_roll") <= 0 }
        ] },
        { title: "Grid", rows: [
          { k: "size", v: String(num("visual_size")) },
          { k: "aspect", v: str("visual_aspect", "auto") },
          { k: "tokens", v: `${p2.grid[1]}×${p2.grid[0]}` },
          { k: "sources", v: String(p2.num_sources) }
        ] }
      ];
    });
    const cellBreakdown = computed(() => {
      const p2 = payload.value;
      if (!p2 || hovered.value < 0) return [];
      const rows = p2.sources.map((s, i) => ({
        i,
        label: s.label,
        color: s.color,
        thumb: s.thumb,
        w: p2.weights[i]?.[hovered.value] ?? 0
      }));
      const max = Math.max(1e-6, ...rows.map((r) => r.w));
      return rows.map((r) => ({ ...r, pct: r.w / max * 100 })).sort((a, b) => b.w - a.w);
    });
    function hexRgb(hex) {
      const s = hex.replace("#", "");
      return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
    }
    let srcRgb = [];
    function colorAt(token) {
      const p2 = payload.value;
      const n = p2.num_sources;
      if (view.value === "isolate") {
        const amt = Math.min(1, Math.max(0, p2.weights[selected.value]?.[token] ?? 0));
        const c2 = srcRgb[selected.value] ?? [0, 0, 0];
        return [c2[0] * amt, c2[1] * amt, c2[2] * amt];
      }
      if (view.value === "blend") {
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < n; i++) {
          const w = p2.weights[i]?.[token] ?? 0;
          const c2 = srcRgb[i];
          r += w * c2[0];
          g += w * c2[1];
          b += w * c2[2];
        }
        return [r, g, b];
      }
      if (view.value === "contest") {
        let max = 0;
        for (let i = 0; i < n; i++) {
          const w = p2.weights[i]?.[token] ?? 0;
          if (w > max) max = w;
        }
        const t = Math.pow(Math.min(1, Math.max(0, 1 - max)), 0.65);
        return [20 + (251 - 20) * t, 20 + (191 - 20) * t, 24 + (36 - 24) * t];
      }
      let owner = 0, share = 0;
      for (let i = 0; i < n; i++) {
        const w = p2.weights[i]?.[token] ?? 0;
        if (w > share) {
          share = w;
          owner = i;
        }
      }
      const conf = 0.22 + 0.78 * Math.min(1, Math.max(0, share));
      const c = srcRgb[owner] ?? [0, 0, 0];
      return [c[0] * conf, c[1] * conf, c[2] * conf];
    }
    function fit() {
      const wrap = wrapEl.value;
      const p2 = payload.value;
      if (!wrap || !p2 || !gridW.value || !gridH.value) return;
      const availW = wrap.clientWidth;
      const availH = wrap.clientHeight;
      if (availW <= 0 || availH <= 0) return;
      if (view.value === "per-source") {
        cssW.value = availW;
        cssH.value = availH;
        return;
      }
      const cell = Math.max(3, Math.floor(Math.min(availW / gridW.value, availH / gridH.value)));
      cssW.value = cell * gridW.value;
      cssH.value = cell * gridH.value;
    }
    function draw() {
      const p2 = payload.value;
      const canvas = canvasEl.value;
      if (!p2 || !canvas || !cssW.value || !cssH.value) return;
      srcRgb = p2.sources.map((s) => hexRgb(s.color));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW.value * dpr);
      canvas.height = Math.round(cssH.value * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW.value, cssH.value);
      if (view.value === "per-source") {
        drawPanels(ctx);
        return;
      }
      const w = gridW.value;
      const h = gridH.value;
      const cw = cssW.value / w;
      const ch = cssH.value / h;
      for (let row = 0; row < h; row++) {
        for (let col = 0; col < w; col++) {
          const [r, g, b] = colorAt(row * w + col);
          ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
          ctx.fillRect(col * cw, row * ch, Math.ceil(cw), Math.ceil(ch));
        }
      }
      if (cw >= 10) {
        ctx.strokeStyle = "rgba(0,0,0,0.55)";
        ctx.lineWidth = 1;
        for (let gx = 1; gx < w; gx++) {
          ctx.beginPath();
          ctx.moveTo(gx * cw, 0);
          ctx.lineTo(gx * cw, cssH.value);
          ctx.stroke();
        }
        for (let gy = 1; gy < h; gy++) {
          ctx.beginPath();
          ctx.moveTo(0, gy * ch);
          ctx.lineTo(cssW.value, gy * ch);
          ctx.stroke();
        }
      }
      if (hovered.value >= 0) {
        const col = hovered.value % w;
        const row = Math.floor(hovered.value / w);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.strokeRect(col * cw + 1, row * ch + 1, cw - 2, ch - 2);
      }
    }
    function trunc(label, widthPx) {
      const max = Math.max(2, Math.floor(widthPx / 6));
      return label.length > max ? label.slice(0, max - 1) + "…" : label;
    }
    function panelLayout(n, availW, availH, aspect, pad, titleH) {
      let best = { cols: Math.max(1, Math.ceil(Math.sqrt(n))), rows: Math.ceil(n / Math.max(1, Math.ceil(Math.sqrt(n)))), area: -1 };
      for (let cols = 1; cols <= n; cols++) {
        const rows = Math.ceil(n / cols);
        const cellW = (availW - pad * (cols + 1)) / cols;
        const areaH = (availH - pad * (rows + 1)) / rows - titleH;
        if (cellW <= 0 || areaH <= 0) continue;
        let dw = cellW;
        let dh = dw / aspect;
        if (dh > areaH) {
          dh = areaH;
          dw = dh * aspect;
        }
        const area = dw * dh;
        if (area > best.area) best = { cols, rows, area };
      }
      return best;
    }
    function drawPanels(ctx) {
      const p2 = payload.value;
      if (!p2) return;
      const n = p2.num_sources;
      const w = gridW.value;
      const h = gridH.value;
      const aspect = w / h;
      const pad = 6;
      const titleH = 13;
      const { cols, rows } = panelLayout(n, cssW.value, cssH.value, aspect, pad, titleH);
      const cellW = (cssW.value - pad * (cols + 1)) / cols;
      const cellH = (cssH.value - pad * (rows + 1)) / rows;
      const areaH = Math.max(1, cellH - titleH);
      ctx.font = "600 10px sans-serif";
      ctx.textBaseline = "alphabetic";
      for (let s = 0; s < n; s++) {
        const cx = pad + s % cols * (cellW + pad);
        const cy = pad + Math.floor(s / cols) * (cellH + pad);
        let dw = cellW;
        let dh = dw / aspect;
        if (dh > areaH) {
          dh = areaH;
          dw = dh * aspect;
        }
        const dx = cx + (cellW - dw) / 2;
        const dy = cy + titleH;
        ctx.fillStyle = p2.sources[s]?.color ?? "#888";
        ctx.fillText(trunc(p2.sources[s]?.label ?? `src ${s + 1}`, dw), dx + 1, cy + 10);
        const cw = dw / w;
        const ch = dh / h;
        const c = srcRgb[s] ?? [0, 0, 0];
        for (let row = 0; row < h; row++) {
          for (let col = 0; col < w; col++) {
            const amt = Math.min(1, Math.max(0, p2.weights[s]?.[row * w + col] ?? 0));
            ctx.fillStyle = `rgb(${Math.round(c[0] * amt)},${Math.round(c[1] * amt)},${Math.round(c[2] * amt)})`;
            ctx.fillRect(dx + col * cw, dy + row * ch, Math.ceil(cw), Math.ceil(ch));
          }
        }
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.lineWidth = 1;
        ctx.strokeRect(dx + 0.5, dy + 0.5, dw - 1, dh - 1);
      }
    }
    function onHover(e) {
      const canvas = canvasEl.value;
      const p2 = payload.value;
      if (!canvas || !p2 || view.value === "per-source") return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const col = Math.min(gridW.value - 1, Math.max(0, Math.floor((e.clientX - rect.left) / rect.width * gridW.value)));
      const row = Math.min(gridH.value - 1, Math.max(0, Math.floor((e.clientY - rect.top) / rect.height * gridH.value)));
      hovered.value = row * gridW.value + col;
    }
    function apply2(v) {
      const p2 = Array.isArray(v) ? v[0] : v;
      payload.value = parse(p2);
      if (selected.value >= (payload.value?.num_sources ?? 0)) selected.value = 0;
    }
    let ro;
    let onExec;
    onMounted(() => {
      if (props.widget) {
        props.widget.callback = (v) => apply2(v);
      }
      try {
        onExec = (e) => {
          const d = e?.detail;
          if (!d || String(d.node) !== String(props.node?.id)) return;
          if (d.output && "fusion_inspect" in d.output) apply2(d.output.fusion_inspect);
        };
        api.addEventListener("executed", onExec);
      } catch {
      }
      fit();
      draw();
      if (wrapEl.value && typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => {
          fit();
          draw();
        });
        ro.observe(wrapEl.value);
      }
      [0, 80, 300].forEach((t) => window.setTimeout(() => {
        fit();
        draw();
      }, t));
    });
    watch([payload, view, selected, hovered], () => {
      fit();
      draw();
    });
    onBeforeUnmount(() => {
      ro?.disconnect();
      if (onExec) {
        try {
          api.removeEventListener("executed", onExec);
        } catch {
        }
      }
    });
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        !payload.value || !payload.value.num_sources ? (openBlock(), createElementBlock("div", _hoisted_2$1, [..._cache2[7] || (_cache2[7] = [
          createBaseVNode("i", { class: "mdi mdi-chart-scatter-plot" }, null, -1),
          createBaseVNode("span", null, "Run the fusion to inspect it", -1),
          createBaseVNode("small", null, [
            createTextVNode("wire the encode node's "),
            createBaseVNode("b", null, "fusion_inspect"),
            createTextVNode(" output here, then queue")
          ], -1)
        ])])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", {
            class: "fi-bar",
            onPointerdown: _cache2[1] || (_cache2[1] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createVNode(unref(ZenToggleGroup), {
              "model-value": view.value,
              options: VIEW_OPTS,
              "onUpdate:modelValue": _cache2[0] || (_cache2[0] = ($event) => setView($event))
            }, null, 8, ["model-value"])
          ], 32),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", {
              ref_key: "wrapEl",
              ref: wrapEl,
              class: "fi-gridwrap"
            }, [
              createBaseVNode("canvas", {
                ref_key: "canvasEl",
                ref: canvasEl,
                class: "fi-canvas",
                style: normalizeStyle({ width: cssW.value + "px", height: cssH.value + "px" }),
                onPointermove: onHover,
                onPointerleave: _cache2[2] || (_cache2[2] = ($event) => hovered.value = -1),
                onPointerdown: _cache2[3] || (_cache2[3] = withModifiers(() => {
                }, ["stop"]))
              }, null, 36),
              view.value === "contest" ? (openBlock(), createElementBlock("div", _hoisted_4$1, "bright = contested (strength · feather · blend act here) · dark = one source owns it")) : createCommentVNode("", true)
            ], 512),
            createBaseVNode("div", {
              class: "fi-side",
              onPointerdown: _cache2[6] || (_cache2[6] = withModifiers(() => {
              }, ["stop"]))
            }, [
              createBaseVNode("div", _hoisted_5$1, [
                createBaseVNode("button", {
                  class: normalizeClass(["fi-tab", { on: sideTab.value === "legend" }]),
                  onClick: _cache2[4] || (_cache2[4] = ($event) => sideTab.value = "legend")
                }, "Sources", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["fi-tab", { on: sideTab.value === "settings" }]),
                  onClick: _cache2[5] || (_cache2[5] = ($event) => sideTab.value = "settings")
                }, "Settings", 2)
              ]),
              sideTab.value === "settings" ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(settingGroups.value, (g) => {
                  return openBlock(), createElementBlock("div", {
                    key: g.title,
                    class: "fi-sgroup"
                  }, [
                    createBaseVNode("div", _hoisted_7$1, toDisplayString(g.title), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(g.rows, (r) => {
                      return openBlock(), createElementBlock("div", {
                        key: r.k,
                        class: normalizeClass(["fi-srow", { dim: r.dim }])
                      }, [
                        createBaseVNode("span", _hoisted_8$1, toDisplayString(r.k), 1),
                        createBaseVNode("span", _hoisted_9$1, toDisplayString(r.v), 1)
                      ], 2);
                    }), 128))
                  ]);
                }), 128))
              ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                hovered.value >= 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("div", _hoisted_10$1, "Cell " + toDisplayString(cellRow.value) + "," + toDisplayString(cellCol.value), 1),
                  createBaseVNode("div", _hoisted_11$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(cellBreakdown.value, (r) => {
                      return openBlock(), createElementBlock("div", {
                        key: r.i,
                        class: "fi-brow"
                      }, [
                        createBaseVNode("span", {
                          class: "fi-thumb sm",
                          style: normalizeStyle({ borderColor: r.color })
                        }, [
                          r.thumb ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: r.thumb,
                            alt: ""
                          }, null, 8, _hoisted_12$1)) : (openBlock(), createElementBlock("span", {
                            key: 1,
                            class: "fi-thumb-fill",
                            style: normalizeStyle({ background: r.color })
                          }, null, 4))
                        ], 4),
                        createBaseVNode("span", {
                          class: "fi-blabel",
                          title: r.label
                        }, toDisplayString(r.label), 9, _hoisted_13$1),
                        createBaseVNode("span", _hoisted_14$1, [
                          createBaseVNode("span", {
                            class: "fi-bfill",
                            style: normalizeStyle({ width: r.pct + "%", background: r.color })
                          }, null, 4)
                        ]),
                        createBaseVNode("span", _hoisted_15$1, toDisplayString(r.w.toFixed(2)), 1)
                      ]);
                    }), 128))
                  ])
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_16$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(payload.value.sources, (s, i) => {
                      return openBlock(), createElementBlock("button", {
                        key: i,
                        class: normalizeClass(["fi-lrow", { on: view.value === "isolate" && selected.value === i }]),
                        title: `Isolate ${s.label}`,
                        onClick: ($event) => isolate(i)
                      }, [
                        createBaseVNode("span", {
                          class: "fi-thumb",
                          style: normalizeStyle({ borderColor: s.color })
                        }, [
                          s.thumb ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: s.thumb,
                            alt: ""
                          }, null, 8, _hoisted_18$1)) : (openBlock(), createElementBlock("span", {
                            key: 1,
                            class: "fi-thumb-fill",
                            style: normalizeStyle({ background: s.color })
                          }, null, 4))
                        ], 4),
                        createBaseVNode("span", {
                          class: "fi-blabel",
                          title: s.label
                        }, toDisplayString(s.label), 9, _hoisted_19$1),
                        createBaseVNode("span", _hoisted_20$1, "×" + toDisplayString(s.strength.toFixed(1)), 1),
                        createBaseVNode("span", _hoisted_21$1, toDisplayString(Math.round(s.share * 100)) + "%", 1)
                      ], 10, _hoisted_17$1);
                    }), 128))
                  ]),
                  _cache2[8] || (_cache2[8] = createBaseVNode("p", { class: "fi-lhint" }, [
                    createBaseVNode("b", null, "×"),
                    createTextVNode(" strength you set · "),
                    createBaseVNode("b", null, "%"),
                    createTextVNode(" its share of the grid")
                  ], -1))
                ], 64))
              ], 64))
            ], 32)
          ])
        ], 64))
      ]);
    };
  }
});
const FusionInspector = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9dce09b3"]]);
const fusionInputNode = defineNode({
  is: "nynxz.experimental.FusionInput",
  minSize: [340, 340],
  widgets: [
    // fill: the body is the node's — the image grid scrolls inside it and the toolbar stays
    // pinned to the bottom, so resizing the node shows more images rather than more padding.
    {
      name: "grid",
      type: "NYNXZ_FUSION_GRID",
      component: FusionGrid,
      minHeight: 200,
      fill: true,
      default: []
    }
  ],
  // Middle-click the fusion_input output → spawn + wire the encoder. Lights up with ZenKit
  // installed, no-op otherwise.
  slotLinks: [{ output: "fusion_input", spawn: "nynxz.experimental.QwenFusionEncode" }]
});
const fusionImagesNode = defineNode({
  is: "nynxz.experimental.FusionImages",
  slotLinks: [{ output: "fusion_input", spawn: "nynxz.experimental.QwenFusionEncode" }]
});
const fusionStudioNode = defineNode({
  is: "nynxz.experimental.FusionStudio",
  minSize: [660, 520],
  widgets: [
    {
      name: "stage",
      type: "NYNXZ_FUSION_STAGE",
      component: FusionStage,
      minHeight: 320,
      fill: true,
      default: {}
    }
  ],
  slotLinks: [{ output: "fusion_input", spawn: "nynxz.experimental.QwenFusionEncode" }]
});
const fusionInspectorNode = defineNode({
  is: "nynxz.experimental.FusionInspector",
  minSize: [460, 380],
  hideOutputImages: true,
  widgets: [
    {
      name: "inspector",
      type: "NYNXZ_INSPECTOR",
      component: FusionInspector,
      minHeight: 260,
      fill: true,
      serialize: false,
      default: {}
    }
  ],
  // On execute, map the node's ui `fusion_inspect` payload into the inspector widget → re-render.
  // ComfyUI wraps every ui value in a list, so unwrap [0] back to the payload dict.
  output: {
    widget: "inspector",
    from: (o) => Array.isArray(o.fusion_inspect) ? o.fusion_inspect[0] : o.fusion_inspect
  }
});
const qwenFusionEncodeNode = defineNode({
  is: "nynxz.experimental.QwenFusionEncode",
  slotLinks: [{ output: "fusion_inspect", spawn: "nynxz.experimental.FusionInspector" }]
});
const fusionNodes = [fusionInputNode, fusionImagesNode, fusionStudioNode, fusionInspectorNode, qwenFusionEncodeNode];
let _lorasCache = null;
function listLoras(force = false) {
  if (force || !_lorasCache) _lorasCache = fetchLoras();
  return _lorasCache;
}
async function fetchLoras() {
  try {
    const d = await (await fetch("/nynxz/experimental/loras")).json();
    const arr = Array.isArray(d.loras) ? d.loras : [];
    return arr.map((l) => ({
      name: String(l.name).replace(/\\/g, "/"),
      has_preview: !!l.has_preview,
      favorite: !!l.favorite
    }));
  } catch {
    return [];
  }
}
function previewUrl(name) {
  return "/nynxz/experimental/lora/preview?name=" + encodeURIComponent(name);
}
let _favCache = null;
function getFavorites(force = false) {
  if (force || !_favCache) _favCache = fetchFavorites();
  return _favCache;
}
async function fetchFavorites() {
  try {
    const d = await (await fetch("/nynxz/experimental/favorites")).json();
    return Array.isArray(d.loras) ? d.loras.map(String) : [];
  } catch {
    return [];
  }
}
async function setFavorite(name, pinned) {
  try {
    const d = await (await fetch("/nynxz/experimental/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, pinned })
    })).json();
    const next = Array.isArray(d.loras) ? d.loras.map(String) : [];
    _favCache = Promise.resolve(next);
    return next;
  } catch {
    return [];
  }
}
const _hoisted_1 = { class: "ls" };
const _hoisted_2 = { class: "ls-mid" };
const _hoisted_3 = {
  key: 0,
  class: "ls-rows"
};
const _hoisted_4 = ["onDragover", "onDrop"];
const _hoisted_5 = ["onDragstart"];
const _hoisted_6 = ["title"];
const _hoisted_7 = ["src", "onError"];
const _hoisted_8 = {
  key: 2,
  class: "mdi mdi-cube-outline ls-thumb sm ph"
};
const _hoisted_9 = { class: "ls-sel-name" };
const _hoisted_10 = ["src"];
const _hoisted_11 = {
  key: 1,
  class: "mdi mdi-cube-outline ls-thumb ph"
};
const _hoisted_12 = { class: "ls-opt-txt" };
const _hoisted_13 = { class: "ls-opt-name" };
const _hoisted_14 = {
  key: 0,
  class: "ls-opt-dir"
};
const _hoisted_15 = ["title", "onClick"];
const _hoisted_16 = {
  key: 1,
  class: "ls-empty"
};
const _hoisted_17 = { class: "ls-foot" };
const _hoisted_18 = {
  key: 0,
  class: "ls-add-n"
};
const _hoisted_19 = { class: "ls-search" };
const _hoisted_20 = {
  key: 0,
  class: "ls-crumbs"
};
const _hoisted_21 = ["onClick"];
const _hoisted_22 = { class: "ls-grid" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "ls-card-meta" };
const _hoisted_25 = ["title"];
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "ls-card-img" };
const _hoisted_28 = ["src"];
const _hoisted_29 = {
  key: 1,
  class: "mdi mdi-cube-outline"
};
const _hoisted_30 = ["onClick"];
const _hoisted_31 = { class: "ls-card-meta" };
const _hoisted_32 = ["title"];
const _hoisted_33 = { class: "ls-card-dir" };
const _hoisted_34 = {
  key: 0,
  class: "ls-grid-empty"
};
const ORDER_KEY = "nynxzLoraOrder";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoraStack",
  props: {
    widget: {},
    node: {}
  },
  setup(__props) {
    const props = __props;
    const loras = /* @__PURE__ */ ref([]);
    const favorites = /* @__PURE__ */ ref([]);
    let idSeq = 0;
    function nextId() {
      return ++idSeq;
    }
    const rows = /* @__PURE__ */ ref(loadRows());
    const dragIndex = /* @__PURE__ */ ref(-1);
    const dropIndex = /* @__PURE__ */ ref(-1);
    const browse = /* @__PURE__ */ ref(false);
    const browseTarget = /* @__PURE__ */ ref(-1);
    const bq = /* @__PURE__ */ ref("");
    const bfilter = /* @__PURE__ */ ref("all");
    const FILTERS = [
      { value: "all", label: "All" },
      { value: "fav", label: "Bookmarked", icon: "mdi mdi-star" }
    ];
    const bmode = /* @__PURE__ */ ref("flat");
    const bpath = /* @__PURE__ */ ref("");
    const BMODES = [
      { value: "flat", label: "Flat" },
      { value: "folder", label: "Folders" }
    ];
    const previewable = /* @__PURE__ */ new Set();
    function num(v, fallback) {
      const n = +v;
      return Number.isFinite(n) ? n : fallback;
    }
    function normalizeRows(arr) {
      return arr.filter((r) => r && typeof r === "object").map((r) => {
        const id = Number.isFinite(+r.id) ? +r.id : nextId();
        if (id > idSeq) idSeq = id;
        return { id, on: r.on !== false, name: String(r.name ?? ""), strength: num(r.strength, 1) };
      });
    }
    function parseRows(v) {
      let arr = v;
      if (typeof arr === "string") {
        try {
          arr = JSON.parse(arr || "[]");
        } catch {
          arr = [];
        }
      }
      if (!Array.isArray(arr)) return [];
      return normalizeRows(arr);
    }
    function loadRows() {
      const stored = props.node?.properties?.[ORDER_KEY];
      if (Array.isArray(stored) && stored.length) return normalizeRows(stored);
      return parseRows(props.widget?.value);
    }
    async function ensureLoras() {
      const [ls, fs] = await Promise.all([listLoras(), getFavorites()]);
      loras.value = ls;
      favorites.value = fs;
      for (const l of ls) if (l.has_preview) previewable.add(l.name);
      listLoaded.value = true;
    }
    const known = computed(() => new Set(loras.value.map((l) => l.name)));
    function isMissing(name) {
      const n = String(name);
      return listLoaded.value && !!n && !known.value.has(n);
    }
    if (rows.value.some((r) => r.name)) void ensureLoras();
    const items = computed(
      () => loras.value.map((l) => ({ value: l.name, label: short(l.name), keywords: l.name }))
    );
    const favSet = computed(() => new Set(favorites.value));
    const browseItems = computed(() => {
      const q = bq.value.trim().toLowerCase();
      return loras.value.filter((l) => {
        if (bfilter.value === "fav" && !favSet.value.has(l.name)) return false;
        return !q || l.name.toLowerCase().includes(q);
      });
    });
    const folderActive = computed(() => bmode.value === "folder" && !bq.value.trim());
    const crumbSegs = computed(() => bpath.value ? bpath.value.split("/") : []);
    const folderView = computed(() => {
      const prefix = bpath.value ? bpath.value + "/" : "";
      const folders = /* @__PURE__ */ new Set();
      const files = [];
      for (const l of loras.value) {
        if (bfilter.value === "fav" && !favSet.value.has(l.name)) continue;
        if (prefix && !l.name.startsWith(prefix)) continue;
        const rest = l.name.slice(prefix.length);
        const slash = rest.indexOf("/");
        if (slash === -1)
          files.push(l);
        else folders.add(rest.slice(0, slash));
      }
      return { folders: [...folders].sort(), files };
    });
    const gridFolders = computed(() => folderActive.value ? folderView.value.folders : []);
    const gridFiles = computed(() => folderActive.value ? folderView.value.files : browseItems.value);
    function short(name) {
      const base = String(name).split("/").pop() || String(name);
      return base.replace(/\.(safetensors|pt|ckpt|bin|lora)$/i, "");
    }
    function folder(name) {
      const parts = String(name).split("/");
      return parts.length > 1 ? parts.slice(0, -1).join("/") : "";
    }
    function hasPreview(name) {
      return previewable.has(String(name));
    }
    function preview(name) {
      return previewUrl(String(name));
    }
    const listLoaded = /* @__PURE__ */ ref(false);
    const selFailed = /* @__PURE__ */ ref(/* @__PURE__ */ new Set());
    function selThumb(name) {
      const n = String(name);
      if (!n || selFailed.value.has(n)) return false;
      return listLoaded.value ? previewable.has(n) : true;
    }
    function onSelErr(name) {
      selFailed.value = new Set(selFailed.value).add(String(name));
    }
    function isFav(name) {
      return favSet.value.has(String(name));
    }
    function onImgErr(e) {
      const img = e.target;
      previewable.delete(decodeURIComponent(new URL(img.src).searchParams.get("name") || ""));
      img.style.display = "none";
    }
    function commit() {
      if (props.node?.properties) {
        props.node.properties[ORDER_KEY] = rows.value.map((r) => ({ ...r }));
      }
      if (props.widget) {
        const value = rows.value.map((r) => ({ on: r.on, name: r.name, strength: r.strength })).sort((a, b) => a.name.localeCompare(b.name) || a.strength - b.strength || +a.on - +b.on);
        props.widget.value = value;
        try {
          props.widget.callback?.(value);
        } catch {
        }
      }
      props.node?.graph?.setDirtyCanvas?.(true, true);
    }
    function setOn(i, on) {
      if (rows.value[i]) {
        rows.value[i].on = on;
        commit();
      }
    }
    function setName(i, name) {
      if (rows.value[i]) {
        rows.value[i].name = name;
        commit();
      }
    }
    function setStrengthVal(i, v) {
      if (rows.value[i]) {
        rows.value[i].strength = v;
        commit();
      }
    }
    function addRow(name = "") {
      rows.value.push({ id: nextId(), on: true, name, strength: 1 });
      commit();
    }
    function removeRow(i) {
      rows.value.splice(i, 1);
      commit();
    }
    function clearAll() {
      rows.value = [];
      commit();
    }
    function startReorder(i, e) {
      dragIndex.value = i;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(i));
      }
    }
    function onRowDragOver(i, e) {
      if (dragIndex.value < 0) return;
      e.stopPropagation();
      dropIndex.value = i;
    }
    function onRowDrop(to, e) {
      if (dragIndex.value < 0) return;
      e.preventDefault();
      e.stopPropagation();
      const from = dragIndex.value;
      endReorder();
      if (from === to) return;
      const moved = rows.value.splice(from, 1)[0];
      if (!moved) return;
      rows.value.splice(to, 0, moved);
      commit();
    }
    function endReorder() {
      dragIndex.value = -1;
      dropIndex.value = -1;
    }
    function enterFolder(name) {
      bpath.value = bpath.value ? bpath.value + "/" + name : name;
    }
    function openBrowse(target, closeMenu) {
      closeMenu?.();
      void ensureLoras();
      browseTarget.value = target;
      bpath.value = "";
      browse.value = true;
    }
    function pickFromBrowse(name) {
      if (browseTarget.value < 0) addRow(name);
      else setName(browseTarget.value, name);
      browse.value = false;
    }
    async function toggleFav(name) {
      favorites.value = await setFavorite(String(name), !favSet.value.has(String(name)));
    }
    return (_ctx, _cache2) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          rows.value.length ? (openBlock(), createElementBlock("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row, i) => {
              return openBlock(), createElementBlock("div", {
                key: row.id,
                class: normalizeClass(["ls-row", { off: !row.on, dragging: dragIndex.value === i, over: dropIndex.value === i && dragIndex.value !== i }]),
                onDragover: withModifiers(($event) => onRowDragOver(i, $event), ["prevent"]),
                onDrop: ($event) => onRowDrop(i, $event),
                onDragend: endReorder
              }, [
                createBaseVNode("div", {
                  class: "ls-grip",
                  draggable: "true",
                  title: "Drag to reorder",
                  onDragstart: ($event) => startReorder(i, $event)
                }, [..._cache2[7] || (_cache2[7] = [
                  createBaseVNode("i", { class: "mdi mdi-drag-vertical" }, null, -1)
                ])], 40, _hoisted_5),
                createVNode(unref(ZenSwitch), {
                  "model-value": row.on,
                  title: "Enable",
                  "onUpdate:modelValue": ($event) => setOn(i, $event)
                }, null, 8, ["model-value", "onUpdate:modelValue"]),
                createVNode(unref(ZenCombo), {
                  class: "ls-pick",
                  "model-value": row.name,
                  items: items.value,
                  pinned: favorites.value,
                  "menu-width": 400,
                  "item-height": 54,
                  placeholder: "Select a LoRA…",
                  "empty-text": "No LoRAs found",
                  "onUpdate:modelValue": ($event) => setName(i, String($event)),
                  onOpen: ensureLoras
                }, {
                  selected: withCtx(() => [
                    createBaseVNode("span", {
                      class: normalizeClass(["ls-sel", { missing: isMissing(row.name) }])
                    }, [
                      isMissing(row.name) ? (openBlock(), createElementBlock("i", {
                        key: 0,
                        class: "mdi mdi-alert ls-thumb sm warn",
                        title: `LoRA not found on disk: ${row.name}`
                      }, null, 8, _hoisted_6)) : row.name && selThumb(row.name) ? (openBlock(), createElementBlock("img", {
                        key: 1,
                        class: "ls-thumb sm",
                        src: preview(row.name),
                        onError: ($event) => onSelErr(row.name)
                      }, null, 40, _hoisted_7)) : (openBlock(), createElementBlock("i", _hoisted_8)),
                      createBaseVNode("span", _hoisted_9, toDisplayString(row.name ? short(row.name) : "Select a LoRA…"), 1)
                    ], 2)
                  ]),
                  option: withCtx(({ item }) => [
                    hasPreview(item.value) ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      class: "ls-thumb",
                      src: preview(item.value),
                      loading: "lazy",
                      onError: onImgErr
                    }, null, 40, _hoisted_10)) : (openBlock(), createElementBlock("i", _hoisted_11)),
                    createBaseVNode("span", _hoisted_12, [
                      createBaseVNode("span", _hoisted_13, toDisplayString(short(item.value)), 1),
                      folder(item.value) ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(folder(item.value)), 1)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("button", {
                      class: normalizeClass(["ls-star", { on: isFav(item.value) }]),
                      title: isFav(item.value) ? "Remove bookmark" : "Bookmark",
                      onClick: withModifiers(($event) => toggleFav(item.value), ["stop"])
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["mdi", isFav(item.value) ? "mdi-star" : "mdi-star-outline"])
                      }, null, 2)
                    ], 10, _hoisted_15)
                  ]),
                  footer: withCtx(({ close }) => [
                    createVNode(unref(ZenButton), {
                      variant: "ghost",
                      sm: "",
                      block: "",
                      icon: "mdi mdi-view-grid-outline",
                      onClick: ($event) => openBrowse(i, close)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Browse all (" + toDisplayString(loras.value.length) + ")", 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 2
                }, 1032, ["model-value", "items", "pinned", "onUpdate:modelValue"]),
                createVNode(unref(ZenNumber), {
                  class: "ls-str",
                  "model-value": row.strength,
                  step: 0.05,
                  min: -10,
                  max: 10,
                  "onUpdate:modelValue": ($event) => setStrengthVal(i, $event)
                }, null, 8, ["model-value", "onUpdate:modelValue"]),
                createVNode(unref(ZenIconButton), {
                  icon: "mdi mdi-close",
                  title: "Remove",
                  onClick: ($event) => removeRow(i)
                }, null, 8, ["onClick"])
              ], 42, _hoisted_4);
            }), 128))
          ])) : (openBlock(), createElementBlock("div", _hoisted_16, [..._cache2[8] || (_cache2[8] = [
            createBaseVNode("i", { class: "mdi mdi-layers-triple-outline" }, null, -1),
            createBaseVNode("span", null, "No LoRAs in this stack yet", -1)
          ])]))
        ]),
        createBaseVNode("div", _hoisted_17, [
          createBaseVNode("button", {
            class: "ls-add",
            onClick: _cache2[0] || (_cache2[0] = ($event) => addRow())
          }, [
            _cache2[9] || (_cache2[9] = createBaseVNode("i", { class: "mdi mdi-plus" }, null, -1)),
            _cache2[10] || (_cache2[10] = createTextVNode(" Add LoRA", -1)),
            rows.value.length ? (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(rows.value.length), 1)) : createCommentVNode("", true)
          ]),
          createVNode(unref(ZenIconButton), {
            icon: "mdi mdi-view-grid-outline",
            title: "Browse library",
            onClick: _cache2[1] || (_cache2[1] = ($event) => openBrowse(-1))
          }),
          rows.value.length ? (openBlock(), createBlock(unref(ZenIconButton), {
            key: 0,
            icon: "mdi mdi-broom",
            danger: "",
            title: "Clear all",
            onClick: clearAll
          })) : createCommentVNode("", true)
        ]),
        createVNode(unref(_sfc_main$5), {
          open: browse.value,
          "onUpdate:open": _cache2[6] || (_cache2[6] = ($event) => browse.value = $event),
          title: "LoRA browser",
          width: "880px",
          height: "78vh"
        }, {
          header: withCtx(() => [
            createBaseVNode("span", _hoisted_19, [
              createVNode(unref(ZenInput), {
                modelValue: bq.value,
                "onUpdate:modelValue": _cache2[2] || (_cache2[2] = ($event) => bq.value = $event),
                placeholder: "Search LoRAs…",
                sm: ""
              }, null, 8, ["modelValue"])
            ]),
            createVNode(unref(ZenToggleGroup), {
              modelValue: bmode.value,
              "onUpdate:modelValue": _cache2[3] || (_cache2[3] = ($event) => bmode.value = $event),
              options: BMODES
            }, null, 8, ["modelValue"]),
            createVNode(unref(ZenToggleGroup), {
              modelValue: bfilter.value,
              "onUpdate:modelValue": _cache2[4] || (_cache2[4] = ($event) => bfilter.value = $event),
              options: FILTERS
            }, null, 8, ["modelValue"])
          ]),
          default: withCtx(() => [
            folderActive.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
              createBaseVNode("button", {
                class: normalizeClass(["ls-crumb", { on: !bpath.value }]),
                onClick: _cache2[5] || (_cache2[5] = ($event) => bpath.value = "")
              }, "all", 2),
              (openBlock(true), createElementBlock(Fragment, null, renderList(crumbSegs.value, (seg, i) => {
                return openBlock(), createElementBlock(Fragment, { key: i }, [
                  _cache2[11] || (_cache2[11] = createBaseVNode("i", { class: "mdi mdi-chevron-right" }, null, -1)),
                  createBaseVNode("button", {
                    class: normalizeClass(["ls-crumb", { on: i === crumbSegs.value.length - 1 }]),
                    onClick: ($event) => bpath.value = crumbSegs.value.slice(0, i + 1).join("/")
                  }, toDisplayString(seg), 11, _hoisted_21)
                ], 64);
              }), 128))
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_22, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(gridFolders.value, (f) => {
                return openBlock(), createElementBlock("button", {
                  key: "d:" + f,
                  class: "ls-card ls-folder",
                  onClick: ($event) => enterFolder(f)
                }, [
                  _cache2[13] || (_cache2[13] = createBaseVNode("div", { class: "ls-card-img" }, [
                    createBaseVNode("i", { class: "mdi mdi-folder" })
                  ], -1)),
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("span", {
                      class: "ls-card-name",
                      title: f
                    }, toDisplayString(f), 9, _hoisted_25),
                    _cache2[12] || (_cache2[12] = createBaseVNode("span", { class: "ls-card-dir" }, "folder", -1))
                  ])
                ], 8, _hoisted_23);
              }), 128)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(gridFiles.value, (it) => {
                return openBlock(), createElementBlock("button", {
                  key: it.name,
                  class: normalizeClass(["ls-card", { sel: browseTarget.value >= 0 && rows.value[browseTarget.value]?.name === it.name }]),
                  onClick: ($event) => pickFromBrowse(it.name)
                }, [
                  createBaseVNode("div", _hoisted_27, [
                    it.has_preview ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: preview(it.name),
                      loading: "lazy",
                      onError: onImgErr
                    }, null, 40, _hoisted_28)) : (openBlock(), createElementBlock("i", _hoisted_29)),
                    createBaseVNode("span", {
                      class: normalizeClass(["ls-card-star", { on: isFav(it.name) }]),
                      onClick: withModifiers(($event) => toggleFav(it.name), ["stop"])
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["mdi", isFav(it.name) ? "mdi-star" : "mdi-star-outline"])
                      }, null, 2)
                    ], 10, _hoisted_30)
                  ]),
                  createBaseVNode("div", _hoisted_31, [
                    createBaseVNode("span", {
                      class: "ls-card-name",
                      title: it.name
                    }, toDisplayString(short(it.name)), 9, _hoisted_32),
                    createBaseVNode("span", _hoisted_33, toDisplayString(folderActive.value ? "—" : folder(it.name) || "—"), 1)
                  ])
                ], 10, _hoisted_26);
              }), 128)),
              !gridFolders.value.length && !gridFiles.value.length ? (openBlock(), createElementBlock("p", _hoisted_34, toDisplayString(folderActive.value ? "Empty folder." : "No matches."), 1)) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }, 8, ["open"])
      ]);
    };
  }
});
const LoraStack = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb7918f8"]]);
const loraNode = defineNode({
  is: [
    "nynxz.experimental.NynxzLoraLoader",
    "nynxz.experimental.NynxzLoraLoaderCLIP",
    "nynxz.experimental.NynxzLoraPicker"
  ],
  minSize: [380, 130],
  widgets: [
    {
      name: "stack",
      type: "NYNXZ_EXP_LORA_STACK",
      component: LoraStack,
      minHeight: 60,
      default: []
    }
  ]
});
function lgCanvas() {
  return app.canvas ?? null;
}
function oklToRgb(str) {
  const num = (t) => t && t.indexOf("%") >= 0 ? parseFloat(t) / 100 : parseFloat(t);
  let L, a, b;
  let m = /oklch\(\s*([^)]+)\)/i.exec(str);
  if (m) {
    const p2 = m[1].split("/")[0].trim().split(/[\s,]+/);
    L = num(p2[0]);
    const C = parseFloat(p2[1]);
    const H = (parseFloat(p2[2]) || 0) * Math.PI / 180;
    a = C * Math.cos(H);
    b = C * Math.sin(H);
  } else if (m = /oklab\(\s*([^)]+)\)/i.exec(str)) {
    const p2 = m[1].split("/")[0].trim().split(/[\s,]+/);
    L = num(p2[0]);
    a = parseFloat(p2[1]);
    b = parseFloat(p2[2]);
  } else {
    return null;
  }
  if ([L, a, b].some(Number.isNaN)) return null;
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s
  ];
  const g = (x) => {
    const c = x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(c * 255)));
  };
  return [g(lin[0]), g(lin[1]), g(lin[2])];
}
const probe2d = (() => {
  try {
    return document.createElement("canvas").getContext("2d");
  } catch {
    return null;
  }
})();
function normalizeColor(value) {
  const v = (value || "").trim();
  if (!v) return "";
  if (v[0] === "#" || v.startsWith("rgb")) return v;
  if (v.startsWith("okl")) {
    const rgb = oklToRgb(v);
    if (rgb) return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
  if (probe2d) {
    probe2d.fillStyle = "#000000";
    probe2d.fillStyle = v;
    const a = probe2d.fillStyle;
    probe2d.fillStyle = "#ffffff";
    probe2d.fillStyle = v;
    if (a === probe2d.fillStyle) return a;
  }
  return "";
}
function cssColor(name, fallback) {
  const el = document.querySelector(".comfyui-body-top") || document.body;
  const raw = getComputedStyle(el).getPropertyValue(name);
  return normalizeColor(raw) || fallback;
}
function hexToRgb(color) {
  if (!color) return null;
  const s = String(color).trim();
  if (s[0] === "#") {
    let h = s.slice(1);
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length !== 6) return null;
    const n = parseInt(h, 16);
    if (Number.isNaN(n)) return null;
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const p2 = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
    if (p2.length >= 3 && p2.slice(0, 3).every((x) => !Number.isNaN(x))) return [Math.round(p2[0]), Math.round(p2[1]), Math.round(p2[2])];
  }
  return null;
}
const S = {
  rainbow: 1,
  // drifting full-field spectrum (the original look)
  colorSpeed: 45,
  // °/sec
  dotSpacing: 32,
  // graph units
  dotRadius: 1.4,
  restAlpha: 0.22,
  glowSize: 8,
  mouseRadius: 200,
  baseBrightness: 0.25,
  saturation: 0.7,
  lightness: 0.55,
  vignette: 1,
  // Blob trail: the droplet is a tapered poly-line of recent positions, so it curves along the
  // actual path (a comet/teardrop) instead of a rigid ellipse. These are the fixed knobs; tail
  // length + pointiness come from the "Blob flow" slider (see flowParams).
  trailSample: 5,
  // CSS px — min spacing between stored trail points
  trailMax: 20,
  // hard cap on stored points (must be ≤ MAX_TRAIL in the shader)
  headRadius: 200,
  // graph units — influence radius at the head (matches mouseRadius)
  tailFade: 0.55
  // brightness multiplier at the tail tip (thinning/fading water)
};
function speedToTau(v) {
  const s = Math.min(100, Math.max(1, v));
  return 0.34 * (1 - s / 110);
}
function flowParams(v) {
  const n = Math.min(100, Math.max(0, v)) / 100;
  return { ttl: 140 + n * 300, tailRadius: 60 - n * 42 };
}
const VERT = `#version 300 es
const vec2 V[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(V[gl_VertexID], 0.0, 1.0); }
`;
const FRAG = `#version 300 es
precision highp float;
#define MAX_TRAIL 20
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_dpr;
uniform float u_scale;
uniform vec2  u_offset;
uniform vec2  u_mouse;
uniform float u_over;
uniform float u_time;
uniform float u_spacing;
uniform float u_dotRadius;
uniform float u_restAlpha;
uniform float u_glow;
uniform float u_mouseRadius;
uniform float u_sat;
uniform float u_lit;
uniform float u_base;
uniform float u_speed;
uniform float u_rainbow;
uniform vec3  u_dotColor;
uniform vec3  u_bgColor;
uniform float u_vignette;
uniform float u_tailFade;         // brightness at the tail tip (< 1 ⇒ fades out)
uniform int   u_trailN;           // number of active trail points (0/1 ⇒ plain circle at u_mouse)
uniform vec2  u_trail[MAX_TRAIL];  // recent cursor path, head→tail, graph space
uniform float u_trailR[MAX_TRAIL]; // per-point influence radius, tapering head→tail
vec3 hsl2rgb(float h, float s, float l){
  h = mod(h, 360.0) / 60.0;
  float c = (1.0 - abs(2.0*l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
  vec3 rgb;
  if (h < 1.0)      rgb = vec3(c, x, 0.0);
  else if (h < 2.0) rgb = vec3(x, c, 0.0);
  else if (h < 3.0) rgb = vec3(0.0, c, x);
  else if (h < 4.0) rgb = vec3(0.0, x, c);
  else if (h < 5.0) rgb = vec3(x, 0.0, c);
  else              rgb = vec3(c, 0.0, x);
  return rgb + (l - c/2.0);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
// Distance from p to segment a→b; returns the clamped projection param in t.
float segDist(vec2 p, vec2 a, vec2 b, out float t){
  vec2 ab = b - a;
  t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
  return length(p - (a + t * ab));
}
void main(){
  vec2 dev = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 g = dev / (u_dpr * u_scale) - u_offset;
  vec3 col = u_bgColor;
  vec2 baseCell = floor(g / u_spacing + 0.5);
  float aa = max(fwidth(g.x), fwidth(g.y)) + 0.001;
  for (int oy = -1; oy <= 1; oy++) {
    for (int ox = -1; ox <= 1; ox++) {
      vec2 cell = baseCell + vec2(float(ox), float(oy));
      vec2 dotPos = cell * u_spacing;
      float dist = length(g - dotPos);
      // Cursor proximity. With a trail (blob), light dots by distance to the tapered poly-line of
      // recent cursor positions: a tube that is fat + bright at the head and thins + fades toward
      // the tail, and — crucially — curves along the path actually travelled. Otherwise (snap/
      // follow, u_trailN < 2) it's a plain circle around the single follow point u_mouse.
      float prox = 0.0;
      if (u_over > 0.5) {
        if (u_trailN >= 2) {
          for (int i = 0; i < MAX_TRAIL - 1; i++) {
            if (i >= u_trailN - 1) break;
            float t;
            float d = segDist(dotPos, u_trail[i], u_trail[i + 1], t);
            float rr = mix(u_trailR[i], u_trailR[i + 1], t);       // radius along the segment
            float f = (float(i) + t) / float(u_trailN - 1);         // 0 head → 1 tail
            float p = (1.0 - d / max(rr, 1e-3)) * mix(1.0, u_tailFade, f);
            prox = max(prox, p);
          }
        } else {
          prox = 1.0 - length(dotPos - u_mouse) / u_mouseRadius;
        }
        prox = max(0.0, prox);
      }
      float h = hash(cell);
      float pulse = sin(u_time * (0.2 + h * 0.4) + h * 6.2831) * 0.5 + 0.5;
      float baseAlpha = u_restAlpha + h * 0.08;
      float alpha = baseAlpha + prox * 0.75 + pulse * 0.06;
      vec3 dotc;
      if (u_rainbow > 0.5) {
        float flow = (dotPos.x + dotPos.y) * 0.12
                   + 30.0 * sin(dotPos.x * 0.008 + u_time * 0.4)
                   + 30.0 * sin(dotPos.y * 0.010 - u_time * 0.3)
                   + u_time * u_speed;
        float hue = flow + prox * 50.0;
        float sat = u_base * 0.3 + prox * u_sat;
        float lit = u_base + prox * (u_lit - u_base);
        dotc = hsl2rgb(hue, sat, lit);
      } else {
        dotc = min(vec3(1.0), u_dotColor * (1.0 + prox * 0.7));
      }
      float coreR = u_dotRadius + prox * u_dotRadius * 1.8;
      float core = (1.0 - smoothstep(coreR - aa, coreR + aa, dist)) * alpha;
      float glowR = u_dotRadius + prox * u_glow;
      float glow = prox > 0.05 ? (1.0 - smoothstep(0.0, glowR, dist)) * prox * 0.4 * alpha : 0.0;
      col = mix(col, dotc, clamp(core + glow, 0.0, 1.0));
    }
  }
  if (u_vignette > 0.5) {
    vec2 uv = dev / u_res;
    float d = distance(uv, vec2(0.5, 0.4));
    col = mix(col, u_bgColor, smoothstep(0.55, 1.05, d));
  }
  fragColor = vec4(col, 1.0);
}
`;
const UNIFORMS = [
  "u_res",
  "u_dpr",
  "u_scale",
  "u_offset",
  "u_mouse",
  "u_over",
  "u_time",
  "u_spacing",
  "u_dotRadius",
  "u_restAlpha",
  "u_glow",
  "u_mouseRadius",
  "u_sat",
  "u_lit",
  "u_base",
  "u_speed",
  "u_rainbow",
  "u_dotColor",
  "u_bgColor",
  "u_vignette",
  "u_tailFade",
  "u_trailN",
  "u_trail",
  "u_trailR"
];
function compile(gl, type, src) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("[ZenKit] bg shader compile failed:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}
function createGL(canvas) {
  const gl = canvas.getContext("webgl2", { alpha: false, premultipliedAlpha: false, antialias: false });
  if (!gl) return null;
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("[ZenKit] bg program link failed:", gl.getProgramInfoLog(prog));
    return null;
  }
  gl.useProgram(prog);
  const u = {};
  for (const name of UNIFORMS) u[name] = gl.getUniformLocation(prog, name);
  return { gl, prog, u };
}
function renderGL(host2, st) {
  const vw = host2.w | 0;
  const vh = host2.h | 0;
  if (vw <= 0 || vh <= 0) return;
  const { gl, u } = st;
  gl.useProgram(st.prog);
  gl.viewport(0, 0, vw, vh);
  const bg = (hexToRgb(host2.color("--zen-bg", "#121212")) ?? [18, 18, 18]).map((v) => v / 255);
  const dot = (hexToRgb(host2.color("--zen-text", "#cccccc")) ?? [200, 200, 200]).map((v) => v / 255);
  gl.uniform2f(u.u_res, vw, vh);
  gl.uniform1f(u.u_dpr, host2.dpr);
  gl.uniform1f(u.u_scale, host2.scale);
  gl.uniform2f(u.u_offset, host2.offset.x, host2.offset.y);
  gl.uniform2f(u.u_mouse, host2.mouse.x, host2.mouse.y);
  gl.uniform1f(u.u_over, host2.mouse.over ? 1 : 0);
  gl.uniform1f(u.u_time, host2.time * 1e-3);
  gl.uniform1f(u.u_spacing, S.dotSpacing);
  gl.uniform1f(u.u_dotRadius, S.dotRadius);
  gl.uniform1f(u.u_restAlpha, S.restAlpha);
  gl.uniform1f(u.u_glow, S.glowSize);
  gl.uniform1f(u.u_mouseRadius, S.mouseRadius);
  gl.uniform1f(u.u_sat, S.saturation);
  gl.uniform1f(u.u_lit, S.lightness);
  gl.uniform1f(u.u_base, S.baseBrightness);
  gl.uniform1f(u.u_speed, S.colorSpeed);
  gl.uniform1f(u.u_rainbow, S.rainbow);
  gl.uniform3f(u.u_dotColor, dot[0], dot[1], dot[2]);
  gl.uniform3f(u.u_bgColor, bg[0], bg[1], bg[2]);
  gl.uniform1f(u.u_vignette, S.vignette);
  gl.uniform1f(u.u_tailFade, S.tailFade);
  gl.uniform1i(u.u_trailN, host2.trail.n);
  if (host2.trail.n > 0) {
    gl.uniform2fv(u.u_trail, host2.trail.pts);
    gl.uniform1fv(u.u_trailR, host2.trail.radii);
  }
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
function render2D(host2, st) {
  const ctx = st.ctx2d || (st.ctx2d = host2.layer.getContext("2d"));
  if (!ctx) return;
  const W = host2.w, H = host2.h;
  if (W <= 0 || H <= 0) return;
  const k = host2.dpr * host2.scale;
  const ox = host2.offset.x, oy = host2.offset.y;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.setTransform(k, 0, 0, k, k * ox, k * oy);
  const ax = -ox, ay = -oy, aw = W / k, ah = H / k;
  ctx.fillStyle = host2.color("--zen-bg", "#121212");
  ctx.fillRect(ax, ay, aw, ah);
  const dotCol = hexToRgb(host2.color("--zen-text", "#cccccc")) ?? [200, 200, 200];
  host2.time * 1e-3;
  const i0 = Math.floor(ax / S.dotSpacing) - 1, i1 = Math.ceil((ax + aw) / S.dotSpacing) + 1;
  const j0 = Math.floor(ay / S.dotSpacing) - 1, j1 = Math.ceil((ay + ah) / S.dotSpacing) + 1;
  for (let j = j0; j <= j1; j++) {
    for (let i = i0; i <= i1; i++) {
      const x = i * S.dotSpacing, y = j * S.dotSpacing;
      const prox = host2.mouse.over ? Math.max(0, 1 - Math.hypot(x - host2.mouse.x, y - host2.mouse.y) / S.mouseRadius) : 0;
      const r = dotCol[0] * (1 + prox * 0.7), g = dotCol[1] * (1 + prox * 0.7), b = dotCol[2] * (1 + prox * 0.7);
      const alpha = S.restAlpha + prox * 0.75;
      ctx.beginPath();
      ctx.arc(x, y, S.dotRadius + prox * S.dotRadius * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.min(255, r) | 0}, ${Math.min(255, g) | 0}, ${Math.min(255, b) | 0}, ${Math.min(1, alpha)})`;
      ctx.fill();
    }
  }
}
const grid = {
  id: "grid",
  label: "Interactive Grid",
  init(host2) {
    const gl = createGL(host2.layer);
    if (!gl) console.warn("[ZenKit] WebGL2 unavailable — 2D fallback grid.");
    return { gl, ctx2d: null };
  },
  frame(host2, state) {
    const st = state;
    if (st.gl) renderGL(host2, st.gl);
    else render2D(host2, st);
  },
  dispose(state) {
    const st = state;
    st.gl?.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
};
const registry$1 = /* @__PURE__ */ new Map();
registry$1.set(grid.id, grid);
let desiredId = "grid";
class Host {
  layer = null;
  raf = 0;
  last = 0;
  active = null;
  state = null;
  started = false;
  ptr = { x: 0, y: 0, over: false };
  saved = {};
  // Cursor-follow state (see setBackgroundFollow* below). Defaults keep the classic snap look;
  // flow params are pre-seeded so 'blob' works even before the sliders are first touched.
  followMode = "snap";
  followTau = speedToTau(45);
  // smoothing time-constant, seconds
  trailTtl = flowParams(55).ttl;
  // ms a trail point survives ⇒ tail length ∝ speed × ttl
  tailRadius = flowParams(55).tailRadius;
  // graph-unit influence at the tail tip
  follow = { x: 0, y: 0, has: false };
  // eased pointer, canvas-local CSS px
  trail = [];
  // recent path, head first, CSS px + ms
  setFollowMode(m) {
    this.followMode = m === "follow" || m === "blob" ? m : "snap";
    this.follow.has = false;
    this.trail.length = 0;
  }
  setFollowSpeed(v) {
    this.followTau = speedToTau(v);
  }
  setBlobFlow(v) {
    const p2 = flowParams(v);
    this.trailTtl = p2.ttl;
    this.tailRadius = p2.tailRadius;
  }
  mount() {
    if (this.started) return;
    this.started = true;
    const move = (e) => {
      this.ptr.x = e.clientX;
      this.ptr.y = e.clientY;
      this.ptr.over = true;
    };
    window.addEventListener("pointermove", move, { capture: true, passive: true });
    window.addEventListener("pointerleave", () => this.ptr.over = false, true);
    window.addEventListener("resize", () => this.resize());
    this.whenReady();
  }
  whenReady(tries = 0) {
    if (lgCanvas()?.canvas) return this.setActive(desiredId);
    if (tries > 120) return;
    requestAnimationFrame(() => this.whenReady(tries + 1));
  }
  makeLayer(lg) {
    const el = lg.canvas;
    const c = document.createElement("canvas");
    c.setAttribute("aria-hidden", "true");
    c.dataset.zenkitBg = "";
    Object.assign(c.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" });
    el.parentElement?.insertBefore(c, el);
    this.layer = c;
    this.resize();
  }
  resize() {
    const el = lgCanvas()?.canvas;
    const c = this.layer;
    if (!el || !c) return;
    if (c.width !== el.width || c.height !== el.height) {
      c.width = el.width;
      c.height = el.height;
    }
  }
  suppress(lg) {
    if (this.saved.clear === void 0) {
      this.saved.bg = lg.background_image;
      this.saved.clear = lg.clear_background_color;
    }
    lg.background_image = "";
    lg.clear_background_color = "";
    lg._pattern = void 0;
    lg._bg_img = void 0;
  }
  restore(lg) {
    if (this.saved.clear === void 0) return;
    lg.background_image = this.saved.bg;
    lg.clear_background_color = this.saved.clear;
    lg._pattern = void 0;
    lg._bg_img = void 0;
    this.saved = {};
  }
  buildCtx(lg, now) {
    const c = this.layer;
    const off = lg.ds?.offset || [0, 0];
    const scale = lg.ds?.scale ?? 1;
    const r = lg.canvas.getBoundingClientRect();
    const dpr = r.width > 0 ? c.width / r.width : window.devicePixelRatio || 1;
    const dt = this.last ? now - this.last : 16;
    let mx = -1e6, my = -1e6, over = false;
    const inside = this.ptr.over && this.ptr.x >= r.left && this.ptr.x <= r.right && this.ptr.y >= r.top && this.ptr.y <= r.bottom;
    if (inside) {
      over = true;
      const tx = this.ptr.x - r.left;
      const ty = this.ptr.y - r.top;
      if (this.followMode === "snap" || !this.follow.has) {
        this.follow.x = tx;
        this.follow.y = ty;
        this.follow.has = true;
      }
      const a = this.followMode === "snap" ? 1 : 1 - Math.exp(-(dt / 1e3) / Math.max(1e-3, this.followTau));
      this.follow.x += (tx - this.follow.x) * a;
      this.follow.y += (ty - this.follow.y) * a;
      mx = this.follow.x / scale - off[0];
      my = this.follow.y / scale - off[1];
      if (this.followMode === "blob") this.updateTrail(now);
      else this.trail.length = 0;
    } else {
      this.follow.has = false;
      this.trail.length = 0;
    }
    const pts = [];
    const radii = [];
    const n = this.trail.length;
    for (let i = 0; i < n; i++) {
      const p2 = this.trail[i];
      pts.push(p2.x / scale - off[0], p2.y / scale - off[1]);
      radii.push(S.headRadius + (this.tailRadius - S.headRadius) * (n > 1 ? i / (n - 1) : 0));
    }
    return {
      layer: c,
      w: c.width,
      h: c.height,
      dpr,
      scale,
      offset: { x: off[0], y: off[1] },
      mouse: { x: mx, y: my, over },
      trail: { pts, radii, n },
      time: now,
      dt,
      color: (v, fb = "#888888") => cssColor(v, fb)
    };
  }
  // Append the current follow point to the head of the trail (or nudge the head if barely moved),
  // then expire points older than the tail lifetime so the tail retracts as the cursor slows.
  updateTrail(now) {
    const head = this.trail[0];
    if (!head || Math.hypot(this.follow.x - head.x, this.follow.y - head.y) >= S.trailSample) {
      this.trail.unshift({ x: this.follow.x, y: this.follow.y, t: now });
    } else {
      head.x = this.follow.x;
      head.y = this.follow.y;
      head.t = now;
    }
    while (this.trail.length > 1 && now - this.trail[this.trail.length - 1].t > this.trailTtl) this.trail.pop();
    if (this.trail.length > S.trailMax) this.trail.length = S.trailMax;
  }
  setActive(id) {
    desiredId = id;
    const targetId = id && id !== "none" ? id : null;
    if (this.active?.id === targetId) return;
    const lg = lgCanvas();
    if (!lg || !lg.canvas) return;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.last = 0;
    if (this.active) {
      try {
        this.active.dispose?.(this.state);
      } catch (e) {
        console.error("[ZenKit] background dispose failed", e);
      }
    }
    this.active = null;
    this.state = null;
    this.layer?.remove();
    this.layer = null;
    const def2 = targetId ? registry$1.get(targetId) : void 0;
    if (!def2) {
      this.restore(lg);
      lg.setDirty?.(true, true);
      return;
    }
    this.active = def2;
    this.makeLayer(lg);
    this.suppress(lg);
    try {
      this.state = def2.init?.(this.buildCtx(lg, performance.now())) ?? {};
    } catch (e) {
      console.error("[ZenKit] background init failed", e);
      this.state = {};
    }
    lg.setDirty?.(true, true);
    const loop = (now) => {
      this.raf = requestAnimationFrame(loop);
      this.tick(now);
    };
    this.raf = requestAnimationFrame(loop);
  }
  tick(now) {
    const lg = lgCanvas();
    if (!this.active || !this.layer || !lg) return;
    this.resize();
    if (lg.clear_background_color || lg.background_image) {
      lg.background_image = "";
      lg.clear_background_color = "";
      lg._pattern = void 0;
      lg._bg_img = void 0;
      lg.setDirty?.(false, true);
    }
    const c = this.buildCtx(lg, now);
    this.last = now;
    try {
      this.active.frame(c, this.state);
    } catch (e) {
      console.error("[ZenKit] background frame failed; disabling", e);
      this.setActive(null);
    }
  }
}
const host = new Host();
let mounted = false;
function setBackgroundEnabled(on) {
  desiredId = on ? "grid" : null;
  if (!mounted) {
    if (!on) return;
    mounted = true;
    host.mount();
  } else {
    host.setActive(desiredId);
  }
}
function setBackgroundFollow(mode) {
  host.setFollowMode(mode);
}
function setBackgroundFollowSpeed(v) {
  host.setFollowSpeed(v);
}
function setBackgroundBlobFlow(v) {
  host.setBlobFlow(v);
}
const SETTING_ID$1 = "nynxz.experimental.interactiveBackground";
const FOLLOW_ID = "nynxz.experimental.backgroundFollow";
const FOLLOW_SPEED_ID = "nynxz.experimental.backgroundFollowSpeed";
const BLOB_FLOW_ID = "nynxz.experimental.backgroundBlobFlow";
function registerBackground() {
  app.registerExtension({
    name: "nynxz.experimental.background",
    settings: [
      {
        id: SETTING_ID$1,
        name: "Interactive background",
        category: ["Nynxz Experimental", "Canvas", "Interactive background"],
        type: "boolean",
        defaultValue: false,
        experimental: true,
        tooltip: "A WebGL grid of glowing dots behind the node graph that reacts to your cursor and follows your theme colors. Off by default.",
        onChange(value) {
          setBackgroundEnabled(!!value);
        }
      },
      {
        id: FOLLOW_ID,
        name: "Cursor follow",
        category: ["Nynxz Experimental", "Canvas", "Cursor follow"],
        type: "combo",
        defaultValue: "snap",
        options: [
          { text: "Snap (1:1)", value: "snap" },
          { text: "Follow (eased)", value: "follow" },
          { text: "Blob (droplet)", value: "blob" }
        ],
        experimental: true,
        tooltip: "How the glow tracks your cursor. Snap sits exactly on it; Follow eases in behind it; Blob trails a tapered droplet that curves along the path you draw, like water being dragged.",
        onChange(value) {
          setBackgroundFollow(String(value));
        }
      },
      {
        id: FOLLOW_SPEED_ID,
        name: "Follow speed",
        category: ["Nynxz Experimental", "Canvas", "Follow speed"],
        type: "slider",
        defaultValue: 45,
        attrs: { min: 1, max: 100, step: 1 },
        experimental: true,
        tooltip: "How quickly the glow catches up in Follow/Blob modes. Higher = snappier, lower = a longer, lazier trail.",
        onChange(value) {
          setBackgroundFollowSpeed(Number(value));
        }
      },
      {
        id: BLOB_FLOW_ID,
        name: "Blob flow",
        category: ["Nynxz Experimental", "Canvas", "Blob flow"],
        type: "slider",
        defaultValue: 55,
        attrs: { min: 0, max: 100, step: 1 },
        experimental: true,
        tooltip: "Length and pointiness of the Blob droplet tail. Low = a short rounded blob; high = a long tapered comet tail.",
        onChange(value) {
          setBackgroundBlobFlow(Number(value));
        }
      }
    ],
    // Fallback: if this build of ComfyUI doesn't fire onChange on load, apply the stored values
    // once at startup. The setters are idempotent, so a double-apply is harmless.
    async setup() {
      try {
        const s = app.extensionManager?.setting;
        const on = s?.get(SETTING_ID$1);
        if (on !== void 0) setBackgroundEnabled(!!on);
        const follow = s?.get(FOLLOW_ID);
        if (follow !== void 0) setBackgroundFollow(String(follow));
        const speed = s?.get(FOLLOW_SPEED_ID);
        if (speed !== void 0) setBackgroundFollowSpeed(Number(speed));
        const flow = s?.get(BLOB_FLOW_ID);
        if (flow !== void 0) setBackgroundBlobFlow(Number(flow));
      } catch {
      }
    }
  });
}
function ensureStyle(id, content) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  if (el.textContent !== content) el.textContent = content;
}
const MODES = ["light", "dark"];
function parsePack(data) {
  if (!data || typeof data !== "object") return null;
  const d = data;
  if (typeof d.id !== "string" || typeof d.name !== "string") return null;
  if (!d.tokens || typeof d.tokens !== "object") return null;
  const raw = d.tokens;
  const tokens = {};
  for (const mode of MODES) {
    const set = raw[mode];
    if (!set || typeof set !== "object") continue;
    const out = {};
    for (const [k, v] of Object.entries(set)) {
      if (typeof v === "string") out[k] = v;
    }
    if (Object.keys(out).length) tokens[mode] = out;
  }
  if (!tokens.light && !tokens.dark) return null;
  const modes = Array.isArray(d.modes) ? d.modes.filter((m) => m === "light" || m === "dark") : void 0;
  const css = typeof d.css === "string" && d.css.trim() ? d.css : void 0;
  const regions = parseRegions(d.regions);
  return {
    id: d.id,
    name: d.name,
    ...modes && modes.length ? { modes } : {},
    tokens,
    ...regions ? { regions } : {},
    ...css ? { css } : {}
  };
}
function parseRegions(data) {
  if (!data || typeof data !== "object") return void 0;
  const out = {};
  for (const [region, style] of Object.entries(data)) {
    if (!style || typeof style !== "object") continue;
    const decls = {};
    for (const [prop, value] of Object.entries(style)) {
      if (typeof value === "string" && value.trim()) decls[prop] = value;
    }
    if (Object.keys(decls).length) out[region] = decls;
  }
  return Object.keys(out).length ? out : void 0;
}
const registry = /* @__PURE__ */ new Map();
function registerPacks(list) {
  const out = [];
  for (const p2 of list) {
    const valid = parsePack(p2);
    if (valid) {
      registry.set(valid.id, valid);
      out.push(valid);
    }
  }
  return out;
}
function themePacks() {
  return [...registry.values()];
}
const TOKEN_FALLBACKS = {
  "--background": ["--base-background", "--bg-color", "--content-bg"],
  "--foreground": ["--base-foreground", "--fg-color", "--content-fg"],
  "--primary": ["--primary-background", "--brand-blue", "--accent-primary"],
  "--primary-foreground": ["--button-surface-contrast", "--base-foreground"],
  "--secondary": ["--secondary-background", "--component-node-widget-background"],
  "--secondary-foreground": ["--component-node-foreground", "--foreground"],
  "--muted": ["--muted-background", "--component-node-widget-background"],
  "--muted-foreground": ["--text-secondary", "--component-node-foreground-secondary"],
  "--accent": ["--accent-background", "--component-node-surface"],
  "--accent-foreground": ["--component-node-foreground", "--foreground"],
  "--border": ["--border-default", "--node-component-border"],
  "--input": ["--input-surface", "--component-node-widget-background"],
  "--card": ["--component-node-background", "--node-component-surface"],
  "--card-foreground": ["--component-node-foreground", "--foreground"]
};
const COMFY_MAPPINGS = [
  ["--component-node-background", ["--card", "--background"]],
  ["--component-node-border", ["--border", "--node-component-border"]],
  ["--component-node-foreground", ["--card-foreground", "--foreground"]],
  ["--component-node-foreground-secondary", ["--muted-foreground"]],
  ["--component-node-surface", ["--card", "--background"]],
  ["--component-node-widget-background", ["--secondary", "--input"]],
  ["--component-node-widget-background-hovered", ["--accent", "--secondary"]],
  ["--component-node-widget-background-selected", ["--accent", "--primary"]],
  ["--component-node-widget-background-highlighted", ["--ring", "--primary"]],
  ["--component-node-widget-advanced", ["--primary", "--accent"]],
  ["--node-component-header-surface", ["--card", "--background"]],
  ["--node-component-header", ["--foreground"]],
  ["--node-component-slot-text", ["--muted-foreground", "--foreground"]],
  ["--node-component-border", ["--border"]],
  ["--node-component-surface", ["--card", "--background"]],
  ["--node-component-ring", ["--ring", "--primary"]],
  ["--base-background", ["--background"]],
  ["--base-foreground", ["--foreground"]],
  ["--primary-background", ["--primary"]],
  ["--primary-background-hover", ["--accent", "--primary"]],
  ["--primary-foreground", ["--primary-foreground", "--foreground"]],
  ["--secondary-background", ["--secondary"]],
  ["--secondary-background-hover", ["--accent", "--secondary"]],
  ["--secondary-background-selected", ["--accent", "--primary"]],
  ["--input-surface", ["--input", "--secondary"]],
  ["--text-primary", ["--foreground"]],
  ["--text-secondary", ["--muted-foreground", "--foreground"]],
  ["--border-default", ["--border"]],
  ["--bg-color", ["--background"]],
  ["--fg-color", ["--foreground"]],
  ["--content-bg", ["--card", "--background"]],
  ["--comfy-menu-bg", ["--card", "--background"]],
  ["--comfy-menu-secondary-bg", ["--secondary", "--card"]],
  ["--comfy-input-bg", ["--input", "--secondary"]],
  ["--border-color", ["--border"]],
  ["--input-text", ["--foreground"]],
  ["--descrip-text", ["--muted-foreground"]],
  ["--p-primary-color", ["--primary"]],
  ["--p-primary-hover-color", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-primary-active-color", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-primary-contrast-color", ["--primary-foreground", "--foreground"]],
  ["--p-surface-0", ["--background"]],
  ["--p-surface-50", ["--card", "--background"]],
  ["--p-surface-100", ["--card", "--secondary"]],
  ["--p-surface-200", ["--secondary"]],
  ["--p-surface-300", ["--secondary-background-hover", "--accent"]],
  ["--p-surface-400", ["--secondary-background-selected", "--accent"]],
  ["--p-surface-500", ["--muted"]],
  ["--p-surface-600", ["--secondary-background-hover", "--accent"]],
  ["--p-surface-700", ["--card", "--background"]],
  ["--p-surface-800", ["--background"]],
  ["--p-surface-900", ["--background"]],
  ["--p-surface-950", ["--background"]],
  ["--p-content-background", ["--card", "--background"]],
  ["--p-content-color", ["--foreground"]],
  ["--p-content-border-color", ["--border"]],
  ["--p-text-color", ["--foreground"]],
  ["--p-text-muted-color", ["--muted-foreground"]],
  ["--p-button-primary-background", ["--primary"]],
  ["--p-button-primary-hover-background", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-button-primary-active-background", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-button-primary-border-color", ["--primary"]],
  ["--p-button-primary-hover-border-color", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-button-primary-color", ["--primary-foreground", "--foreground"]],
  ["--p-button-primary-hover-color", ["--primary-foreground", "--foreground"]],
  // ComfyUI's own .comfyui-button.primary (Run/Queue) uses --primary-bg/-fg, NOT the PrimeVue
  // vars — without these a light --primary keeps ComfyUI's default white text → unreadable.
  ["--primary-bg", ["--primary"]],
  ["--primary-fg", ["--primary-foreground", "--foreground"]],
  ["--primary-hover-bg", ["--primary-background-hover", "--accent", "--primary"]],
  ["--primary-hover-fg", ["--primary-foreground", "--foreground"]],
  ["--p-button-secondary-background", ["--secondary"]],
  ["--p-button-secondary-hover-background", ["--accent", "--secondary"]],
  ["--p-button-secondary-border-color", ["--border"]],
  ["--p-button-secondary-color", ["--secondary-foreground", "--foreground"]],
  ["--p-togglebutton-background", ["--secondary", "--input"]],
  ["--p-togglebutton-border-color", ["--border"]],
  ["--p-togglebutton-color", ["--foreground"]],
  ["--p-togglebutton-checked-background", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-togglebutton-checked-border-color", ["--primary-background-hover", "--accent", "--primary"]],
  ["--p-togglebutton-checked-color", ["--foreground"]],
  ["--p-form-field-background", ["--input", "--secondary"]],
  ["--p-form-field-color", ["--foreground"]],
  ["--p-form-field-border-color", ["--border"]],
  ["--p-form-field-placeholder-color", ["--muted-foreground"]],
  ["--p-tooltip-background", ["--popover", "--card", "--background"]],
  ["--p-tooltip-color", ["--popover-foreground", "--card-foreground", "--foreground"]],
  ["--p-slider-track-background", ["--input", "--secondary", "--border"]],
  ["--p-slider-track-active-background", ["--primary"]],
  ["--p-slider-range-background", ["--primary"]],
  ["--p-slider-handle-background", ["--primary"]],
  ["--p-slider-handle-content-background", ["--primary-foreground", "--background"]],
  // ComfyUI 1.44.9 (Tailwind-era) semantic vars the chrome actually reads.
  ["--button-surface", ["--secondary", "--card", "--input"]],
  ["--button-hover-surface", ["--accent", "--secondary"]],
  ["--button-active-surface", ["--accent", "--primary"]],
  ["--button-icon", ["--muted-foreground", "--foreground"]],
  ["--button-surface-contrast", ["--primary-foreground", "--foreground"]],
  ["--accent-primary", ["--primary", "--accent"]],
  ["--accent-background", ["--accent", "--secondary"]],
  ["--nav-background", ["--card", "--background"]],
  ["--interface-menu-surface", ["--popover", "--card", "--background"]],
  ["--interface-menu-component-surface-hovered", ["--accent", "--secondary"]],
  ["--interface-menu-component-surface-selected", ["--accent", "--primary"]],
  ["--interface-menu-stroke", ["--border"]],
  ["--interface-panel-surface", ["--card", "--background"]],
  // A prominent default makes the cursor/tool button look permanently "selected" — keep it a
  // subtle elevation, not the accent.
  ["--interface-panel-selected-surface", ["--secondary", "--card"]],
  ["--interface-stroke", ["--border"]],
  ["--dialog-surface", ["--popover", "--card", "--background"]],
  ["--modal-panel-background", ["--card", "--background"]],
  ["--backdrop", ["--background"]],
  ["--destructive-background", ["--destructive"]],
  ["--destructive-background-hover", ["--destructive"]],
  ["--node-component-surface-hovered", ["--accent", "--secondary"]],
  ["--node-component-surface-selected", ["--accent", "--primary"]],
  ["--node-divider", ["--border"]],
  ["--node-stroke", ["--border"]],
  ["--node-border", ["--border"]],
  ["--node-stroke-selected", ["--ring", "--primary"]],
  // The "blue" — PrimeVue primary palette (set at runtime) + ComfyUI's brand blue.
  ["--p-primary-400", ["--primary"]],
  ["--p-primary-500", ["--primary"]],
  ["--p-primary-600", ["--primary"]],
  ["--brand-blue", ["--primary", "--accent"]]
];
function selectTokenValue(map, keys) {
  for (const k of keys) {
    const v = map[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return void 0;
}
function resolveThemeTokens(pack, mode) {
  const raw = (mode === "dark" ? pack.tokens.dark : pack.tokens.light) || pack.tokens.light || pack.tokens.dark || {};
  const withFallbacks = { ...raw };
  for (const [target, keys] of Object.entries(TOKEN_FALLBACKS)) {
    if (withFallbacks[target]) continue;
    const r = selectTokenValue(withFallbacks, keys);
    if (r) withFallbacks[target] = r;
  }
  const translated = {};
  for (const [target, keys] of COMFY_MAPPINGS) {
    const r = selectTokenValue(withFallbacks, keys);
    if (r) translated[target] = r;
  }
  return { ...translated, ...withFallbacks };
}
function parseRgb(c) {
  const s = (c || "").trim();
  let m = s.match(/^#([0-9a-f]{3})$/i);
  if (m) {
    const h = m[1];
    return [0, 1, 2].map((i) => parseInt(h[i] + h[i], 16));
  }
  m = s.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const h = m[1];
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (m) return [+m[1], +m[2], +m[3]];
  return null;
}
function readableText(bg) {
  const rgb = parseRgb(bg);
  if (!rgb) return null;
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const L = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? "#ffffff" : "#15151a";
}
function jobProgressDefaults(map) {
  const out = {};
  const primary = selectTokenValue(map, ["--primary", "--accent"]);
  if (primary) {
    out["--color-interface-panel-job-progress-primary"] = primary;
    out["--color-interface-panel-job-progress-secondary"] = `color-mix(in srgb, ${primary} 35%, transparent)`;
  }
  const fg = selectTokenValue(map, ["--foreground"]);
  if (fg) out["--color-interface-panel-job-progress-border"] = fg;
  return out;
}
function zenDerived(map) {
  const g = (...k) => selectTokenValue(map, k);
  const out = {};
  const set = (k, v) => {
    if (v) out[k] = v;
  };
  set("--zen-bg", g("--background"));
  set("--zen-surface", g("--card", "--background"));
  set("--zen-surface-2", g("--secondary", "--muted", "--card"));
  set("--zen-input", g("--input", "--secondary"));
  set("--zen-text", g("--foreground"));
  set("--zen-muted", g("--muted-foreground", "--foreground"));
  set("--zen-border", g("--border", "--input"));
  const accent = g("--primary", "--accent");
  set("--zen-accent", accent);
  set("--zen-accent-text", accent && readableText(accent) || g("--primary-foreground", "--background"));
  set("--zen-radius", g("--radius"));
  return out;
}
function radiusScale(r) {
  return {
    "--radius": r,
    "--radius-sm": `calc(${r} * 0.5)`,
    "--radius-md": `calc(${r} * 0.75)`,
    "--radius-lg": r,
    "--radius-xl": `calc(${r} * 1.5)`,
    "--radius-2xl": `calc(${r} * 2)`,
    "--radius-3xl": `calc(${r} * 3)`,
    "--radius-4xl": `calc(${r} * 4)`,
    "--radius-5xl": `calc(${r} * 5)`
  };
}
const ATTR = "data-nynxz-theme";
const BRIDGE_RULES = `
html[${ATTR}] { --zen-node-radius: var(--radius, 10px); --radius-2xl: var(--zen-node-radius); }
html[${ATTR}] .bg-primary-background,
html[${ATTR}] .bg-primary-background *,
html[${ATTR}] [data-testid='queue-button'],
html[${ATTR}] [data-testid='queue-button'] * { color: var(--primary-foreground) !important; }
html[${ATTR}] .lg-node,
html[${ATTR}] .comfy-menu,
html[${ATTR}] .comfyui-body-top,
html[${ATTR}] .comfyui-body-bottom {
  background: var(--component-node-background, var(--card, var(--background))) !important;
  color: var(--component-node-foreground, var(--foreground)) !important;
  border-color: var(--component-node-border, var(--border)) !important;
}
html[${ATTR}] .lg-node { border-radius: var(--zen-node-radius) !important; }
html[${ATTR}] [data-testid="node-inner-wrapper"] { border-radius: var(--zen-node-radius) !important; }
html[${ATTR}] [data-testid="node-inner-wrapper"]::before { border-radius: inherit !important; }
html[${ATTR}] .lg-node > .pointer-events-none.absolute.border.border-solid.border-component-node-border { border-radius: var(--zen-node-radius) !important; }
html[${ATTR}] .lg-node-header {
  background: var(--node-component-header-surface, var(--component-node-background, var(--card))) !important;
  color: var(--node-component-slot-text, var(--foreground)) !important;
  border-color: var(--component-node-border, var(--border)) !important;
  border-radius: var(--zen-node-radius) var(--zen-node-radius) 0 0 !important;
}
html[${ATTR}] .lg-node > [data-testid^="node-body-"] {
  background: var(--component-node-background, var(--card, var(--background))) !important;
  border-radius: 0 0 var(--zen-node-radius) var(--zen-node-radius) !important;
}
/* Node bottom-edge elements hardcode their bottom radius — pin them to our node radius. */
html[${ATTR}] .lg-node .rounded-b-2xl,
html[${ATTR}] [data-testid="node-inner-wrapper"] .rounded-b-2xl,
html[${ATTR}] .lg-node .rounded-b-\\[20px\\],
html[${ATTR}] [data-testid="node-inner-wrapper"] .rounded-b-\\[20px\\],
html[${ATTR}] .lg-node .bg-destructive-background,
html[${ATTR}] [data-testid="node-inner-wrapper"] .bg-destructive-background {
  border-bottom-left-radius: var(--zen-node-radius) !important;
  border-bottom-right-radius: var(--zen-node-radius) !important;
}
/* A folded/collapsed node is header-only, so the header's bottom must round too. */
html[${ATTR}] .lg-node.collapsed .lg-node-header,
html[${ATTR}] .lg-node[data-collapsed="true"] .lg-node-header,
html[${ATTR}] .lg-node:not(:has([data-testid^="node-body-"])) .lg-node-header {
  border-radius: var(--zen-node-radius) !important;
}
html[${ATTR}] [data-testid="node-state-outline-overlay"] {
  border-color: var(--primary-background, var(--primary)) !important;
  border-radius: calc(var(--zen-node-radius) + 3px) !important;
}
html[${ATTR}] .text-node-component-slot-text,
html[${ATTR}] .node-title,
html[${ATTR}] .comfy-menu button,
html[${ATTR}] .comfy-menu label {
  color: var(--node-component-slot-text, var(--foreground)) !important;
}
html[${ATTR}] .p-button.p-button-primary,
html[${ATTR}] .p-splitbutton .p-button-primary {
  background: var(--p-button-primary-background, var(--primary-background, var(--primary))) !important;
  border-color: var(--p-button-primary-border-color, var(--primary-background, var(--primary))) !important;
  color: var(--p-button-primary-color, var(--primary-foreground, var(--foreground))) !important;
}
html[${ATTR}] .p-button.p-button-primary:hover,
html[${ATTR}] .p-splitbutton .p-button-primary:hover {
  background: var(--p-button-primary-hover-background, var(--primary-background-hover, var(--primary))) !important;
  border-color: var(--p-button-primary-hover-border-color, var(--primary-background-hover, var(--primary))) !important;
}
html[${ATTR}] .p-togglebutton,
html[${ATTR}] .p-togglebutton .p-togglebutton-content { color: var(--p-togglebutton-color, var(--foreground)) !important; }
html[${ATTR}] .p-togglebutton.p-togglebutton-checked,
html[${ATTR}] .p-togglebutton.p-togglebutton-checked:hover {
  background: var(--p-togglebutton-checked-background, var(--primary-background-hover, var(--accent, var(--primary)))) !important;
  border-color: var(--p-togglebutton-checked-border-color, var(--primary-background-hover, var(--accent, var(--primary)))) !important;
}
/* The checked toggle sits on the accent — its label AND icon must contrast THAT. */
html[${ATTR}] .p-togglebutton.p-togglebutton-checked,
html[${ATTR}] .p-togglebutton.p-togglebutton-checked * {
  color: var(--accent-foreground, var(--primary-foreground, var(--foreground))) !important;
  fill: var(--accent-foreground, var(--primary-foreground, var(--foreground))) !important;
}
html[${ATTR}] .p-inputtext,
html[${ATTR}] .p-select,
html[${ATTR}] .p-inputnumber-input {
  background: var(--p-form-field-background, var(--input-surface, var(--input))) !important;
  border-color: var(--p-form-field-border-color, var(--border)) !important;
  color: var(--p-form-field-color, var(--foreground)) !important;
}
/* Pin every Nodes-2.0 inline widget control (and its value text) to the readable node
   foreground the multiline textarea already uses, so values don't render ~white on a light
   theme. Field <label>s keep their muted colour, preserving the name/value hierarchy. */
html[${ATTR}] [data-testid^="widget-"],
html[${ATTR}] [data-testid^="widget-"] *,
html[${ATTR}] [data-testid$="-trigger"][role="combobox"],
html[${ATTR}] [data-testid$="-trigger"][role="combobox"] *,
html[${ATTR}] .lg-node input,
html[${ATTR}] .lg-node select,
html[${ATTR}] [data-testid="node-inner-wrapper"] input,
html[${ATTR}] [data-testid="node-inner-wrapper"] select {
  color: var(--component-node-foreground, var(--foreground)) !important;
}
html[${ATTR}] .litegraph-minimap { border-radius: var(--radius, 10px) !important; overflow: hidden !important; }
/* Pin PrimeVue / ComfyUI overlay menus to the theme radius (they keep a fixed one otherwise). */
html[${ATTR}] {
  --p-border-radius-md: var(--zen-radius, 10px);
  --p-border-radius-lg: var(--zen-radius, 10px);
  --p-border-radius-xl: var(--zen-radius, 10px);
}
html[${ATTR}] .p-tieredmenu,
html[${ATTR}] .p-tieredmenu-overlay,
html[${ATTR}] .p-menu,
html[${ATTR}] .p-menu-overlay,
html[${ATTR}] .p-contextmenu,
html[${ATTR}] .p-popover,
html[${ATTR}] .p-overlaypanel,
html[${ATTR}] .p-select-overlay,
html[${ATTR}] .p-autocomplete-overlay,
html[${ATTR}] .p-multiselect-overlay,
html[${ATTR}] .comfy-command-menu { border-radius: var(--zen-radius, 10px) !important; }
html[${ATTR}] [data-testid="queue-inline-progress"],
html[${ATTR}] [data-testid="queue-inline-progress"] * { border-radius: var(--zen-radius, 7px) !important; }
/* Replace the ComfyUI tree-row hover (bg-comfy-input, unreliable contrast) with a subtle tint. */
html[${ATTR}] [class~="group/tree-node"]:hover,
html[${ATTR}] .p-tree-node-content:hover,
html[${ATTR}] .p-tree-node-selectable:not(.p-tree-node-selected):hover {
  background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent) !important;
  color: var(--zen-text, var(--foreground)) !important;
}
/* Selected sidebar tab surface is a subtle elevation, not the accent — colour its icon+label
   with the accent (readable highlight), excluding the count badge so its number stays visible. */
html[${ATTR}] .side-bar-button-selected,
html[${ATTR}] .side-bar-button-selected *:not(.sidebar-icon-badge):not(.sidebar-icon-badge *) {
  color: var(--primary, var(--accent, var(--foreground))) !important;
}
/* A genuinely accent-FILLED highlight (PrimeVue p-highlight) does need contrast text. */
html[${ATTR}] .side-tool-bar-container .p-button.p-highlight,
html[${ATTR}] .side-tool-bar-container .p-button.p-highlight * {
  color: var(--primary-foreground, var(--foreground)) !important;
}
/* The drag-select marquee (Nodes 2.0) is a Tailwind blue box — recolour to the accent. */
html[${ATTR}] .z-9999.border-blue-400 {
  border-color: var(--zen-accent, var(--primary, #3b82f6)) !important;
  background: color-mix(in srgb, var(--zen-accent, var(--primary, #3b82f6)) 18%, transparent) !important;
  border-radius: var(--radius, 8px) !important;
}
/* Minimap viewport indicator (the "view cone") is white by default — use the accent. */
html[${ATTR}] .minimap-viewport {
  border-color: var(--zen-accent, var(--primary, #3b82f6)) !important;
  outline-color: var(--zen-accent, var(--primary, #3b82f6)) !important;
  background: color-mix(in srgb, var(--zen-accent, var(--primary, #3b82f6)) 14%, transparent) !important;
}
`;
function tokenCss(map) {
  let body = "";
  for (const k of Object.keys(map)) body += `${k}:${map[k]} !important;`;
  return `html[${ATTR}],body[${ATTR}]{${body}}`;
}
const REGION_SELECTORS = {
  sideToolbar: ".side-tool-bar-container",
  topBar: ".comfyui-body-top",
  bottomBar: ".comfyui-body-bottom",
  menuBar: ".comfy-menu",
  nodeHeader: ".lg-node-header",
  node: ".lg-node",
  minimap: ".litegraph-minimap"
};
function resolveAssetUrls(value, id) {
  return value.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (m, _q, ref2) => {
    const r = String(ref2).trim();
    if (!r || r.includes("/") || r.startsWith("data:") || r.startsWith("http")) return m;
    return `url('/nynxz/experimental/theme_asset?id=${encodeURIComponent(id)}&file=${encodeURIComponent(r)}')`;
  });
}
function buildRegionCss(pack) {
  if (!pack.regions) return "";
  let out = "";
  for (const [region, style] of Object.entries(pack.regions)) {
    const sel = REGION_SELECTORS[region];
    if (!sel) continue;
    let decls = "";
    for (const [prop, value] of Object.entries(style)) {
      decls += `${prop}:${resolveAssetUrls(value, pack.id)} !important;`;
    }
    if (decls) out += `html[${ATTR}="${pack.id}"] ${sel},body[${ATTR}="${pack.id}"] ${sel}{${decls}}`;
  }
  return out;
}
let bridgeReady = false;
const roots = () => [document.documentElement, document.body];
function applyTheme(id, mode) {
  if (!bridgeReady) {
    ensureStyle("nynxz-theme-bridge", BRIDGE_RULES);
    bridgeReady = true;
  }
  const pack = id === "comfy" ? null : registry.get(id);
  if (!pack) {
    ensureStyle("nynxz-theme-tokens", "");
    ensureStyle("nynxz-theme-css", "");
    ensureStyle("nynxz-theme-regions", "");
    for (const el of roots()) el.removeAttribute(ATTR);
    return;
  }
  const resolved = resolveThemeTokens(pack, mode);
  const r = resolved["--radius"];
  ensureStyle(
    "nynxz-theme-tokens",
    tokenCss({ ...jobProgressDefaults(resolved), ...resolved, ...zenDerived(resolved), ...r ? radiusScale(r) : {} })
  );
  ensureStyle("nynxz-theme-css", pack.css || "");
  ensureStyle("nynxz-theme-regions", buildRegionCss(pack));
  for (const el of roots()) el.setAttribute(ATTR, id);
}
async function fetchThemes() {
  try {
    const res = await fetch("/nynxz/experimental/themes");
    const d = await res.json();
    return Array.isArray(d.themes) ? d.themes : [];
  } catch {
    return [];
  }
}
const SETTING_ID = "nynxz.experimental.theme";
let currentId = "comfy";
function currentMode() {
  return document.body.classList.contains("dark-theme") ? "dark" : "light";
}
function setTheme(id) {
  currentId = id;
  applyTheme(id, currentMode());
}
function watchMode() {
  let mode = currentMode();
  const obs = new MutationObserver(() => {
    const next = currentMode();
    if (next === mode) return;
    mode = next;
    if (currentId !== "comfy") applyTheme(currentId, next);
  });
  obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
}
function registerTheme() {
  app.registerExtension({
    name: "nynxz.experimental.theme",
    async setup() {
      registerPacks(await fetchThemes());
      const options = [
        { text: "Comfy (default)", value: "comfy" },
        ...themePacks().map((p2) => ({ text: p2.name, value: p2.id }))
      ];
      let initial = "comfy";
      try {
        const settings = app.ui?.settings;
        const added = settings?.addSetting({
          id: SETTING_ID,
          name: "Theme",
          category: ["Nynxz Experimental", "Appearance", "Theme"],
          type: "combo",
          options,
          defaultValue: "comfy",
          tooltip: `Recolour the whole ComfyUI interface from a theme pack. "Comfy (default)" leaves ComfyUI's own theme untouched. Themes are JSON files in this pack's themes/ folder, discovered at load — drop one in and reload to add it.`,
          onChange(value) {
            setTheme(String(value || "comfy"));
          }
        });
        if (added && added.value != null) initial = String(added.value);
      } catch {
      }
      try {
        const stored = app.extensionManager?.setting?.get(SETTING_ID);
        if (stored != null) initial = String(stored);
      } catch {
      }
      setTheme(initial);
      watchMode();
    }
  });
}
registerNodes("nynxz.experimental", [...fusionNodes, loraNode]);
registerBackground();
registerTheme();
