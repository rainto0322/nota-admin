// @/composables/useCue.ts
type CueInput = Omit<Cue, 'id' | 'mode'>

interface Cue {
  id: string;
  title: string;
  mode?: 'info' | 'done' | 'warn' | 'error';
  icon?: string;
  msg?: string;
};

export const useCue = () => {
  const cues = useState<Cue[]>('cues', () => []);
  const max = 5;

  const add = (params: Omit<Cue, 'id'>) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    cues.value.push({
      id,
      mode: params.mode || "info",
      ...params,
    });

    if (cues.value.length > max) cues.value.shift();

    setTimeout(() => {
      remove(id)
    }, 2000);

  };


  const createCue = (mode: Cue['mode'], icon: string) => (params: CueInput) =>
    add({ icon, mode, ...params });

  const remove = (id: string) => {
    cues.value = cues.value.filter(cue => cue.id !== id);
  }

  return {
    cues,
    add,
    done: createCue('done', '/img/done.svg'),
    warn: createCue('warn', '/img/warn.svg'),
    error: createCue('error', '/img/error.svg'),
    remove,
    clear: () => cues.value = [],
  }
}