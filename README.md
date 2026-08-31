# vedoy-calender-ui

Framework-free UI for `vedoy-calender`: a rendered event list, meeting form, attendees, video links and reminder selection.

```js
import "vedoy-calender-ui/styles.css";
import { createCalendarView, createMeetingForm } from "vedoy-calender-ui";
```

Use `createMeetingForm` to collect meeting details, then add the returned event to a `VedoyCalendar` instance from `vedoy-calender`.
