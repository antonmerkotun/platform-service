export class ObjectUtils {
  static toBase64<T>(data: T): string {
    const asString = JSON.stringify(data);

    return Buffer.from(asString).toString('base64');
  }

  static fromBase64(data: string) {
    const asString = Buffer.from(data, 'base64').toString();

    return JSON.parse(asString);
  }
}
