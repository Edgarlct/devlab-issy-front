export class LinkGenerator {
    static generateLink(dataset: {id: string, firstKey: string, secondKey: string}, filter: Array<string|null>) {
      let link = `https://data.issy.com/explore/dataset/${dataset.id}/map/?disjunctive.${dataset.firstKey}&sort=-${dataset.firstKey}&refine.${dataset.firstKey}=${filter[0]}`;
      if (dataset.secondKey) {
        link += `&disjunctive.${dataset.secondKey}`;
        if (filter[1]) {
          link += `&refine.${dataset.secondKey}=${filter[1]}`;
        }
      }

      return link;
    }
}
