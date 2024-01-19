export class api {

  static _url: string = "http://localhost:9001";

  static async getDatasets() {
    const res = await fetch(`${this._url}/dataset`);
    return await res.json();
  }

  static async getDatasetKey(id: string) {
    const res = await fetch(`${this._url}/dataset/key/value?id=${id}`);
    return await res.json();
  }
}
