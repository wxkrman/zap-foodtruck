# ZAP Foodtruck – hemsidan

## Filerna
- `index.html` – själva sidan (behöver inte ändras)
- `content.json` – **ALLT innehåll** (fältet `veg`: true = vegetariskt, visas grönt; false = kött, visas rosa/rött): meny, priser, schema, event, "Här står vi idag", texter
- `admin.html` – enkel redigerare för content.json
- `img/` – bilder · `videos/` – lägg videorna här
- `style.css`, `app.js` – design och logik (rör inte om du inte vill)

## Ändra meny, schema m.m. (enklaste sättet)
1. Öppna `admin.html` på den publicerade sidan (t.ex. `https://er-sida.netlify.app/admin.html`).
2. Ändra i fälten – t.ex. ny vecka, nya rätter, priser, dagens plats. Lämna pris tomt så visas inget pris.
3. Klicka **Ladda ner content.json**.
4. Byt ut den gamla `content.json` i sajtmappen mot den nya och ladda upp mappen igen (se Publicera nedan).

Du kan också öppna `content.json` i Anteckningar och ändra texten mellan citattecknen direkt. Var noga med att inte ta bort `"`, `,`, `{ }` eller `[ ]`.

**Nya bilder:** lägg bildfilen i `img/` och skriv filnamnet i fältet "bild" (eller i Galleri-listan).

## Lägga in videor (Higgsfield / ChatGPT / Sora)
- Välkomstscenen: spara som `videos/intro.mp4`
- Toppbilden (hero): spara som `videos/hero.mp4`
- Tips: MP4 (H.264), 1920×1080 eller stående 1080×1920, 5–15 sek som loopar snyggt, **utan ljud**, helst under 5–8 MB.
- Finns ingen video visas en snygg reservbild + neonanimation automatiskt.

## Publicera gratis
**Netlify Drop (enklast):** gå till https://app.netlify.com/drop, skapa gratis konto, dra hela sajtmappen in i rutan. Klart. För att uppdatera: dra in mappen igen under "Deploys" på samma sajt. Egen domän kan kopplas under "Domain settings".

**GitHub Pages:** skapa ett repo på github.com, ladda upp alla filer (Add file → Upload files), gå till Settings → Pages → välj branch `main` → Save. Sidan hamnar på `https://användarnamn.github.io/repo-namn/`. Uppdatera content.json genom att ladda upp den nya filen i repot.

Obs: sidan läser `content.json` via webben, så att dubbelklicka på `index.html` lokalt visar en tom sida i vissa webbläsare – den behöver ligga på en webbserver (Netlify/GitHub) eller köras med `python -m http.server`.
