export type ContentType =
  | "reports"
  | "faqs"
  | "gallery"
  | "team"
  | "careers"
  | "circulars"
  | "initiatives"
  | "coi"
  | "facilities"
  | "news"
  | "events"
  | "applications"
  | "contact"
  | "programs"
  | "startups";

export function getAll<T = any>(type: ContentType): T[] {
  const raw = localStorage.getItem(`content:${type}`);
  return raw ? JSON.parse(raw) : [];
}

export function saveOne<T = any>(type: ContentType, item: T) {
  const items = getAll<T>(type);
  items.push(item);
  localStorage.setItem(`content:${type}`, JSON.stringify(items));
}

export function deleteOne<T = any>(type: ContentType, index: number) {
  const items = getAll<T>(type);
  items.splice(index, 1);
  localStorage.setItem(`content:${type}`, JSON.stringify(items));
}

export function clearType(type: ContentType) {
  localStorage.removeItem(`content:${type}`);
}
