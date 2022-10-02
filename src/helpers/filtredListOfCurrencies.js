import { useStore } from 'vuex'

export default (search) => {
  const { listOfCurrencies } = useStore().getters
      return listOfCurrencies.filter(
        (c) =>
          c["Name"].toLowerCase().match(search.toLowerCase()) ||
          c["CharCode"].toLowerCase().match(search.toLowerCase())
      );
}