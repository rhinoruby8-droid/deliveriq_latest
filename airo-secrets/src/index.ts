export function getSecret(name: string): string | undefined {
  return process.env[name];
}
