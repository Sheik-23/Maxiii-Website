export class RE2JS {
  constructor(pattern) {
    this.regex = new RegExp(pattern);
  }
  static compile(pattern) {
    return new RE2JS(pattern);
  }
  matches(str) {
    return this.regex.test(str);
  }
  test(str) {
    return this.regex.test(str);
  }
}

export default { RE2JS };
