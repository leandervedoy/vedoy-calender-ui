export type CalendarUiEvent = {
    id: string;
    title: string;
    startsAt: string;
    endsAt: string;
    source?: string;
    attendees?: string[];
    reminderMinutes?: number;
    meetingUrl?: string;
};
export declare function createCalendarView(events: CalendarUiEvent[]): HTMLElement;
export declare function createMeetingForm(onSave: (event: CalendarUiEvent) => void): HTMLFormElement;
//# sourceMappingURL=index.d.ts.map