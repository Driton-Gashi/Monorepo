// Function to fetch in Development and Production
export const apiHandler = (path: string): string => {
  let fetchPath = process.env.NEXT_PUBLIC_API_URL ?? "";
  fetchPath += path;
  return fetchPath;
};
