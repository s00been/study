export function setItem(key, value) {
  localStorage.setItem('key', JSON.stringify(value));
}

export function getItem(key) {
  return localStorage.getItem('key');
}
