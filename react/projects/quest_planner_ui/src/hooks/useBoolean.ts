import { useCallback, useState } from 'react';

export const useBoolean = (
  initialValue = false
): [boolean, { on: () => void; off: () => void; toggle: () => void }] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  return [value, { toggle, on, off }];
};
