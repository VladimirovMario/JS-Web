function tickets(params: string[], sortCriteria: string) {
  class Tickets {
    constructor(
      public destination: string,
      public price: string | number,
      public status: string
    ) {}
  }

  const destinations = [];

  for (const item of params) {
    let [destination, price, status] = item.split("|");

    destinations.push(new Tickets(destination, Number(price), status));
  }
  //TODO sort it by the given criteria
  return destinations;
}

console.log(
  tickets(
    [
      "Philadelphia|94.20|available",
      "New York City|95.99|available",
      "New York City|95.99|sold",
      "Boston|126.20|departed",
    ],
    "destination"
  )
);
// return arr.sort((a, b) => {
//     if (typeof a[sortCriterion] == `number`) {
//       return a[sortCriterion] - b[sortCriterion];
//     } else {
//       return a[sortCriterion].localeCompare(b[sortCriterion]);
//     }
//   });