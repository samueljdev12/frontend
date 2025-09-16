import { useReducer } from 'react';
import { Agenda } from '@/types/agenda';

export type ViewMode = 'empty' | 'template' | 'editor' | 'preview';

type SavedMeta = { id: string; shareToken: string } | null;

type State = {
  viewMode: ViewMode;
  agenda: Agenda | null;
  meetingTitle: string;
  saved: SavedMeta;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
};

type Action =
  | { type: 'OPEN_TEMPLATES' }
  | { type: 'SELECT_TEMPLATE'; agenda: Agenda; meetingTitle: string }
  | { type: 'GENERATE_START'; meetingTitle: string }
  | { type: 'GENERATE_SUCCESS'; agenda: Agenda }
  | { type: 'GENERATE_ERROR'; error: string }
  | { type: 'UPDATE_AGENDA'; agenda: Agenda }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS'; saved: NonNullable<SavedMeta> }
  | { type: 'SAVE_ERROR'; error: string }
  | { type: 'LOAD_SHARED_START' }
  | { type: 'LOAD_SHARED_SUCCESS'; agenda: Agenda; meetingTitle: string; saved: NonNullable<SavedMeta> }
  | { type: 'LOAD_SHARED_ERROR'; error: string }
  | { type: 'EDIT_FROM_PREVIEW' }
  | { type: 'RESET_HOME' };

const initialState: State = {
  viewMode: 'empty',
  agenda: null,
  meetingTitle: '',
  saved: null,
  isLoading: false,
  isSaving: false,
  error: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_TEMPLATES':
      return { ...state, viewMode: 'template', error: '' };
    case 'SELECT_TEMPLATE':
      return {
        ...state,
        viewMode: 'editor',
        agenda: { opening: action.agenda.opening, topics: action.agenda.topics.map(t => ({ ...t })), wrapUp: action.agenda.wrapUp },
        meetingTitle: action.meetingTitle,
        saved: null,
        error: '',
      };
    case 'GENERATE_START':
      return { ...state, isLoading: true, error: '', meetingTitle: action.meetingTitle, saved: null, viewMode: 'editor', agenda: null };
    case 'GENERATE_SUCCESS':
      return { ...state, isLoading: false, agenda: action.agenda, viewMode: 'editor' };
    case 'GENERATE_ERROR':
      return { ...state, isLoading: false, error: action.error, agenda: null, viewMode: 'empty' };
    case 'UPDATE_AGENDA':
      return { ...state, agenda: action.agenda };
    case 'SAVE_START':
      return { ...state, isSaving: true, error: '' };
    case 'SAVE_SUCCESS':
      return { ...state, isSaving: false, saved: action.saved, viewMode: 'preview' };
    case 'SAVE_ERROR':
      return { ...state, isSaving: false, error: action.error };
    case 'LOAD_SHARED_START':
      return { ...state, isLoading: true, error: '' };
    case 'LOAD_SHARED_SUCCESS':
      return { ...state, isLoading: false, agenda: action.agenda, meetingTitle: action.meetingTitle, saved: action.saved, viewMode: 'preview' };
    case 'LOAD_SHARED_ERROR':
      return { ...state, isLoading: false, error: action.error };
    case 'EDIT_FROM_PREVIEW':
      return { ...state, viewMode: 'editor' };
    case 'RESET_HOME':
      return { ...initialState };
    default:
      return state;
  }
}

export function useAgendaController() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}


