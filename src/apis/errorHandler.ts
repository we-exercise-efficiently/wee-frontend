export default async function errorHandler(apis: Function) {
  try {
    const response = await apis();
    if (response?.status === 200) {
      // status -- 200
      return response;
    }
  } catch (error) {
    throw new Error("에러 발생");
  } finally {
  }
}
