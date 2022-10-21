let searchBar = document.querySelector(`.searchbar`);
let searchToken = "";

searchBar.addEventListener("input", () => {
  searchToken = searchBar.value;
});

function itemPopulator(collection, searchKeyref) {
  let items = "";

  for (let i = 0; i < collection.length; i++) {
    let tags = "";
    let flagKeys = [];

    for (let j = 0; j < collection[i].tags.length; j++) {
      let currentTag = collection[i].tags[j];
      let asciiForm = asciiFy(currentTag);

      if (asciiFormCollection.length > 0) {
        if (
          BINARYSEARCH(
            asciiFormCollection,
            0,
            asciiFormCollection.length - 1,
            asciiForm
          )[0]
        )
          flagKeys.push(1);
      } else flagKeys.push(1);
      tags += tagProp(currentTag);
    }
    let flagKeySum = flagKeys.reduce((partialSum, a) => partialSum + a, 0);
    let matches = matchKey(searchKeyref, i);

    if (matches) {
      if (asciiFormCollection.length < 2) {
        if (flagKeySum > 0) {
          items += itemProp(tags, collection[i].name, collection[i].desc);
        }
      } else {
        if (flagKeySum === asciiFormCollection.length)
          items += itemProp(tags, collection[i].name, collection[i].desc);
      }
    }
  }

  itemContainer.innerHTML = items;
}
