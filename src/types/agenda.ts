export interface AgendaTopic {
  name: string;
  duration: string;
}

export interface Agenda {
  opening: string;
  topics: AgendaTopic[];
  wrapUp: string;
}
