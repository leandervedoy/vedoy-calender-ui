export type CalendarUiEvent = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  notes?: string;
  location?: string;
  attendees?: string[];
  meetingUrl?: string;
  reminderMinutes?: number;
  recurrence?: "none" | "daily" | "weekly" | "monthly" | "yearly";
  source?: "vedoy" | "google" | "microsoft" | "apple" | "manual";
  color?: string;
  allDay?: boolean;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export function createCalendarView(events: CalendarUiEvent[]) {
  const root = document.createElement("section");
  root.className = "vedoy-calendar-ui";
  const sorted = [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  root.innerHTML = `<header><strong>Kalender</strong><span>${sorted.length} hendelser</span></header><ol>${sorted.map((event) => `<li><time>${new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.startsAt))}</time><div><strong>${escapeHtml(event.title)}</strong><small>${event.attendees?.length ?? 0} deltakere · Påminnelse ${event.reminderMinutes ?? 15} min${event.recurrence && event.recurrence !== "none" ? ` · ${event.recurrence}` : ""}</small></div></li>`).join("")}</ol>`;
  return root;
}

export function createMeetingForm(onSave: (event: CalendarUiEvent) => void) {
  const form = document.createElement("form");
  form.className = "vedoy-meeting-form";
  form.innerHTML = `<label>Tittel<input name="title" required></label><label>Start<input name="startsAt" type="datetime-local" required></label><label>Slutt<input name="endsAt" type="datetime-local" required></label><label>Deltakere<input name="attendees" placeholder="epost@firma.no, ..."></label><label>Sted<input name="location" placeholder="Vedøy Studio"></label><label>Videolenke<input name="meetingUrl" type="url"></label><label>Påminnelse<select name="reminderMinutes"><option value="0">Ingen</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">1 time</option></select></label><label>Gjenta<select name="recurrence"><option value="none">Ikke gjenta</option><option value="daily">Daglig</option><option value="weekly">Ukentlig</option><option value="monthly">Månedlig</option><option value="yearly">Årlig</option></select></label><button>Lagre møte</button>`;
  form.addEventListener("submit", (event) => { event.preventDefault(); const data = new FormData(form); onSave({ id: crypto.randomUUID(), title: String(data.get("title")), startsAt: new Date(String(data.get("startsAt"))).toISOString(), endsAt: new Date(String(data.get("endsAt"))).toISOString(), attendees: String(data.get("attendees")).split(",").map((value) => value.trim()).filter(Boolean), location: String(data.get("location")) || undefined, meetingUrl: String(data.get("meetingUrl")) || undefined, reminderMinutes: Number(data.get("reminderMinutes")), recurrence: data.get("recurrence") as CalendarUiEvent["recurrence"], source: "manual" }); form.reset(); });
  return form;
}
