export class LinkGenerator {
    static generateLink(dataset: {id: string, name: string, firstKey: string, secondKey: string}, filter: Array<string|null>) {
      //https://data.issy.com/explore/embed/dataset/touslescommercesdissy-les-moulineaux-feuille1/table/?disjunctive.categorie&disjunctive.type&sort=-type&refine.categorie=Alimentation&refine.type=Vins%20et
      let link = `https://data.issy.com/explore/dataset/${dataset.id}/table/?disjunctive.${dataset.firstKey}&sort=-${dataset.firstKey}&refine.${dataset.firstKey}=${filter[0]}`;
      if (dataset.secondKey) {
        link += `&disjunctive.${dataset.secondKey}`;
        if (filter[1]) {
          link += `&refine.${dataset.secondKey}=${filter[1]}`;
        }
      }

      return link;
    }
}
