# vedoy-calender-ui

Framework-free UI for `vedoy-calender`: en gjengivbar kalenderliste og møteform som er kompatibel med `CalendarEvent` i kalenderkjernen.

```js
import "vedoy-calender-ui/styles.css";
import { createCalendarView, createMeetingForm } from "vedoy-calender-ui";
```

Use `createMeetingForm` to collect meeting details, then add the returned event to a `VedoyCalendar` instance from `vedoy-calender`. UI-et støtter tittel, start/slutt, sted, deltakere, videolenke, påminnelse og gjentakelse.

## Hvorfor egen UI-pakke?

`vedoy-calender` er kjernelogikken: hendelser, filtrering, sammenslåing og ICS-eksport. Den inneholder ingen CSS eller skjermkomponenter.

`vedoy-calender-ui` er det visuelle laget: ferdig CSS, kalenderliste og møteform. Den returnerer en `CalendarUiEvent` med samme avtalefelter som `CalendarEvent`, slik at resultatet kan sendes direkte til kalenderkjernen. Dette lar utviklere bruke sin egen designløsning med kjernen, eller installere UI-pakken for å komme raskt i gang.

## Vedøy Login i demoen

Den publiserte demoen kan bruke samme e-postkontoer som **Vedøy Login** via Supabase Auth. Innloggingsvinduet lar brukeren logge inn, registrere en konto og logge ut. Passord håndteres av Supabase Auth og sendes aldri til dette Git-repositoryet.

Legg disse miljøvariablene inn i Vercel for `vedoy-calender-ui`:

```text
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`NEXT_PUBLIC_SUPABASE_URL` og `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` støttes også, slik at samme Vercel-oppsett kan brukes i frontend-prosjekter.

Bruk bare Supabase sin publishable/anon-nøkkel her – aldri service-role-nøkkelen. Legg også `https://vedoy-calender-ui.vercel.app/` inn under **Authentication → URL Configuration → Redirect URLs** i Supabase. Ved e-postbekreftelse kommer brukeren tilbake til Calendar UI etter bekreftelsen.

Innlogging beskytter opprettelse av nye avtaler i demoen. Personlige avtaler lagres i `public.vedoy_calendar_events`. Tabellen har RLS: en innlogget bruker kan bare lese, opprette, endre og slette rader der `user_id` er deres egen Supabase-bruker. Det finnes ingen service-nøkkel i nettleseren.

Migrasjonen ligger i `supabase/migrations/202609010001_create_vedoy_calendar_events.sql`. Den må brukes i samme Supabase-prosjekt som Vedøy Login.

## Publisering til GitHub

Pakken skal ligge i et eget repository: `https://github.com/leandervedoy/vedoy-calender-ui`.

Etter at et tomt GitHub-repository er opprettet, publiseres den lokale pakken slik:

```bash
git remote add origin https://github.com/leandervedoy/vedoy-calender-ui.git
git branch -M main
git push -u origin main
```

`node_modules` skal aldri publiseres. Det er allerede ekskludert i `.gitignore`.

## npm senere

Når pakken er klar for npm, kjør `npm test`, kontroller innholdet med `npm pack --dry-run`, og publiser med `npm publish --access public`. Velg et navn som er ledig i npm-registeret før publisering.
