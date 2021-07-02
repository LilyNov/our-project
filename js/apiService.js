export default async function apiFetch(BASE_URL) {
  const response = await fetch(BASE_URL);
  return response.json();
}
