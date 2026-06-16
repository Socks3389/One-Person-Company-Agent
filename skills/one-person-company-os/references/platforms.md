# Platforms

Select platform strategy from product needs, distribution channel, device capabilities, and maintenance cost.

## Web Site / Web App

- Best for: fastest distribution, SEO, SaaS, dashboards, public content, admin systems.
- Common stack: Next.js, Laravel, Django, Spring Boot + frontend, or static site plus API.
- Must handle: responsive layout, accessibility, SEO where public, loading/error/empty states, auth/session, browser compatibility.
- Verify: desktop/mobile viewport, keyboard navigation for core flows, forms, API errors, build output.

## WeChat Mini Program

- Best for: China-market lightweight apps, social sharing, local services, commerce, bookings, member systems.
- Common stack: native WeChat Mini Program, Taro/uni-app when cross-platform reuse matters.
- Must handle: WeChat login, permissions, package size, payment, sharing, review requirements, mini program lifecycle, API domain configuration.
- Verify: real device preview when possible, auth/session flow, payment sandbox if used, network failures, page lifecycle state.

## Mobile App

- Best for: push notifications, device sensors, offline behavior, premium UX, app store distribution.
- Common stack: React Native, Flutter, native Swift/Kotlin, or Kotlin Multiplatform when justified.
- Must handle: navigation, offline/cache, permissions, push, deep links, app store review, crash reporting, upgrade compatibility.
- Verify: device matrix, slow network, permission denial, background/foreground, install/upgrade path.

## PC / Desktop App

- Best for: local file access, desktop workflows, native integrations, offline-first tools, developer utilities.
- Common stack: Tauri, Electron, Qt, JavaFX, .NET, or native platform stack depending on constraints.
- Must handle: installer/update, local storage, file permissions, OS differences, crash reporting, signing/notarization where needed.
- Verify: clean install, update, uninstall, offline behavior, file permissions, Windows/macOS/Linux target behavior.

## Admin / Back Office

- Best for: operations, moderation, finance, customer support, content management.
- Common stack: framework admin panel, React/Vue dashboard, Laravel Nova/Filament, Django Admin, custom internal app.
- Must handle: RBAC, audit logs, bulk actions, export/import, safe destructive actions, search/filtering, data privacy.
- Verify: permission boundaries, audit trail, pagination/filtering, destructive action confirmation, export limits.

## UI/UX Defaults

- Match visual language to domain and audience.
- Use real product/place/state imagery for public sites when imagery matters.
- Keep operational tools dense, calm, and scan-friendly.
- Include states for loading, empty, error, disabled, success, validation, permission denied, and offline where relevant.
- Avoid one-note palettes, decorative clutter, and text that explains how to use obvious controls.
