export class api {

  static _url: string = "https://issy.edgar-lecomte.fr";

  static async getDatasets() {
    const res = await fetch(`${this._url}/dataset`);
    return await res.json();
  }

  static async getDatasetKey(id: string) {
    const res = await fetch(`${this._url}/dataset/key/value?id=${id}`);
    return await res.json();
  }

  static async saveDataset(url: string, name: string, key1: string, key2: string) {
    const res = await fetch(`${this._url}/dataset/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url, name, key1, key2})
    });
    return await res.json();
  }
}
