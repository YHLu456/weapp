
/**
 * 验证手机号是否合法
 * @param phone 手机号
 * @returns 
 */
function isPhoneAvailable(phone: string) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
}

/**
 * 验证验证码是否合法 4位数字
 * @param code 验证码
 * @returns 
 */
function isCodeAvailable(code: string) {
  const reg = /^\d{4}$/;
  return reg.test(code);
}
export { isPhoneAvailable, isCodeAvailable };