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
          @change="() => (searchInput = '')"
          :filter-method="(text) => (searchInput = text)"
          filterable
          placeholder="Select"
          style="width: 115px"
        >
          <el-option
            v-for="currency in filtredListOfCurrencies(searchInput)"
            :label="currency.CharCode"
            :key="currency.ID"
            :value="currency.ID"
          >
            <div class="currency-option">
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
          @change="() => (searchOutput = '')"
          filterable
          placeholder="Select"
          style="width: 115px"
        >
          <el-option
            v-for="currency in filtredListOfCurrencies(searchOutput)"
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
import getCurrencyById from "@/helpers/getCurrencyById";
import filtredListOfCurrencies from "@/helpers/filtredListOfCurrencies";
import convert from "@/services/convert";
import { ref, computed } from "vue";
export default {
  setup() {
    let input = ref(1);
    let selectInput = ref("1");
    let selectOutput = ref("");
    let searchInput = ref("");
    let searchOutput = ref("");

    const reverseHandler = () => {
      if (!selectOutput.value) return;
      const a = selectOutput.value;
      selectOutput.value = selectInput.value;
      selectInput.value = a;
    };

    const output = computed(() => {
      if (!selectOutput.value) return 1;
      const currencyOutput = getCurrencyById(selectOutput.value);
      if (selectInput.value === "1")
        return (input.value / currencyOutput.Value).toFixed(2);
      const currencyInput = getCurrencyById(selectInput.value);
      if (selectOutput.value === "1") {
        return (input.value * currencyInput.Value).toFixed(2);
      }
      return convert(input.value, currencyInput, currencyOutput);
    });
    return {
      input,
      selectInput,
      selectOutput,
      searchInput,
      searchOutput,
      output,
      reverseHandler,
      filtredListOfCurrencies,
    };
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
