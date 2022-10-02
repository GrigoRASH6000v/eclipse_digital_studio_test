import { useStore } from 'vuex'

export default (id) => {
    const { listOfCurrencies } = useStore().getters
    return listOfCurrencies.find((c) => c.ID === id);
}