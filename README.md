# vedoy-calender-ui

Framework-free UI for `vedoy-calender`: a rendered event list, meeting form, attendees, video links and reminder selection.

```js
import "vedoy-calender-ui/styles.css";
import { createCalendarView, createMeetingForm } from "vedoy-calender-ui";
```

Use `createMeetingForm` to collect meeting details, then add the returned event to a `VedoyCalendar` instance from `vedoy-calender`.

## Hvorfor egen UI-pakke?

`vedoy-calender` er kjernelogikken: hendelser, filtrering, sammenslåing og ICS-eksport. Den inneholder ingen CSS eller skjermkomponenter.

`vedoy-calender-ui` er det visuelle laget: ferdig CSS, kalenderliste og møteform med deltakere, videolenke og påminnelsesvalg. Dette lar utviklere bruke sin egen designløsning med kjernen, eller installere UI-pakken for å komme raskt i gang.

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
