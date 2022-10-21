function isInViewport(element) {
  if (element) {
    const rect = element.getBoundingClientRect();

    return (
      rect.left <= window.innerWidth || document.documentElement.clientWidth
    );
  }
}

function refineData(data) {
  //derepeatize
  // let newCollection = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (data[i] && data[j])
        if (data[i].subkey === data[j].subkey) {
          data.splice(j, 1);
        }
    }

    if (data[i]) {
      let dateInMili = data[i].date;
      let formattedDate = new Date(dateInMili).toLocaleString("en-US");
      data[i].date = formattedDate;
    }
  }
}
