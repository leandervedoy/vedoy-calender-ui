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
export declare function createCalendarView(events: CalendarUiEvent[]): HTMLElement;
export declare function createMeetingForm(onSave: (event: CalendarUiEvent) => void): HTMLFormElement;
//# sourceMappingURL=index.d.ts.map