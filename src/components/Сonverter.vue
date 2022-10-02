<template>
  <section class="converter">
    <h1>Конвертер</h1>
    <div class="converter__fields">
      <div class="converter__field">
        <el-input-number
          :min="1"
          v-model="input"
          :disabled="!selectOutput"
          placeholder="Please input"
          class="input-with-select"
        />
        <el-select
          v-model="selectInput"
          @change="() => searchInput = ''"
          :filter-method="(text) => (searchInput = text)"
          filterable
          placeholder="Select"
          style="width: 115px"
        >
          <el-option
            v-for="currency in filtredListOfCurrencies('searchInput')"
            :label="currency.CharCode"
            :key="currency.ID"
            :value="currency.ID"
          >
            <div class="converter__option">
              <span>{{ currency.CharCode }}</span>
              <span>|</span>
              <span>{{ currency.Name }}</span>
            </div>
          </el-option>
        </el-select>
      </div>
      <el-button
        class="converter__btn-reverse"
        @click="reverseHandler"
      >
        <el-icon>
          <Switch />
        </el-icon>
      </el-button>

      <div class="converter__field">
        <el-input
          :value="output"
          placeholder="Please input"
          class="input-with-select"
          disabled
        />
        <el-select
          :filter-method="(text) => (searchOutput = text)"
          v-model="selectOutput"
          @change="() => searchOutput = ''"
          filterable
          placeholder="Select"
          style="width: 115px"
        >
          <el-option
            v-for="currency in filtredListOfCurrencies('searchOutput')"
            :key="currency.ID"
            :value="currency.ID"
            :label="currency.CharCode"
          >
            <div class="currency-option">
              <span>{{ currency.CharCode }}</span>
              <span>|</span>
              <span>{{ currency.Name }}</span>
            </div>
          </el-option>
        </el-select>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import getCurrencyById from "@/helpers/getCurrencyById";
import filtredListOfCurrencies from '@/helpers/filtredListOfCurrencies'
import convert from '@/services/convert'
export default {
  data() {
    return {
      input: 1,
      selectInput: "1",
      selectOutput: "",
      searchInput: "",
      searchOutput: "",
    };
  },
  computed: {
    output() {
      if (!this.selectOutput) return 1;
      const currencyOutput = getCurrencyById(this.selectOutput, this.listOfCurrencies());
      if (this.selectInput === "1")
        return (this.input / currencyOutput.Value).toFixed(2);
      const currencyInput = getCurrencyById(this.selectInput, this.listOfCurrencies());
      if (this.selectOutput === "1") {
        return (this.input * currencyInput.Value).toFixed(2);
      }
      return this.convert(this.input, currencyInput, currencyOutput)
    },
  },
  methods: {
    ...mapGetters(["listOfCurrencies"]),
    convert,
    filtredListOfCurrencies,
    reverseHandler() {
      if (!this.selectOutput) return;
      const a = this.selectOutput;
      this.selectOutput = this.selectInput;
      this.selectInput = a;
    },
  },
};
</script>
<style lang="scss">
.converter {
  &__fields {
    display: grid;
    grid-template-columns: 1fr 3rem 1fr;
    column-gap: 1rem;
    max-width: 50rem;
  }
  &__field {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .el-input-number {
    width: 100%;
    .el-input__wrapper {
      border-radius: 0.3rem 0 0 0.3rem;
    }
  }
  .el-select .el-input__wrapper {
    border-radius: 0 0.3rem 0.3rem 0;
  }
}
</style>
