export function getRandomFromGenericArray<Type>(arr: Type[]): Type {
  return arr[Math.floor(Math.random() * arr.length)];
}
