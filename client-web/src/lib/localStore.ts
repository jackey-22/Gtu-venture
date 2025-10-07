export function saveItem<T>(key: string, item: T) {
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) as T[] : [];
  arr.push(item as unknown as T);
  localStorage.setItem(key, JSON.stringify(arr));
}

export function getItems<T>(key: string): T[] {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T[]) : [];
}
