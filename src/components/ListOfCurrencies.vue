<template>
  <section class="list-of-currencies">
    <h1>Список валют</h1>
    <el-table
      :data="currentCurrencies('searchTable')"
      style="width: 100%"
      v-if="listOfCurrencies()"
    >
      <el-table-column
        prop="CharCode"
        label="Код"
        width="100"
      />
      <el-table-column
        prop="Name"
        label="Название"
        width="340"
      />
      <el-table-column
        prop="Nominal"
        align="center"
        label="Номинал"
        width="180"
      />
      <el-table-column
        prop="CurrentValue"
        label="Стоимость"
        width="120"
      />
      <el-table-column align="right">
        <template #header>
          <div class="header-search-and-select">
            <el-select
              v-model="selectedcurrency"
              @change="() => (searchCurrency = '')"
              :filter-method="(text) => (searchCurrency = text)"
              filterable
              placeholder="Select"
            >
              <el-option
                v-for="currency in filtredListOfCurrencies('searchCurrency')"
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
            <el-input
              v-model="searchTable"
              size="small"
              placeholder="Поиск"
            />
          </div>
        </template>
        <template #default="scope">
          <div
            :class="courseIsLess(scope) ? 'course--less' : 'course--more'"
            class="course"
          >
            <span class="course__number">{{ getCourse(scope) }}</span>
            <span
              v-if="courseIsLess(scope)"
              class="course__arrow"
            >&#9660;</span>
            <span
              v-else
              class="course__arrow"
            >&#9650; </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import getCurrencyById from "@/helpers/getCurrencyById"
import filtredListOfCurrencies from '@/helpers/filtredListOfCurrencies'
import _ from "lodash";
export default {
  data() {
    return {
      searchCurrency: "",
      searchTable: "",
      selectedcurrency: "1",
    };
  },
  methods: {
    ...mapGetters(["listOfCurrencies"]),
    filtredListOfCurrencies,
    currentCurrencies(searchName) {
      if (this.selectedcurrency === "1")
        return this.filtredListOfCurrencies(searchName).filter((c) => c.ID !== "1");
      const { Value, ID } = getCurrencyById(this.selectedcurrency, this.listOfCurrencies());
      const cloneArray = _.cloneDeep(this.filtredListOfCurrencies(searchName));
      return cloneArray
        .map((c) => {
          if (c.ID === "1") {
            c.CurrentValue = Value;
          } else {
            c.CurrentValue = (1 * (Value / c.Value) * c.Nominal).toFixed(2);
          }
          return c;
        })
        .filter((c) => c.ID !== ID);
    },
    getCourse(scope) {
      return (scope.row.Value - scope.row.Previous).toFixed(4);
    },
    courseIsLess(scope) {
      return this.getCourse(scope) < 0;
    },
  },
  created() {
    this.$store.dispatch("getListOfCurrencies");
  },
};
</script>

<style lang="scss">
.list {
  display: grid;
  row-gap: 10px;
  justify-items: flex-start;
}
.course {
  .course__arrow {
    opacity: 0;
  }
}
.course--less {
  color: red;
  .course__arrow {
    color: red;
    opacity: 1;
    transform: rotate(180deg);
  }
}
.course--more {
  color: green;
  .course__arrow {
    color: green;
    opacity: 1;
    content: "&#9733;";
  }
}
.header-search-and-select {
  display: flex;
  width: 100%;
  column-gap: 1rem;
}
</style>
