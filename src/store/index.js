import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    listOfCurrencies: null,
    RUB: {
      CharCode: "RUB",
      ID: "1",
      Name: "Российский рубль",
      Nominal: 1,
      NumCode: "0",
      Previous: 0,
      Value: 0,
    },
  },
  getters: {
    listOfCurrencies(state){
      if(!state.listOfCurrencies) return null
      const normalizeValue = Object.values(state.listOfCurrencies);
      normalizeValue.unshift(state.RUB)
      return normalizeValue.map(c=> {
        c.CurrentValue = c.Value.toFixed(2)
        return c
      })
    }
  },
  mutations: {
    setListOfCurrencies(state, value) {
      state.listOfCurrencies = value;
    },
  },
  actions: {
    async getListOfCurrencies({ commit }) {
      const { status, data } = await axios.get(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      if (status === 200) {
        const { Valute } = data;
        commit("setListOfCurrencies", Valute);
      }
    },
  },
  modules: {},
});
