export function createCalendarView(events) {
    const root = document.createElement("section");
    root.className = "vedoy-calendar-ui";
    const sorted = [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
    root.innerHTML = `<header><strong>Kalender</strong><span>${sorted.length} hendelser</span></header><ol>${sorted.map((event) => `<li><time>${new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.startsAt))}</time><div><strong>${event.title}</strong><small>${event.attendees?.length ?? 0} deltakere · Påminnelse ${event.reminderMinutes ?? 15} min</small></div></li>`).join("")}</ol>`;
    return root;
}
export function createMeetingForm(onSave) {
    const form = document.createElement("form");
    form.className = "vedoy-meeting-form";
    form.innerHTML = `<label>Tittel<input name="title" required></label><label>Start<input name="startsAt" type="datetime-local" required></label><label>Slutt<input name="endsAt" type="datetime-local" required></label><label>Deltakere<input name="attendees" placeholder="epost@firma.no, ..."></label><label>Videolenke<input name="meetingUrl" type="url"></label><label>Påminnelse<select name="reminderMinutes"><option value="15">15 min</option><option value="30">30 min</option><option value="60">1 time</option></select></label><button>Lagre møte</button>`;
    form.addEventListener("submit", (event) => { event.preventDefault(); const data = new FormData(form); onSave({ id: crypto.randomUUID(), title: String(data.get("title")), startsAt: new Date(String(data.get("startsAt"))).toISOString(), endsAt: new Date(String(data.get("endsAt"))).toISOString(), attendees: String(data.get("attendees")).split(",").map((value) => value.trim()).filter(Boolean), meetingUrl: String(data.get("meetingUrl")) || undefined, reminderMinutes: Number(data.get("reminderMinutes")), source: "manual" }); form.reset(); });
    return form;
}
//# sourceMappingURL=index.js.map