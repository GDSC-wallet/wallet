<template>
  <div class="d-flex flex-column">
    <div class="mx-auto">
      <v-date-picker v-model="picker" type="month" elevation="3">
        <template v-slot:default>
          <div class="d-flex flex-column">
            <v-select v-model="select" :items="items" label="record count"></v-select>
            <v-btn block @click="generate">generate</v-btn>
          </div>
        </template>
      </v-date-picker>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

export default {
  name: "TestData",
  data() {
    return {
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 7),
      items: [10, 50, 100],
      select: 10
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      createRecord: "record/createRecord"
    }),
    async generateRecord() {
      const record_type = getRandomInt(2) == 0 ? "income" : "expense";
      const record_amount = getRandomInt(1000) + 1
      const tmp_date = getRandomInt(this.getMonthDays) + 1
      const record_date = this.picker + "-" + (tmp_date < 10 ? "0" : "") + tmp_date.toString();
      const record_name = "test data " + (Math.random() + 1).toString(36).substring(7);
      const wallet_record_tag_id = this.getWalletTags(record_type)[getRandomInt(this.getWalletTags(record_type).length)]
      const record = {
        record_type: record_type,
        record_amount: record_amount,
        record_date: record_date,
        record_description: "",
        record_name: record_name,
        wallet_record_tag_id: wallet_record_tag_id
      }
      console.log(record)
      await this.createRecord(record)
    },
    async generate() {
      for(let i = 0; i < this.select; i++) {
        await this.generateRecord();
      }
    }
  },
  computed: {
    ...mapGetters({
      _getWalletTags: "wallet/getWalletTags"
    }),
    getMonthDays() {
      return new Date(new Date(new Date(this.picker).setMonth(new Date(this.picker).getMonth() + 1)).setDate(0)).getDate();
    },
    getWalletTags() {
      return (type) => {
        return this._getWalletTags(type).map(tag => tag.tag_id)
      }
    }
  }
}
</script>