# Claude Code Skills - Praxisguide

## Uebersicht: Welche Skills sind wofuer sinnvoll?

---

## 1. Code schreiben & entwickeln

### Direkt verfuegbar (eingebaut)
- **Code generieren** - Claude schreibt Code in jeder gaengigen Sprache (JavaScript, TypeScript, Python, PHP, HTML/CSS, etc.)
- **Debugging** - Fehler finden und beheben
- **Refactoring** - Code verbessern und optimieren
- **Tests schreiben** - Unit-Tests, Integration-Tests

### Nuetzliche Skills
| Skill | Wofuer | Aufruf |
|-------|--------|--------|
| `/simplify` | Code auf Qualitaet, Wiederverwendung und Effizienz pruefen | Nach Code-Aenderungen ausfuehren |
| `/claude-api` | Apps mit der Claude API bauen (AI-Features einbauen) | Wenn du AI-Funktionen in deine App integrieren willst |
| `/session-start-hook` | Automatisches Setup fuer Tests & Linter | Einmal einrichten, laeuft dann automatisch |
| `/update-config` | Claude Code Verhalten konfigurieren (Hooks, Settings) | Fuer wiederkehrende Automatisierungen |
| `/loop` | Wiederkehrende Aufgaben ausfuehren (z.B. Build-Status pruefen) | `/loop 5m /simplify` |

---

## 2. Websites bauen

### Was Claude Code direkt kann
- **HTML/CSS/JS** von Grund auf erstellen
- **React, Next.js, Vue, Svelte** Projekte aufsetzen und entwickeln
- **Responsive Design** umsetzen
- **Tailwind CSS** konfigurieren und nutzen
- **SEO-Optimierung** einbauen
- **Accessibility** sicherstellen

### Empfohlener Workflow
```
1. Projekt-Setup:     "Erstelle ein Next.js Projekt mit Tailwind CSS"
2. Seitenstruktur:    "Erstelle Header, Footer, Navigation"
3. Einzelne Seiten:   "Baue die Startseite mit Hero-Section und Features"
4. Qualitaet:         /simplify  (prueft den Code)
5. Deployment:        "Konfiguriere fuer Vercel/Netlify"
```

---

## 3. Webshops bauen

### Was Claude Code direkt kann
- **Shopify Theme-Entwicklung** (Liquid Templates)
- **WooCommerce** Anpassungen (PHP/WordPress)
- **Custom Shops** mit Next.js + Stripe/PayPal
- **Medusa.js / Saleor** (Open-Source E-Commerce)
- **Produkt-Datenbanken** aufsetzen
- **Warenkorb-Logik** implementieren
- **Checkout & Payment-Integration** (Stripe, PayPal, Klarna)

### Empfohlener Stack fuer einen modernen Webshop
```
Frontend:   Next.js + Tailwind CSS
Backend:    Next.js API Routes oder Medusa.js
Payments:   Stripe (einfachste Integration)
Datenbank:  PostgreSQL oder Supabase
Hosting:    Vercel
```

---

## 4. Bilder erstellen

### Wichtig zu wissen
Claude Code kann **keine Bilder generieren** (kein DALL-E, kein Midjourney).

### Was Claude Code stattdessen kann
| Aufgabe | Wie |
|---------|-----|
| **SVG-Grafiken** erstellen | Logos, Icons, einfache Illustrationen als Code |
| **CSS-Grafiken** | Dekorative Elemente, Animationen, Gradienten |
| **Placeholder-Bilder** einbinden | Unsplash, Pexels API-Integration |
| **Image-Optimierung** | Sharp/ImageMagick Konfiguration |
| **Canvas-Grafiken** | Charts, Diagramme mit Chart.js oder D3.js |
| **ASCII-Art / Unicode-Art** | Einfache Text-basierte Grafiken |
| **Bild-Upload-Systeme** | Cloudinary, S3, Supabase Storage Integration |

### Fuer echte Bildgenerierung
Empfehlung: Claude API mit Tool-Use + externe Bild-APIs kombinieren:
- Replicate API (Stable Diffusion, Flux)
- OpenAI DALL-E API
- Midjourney (ueber Discord-Bot)

---

## 5. Weitere nuetzliche Faehigkeiten

### Datenbanken
- Schema-Design, Migrationen, Queries (SQL, Prisma, Drizzle)

### API-Entwicklung
- REST-APIs, GraphQL, tRPC

### DevOps & Deployment
- Docker-Konfiguration, CI/CD Pipelines, GitHub Actions

### Content & SEO
- Meta-Tags, Structured Data, Sitemap-Generierung

### Authentifizierung
- NextAuth, Clerk, Supabase Auth Integration

---

## 6. Tipps fuer beste Ergebnisse

1. **Sei spezifisch** - "Erstelle eine Produktseite mit Bildergalerie, Preis, Warenkorb-Button und Bewertungen" statt "Mach eine Shopseite"
2. **Iterativ arbeiten** - Lieber Schritt fuer Schritt als alles auf einmal
3. **`/simplify` nutzen** - Nach groesseren Code-Aenderungen ausfuehren
4. **Referenzen nennen** - "Wie bei Shopify" oder "Aehnlich wie Amazon" hilft Claude den Stil zu verstehen
5. **Screenshots zeigen** - Claude kann Bilder analysieren und nachbauen
