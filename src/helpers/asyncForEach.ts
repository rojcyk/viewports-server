export default async (
  array: any[],
  callback: any,
): Promise<void> => {
  if (array) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
}
