export default function(name) {
      return this.listOfCurrencies().filter(
        (c) =>
          c["Name"].toLowerCase().match(this[name].toLowerCase()) ||
          c["CharCode"].toLowerCase().match(this[name].toLowerCase())
      );
}