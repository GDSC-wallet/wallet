<template>
  <div>
    <div class="d-flex justify-end py-2" v-if="showFilter && records.length > 0">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon left>
              mdi-filter
            </v-icon>
            {{ sortType[type] }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="type" color="primary" mandatory>
            <v-list-item v-for="(item, index) in sortType" :key="index">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <template v-for="(sortedData, sortType) in getSortedData">
      <p class="mb-3" v-if="type == 0 && showDate">{{ sortType.substr(0, 10) }}</p>
      <v-expansion-panels accordion class="mb-3">
        <RecordCard v-for="record in sortedData" :key="record.record_id" :record="record" :editable="editable" />
      </v-expansion-panels>
    </template>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RecordCard from './RecordCard.vue';
export default {
  name: "RecordList",
  components: {
    RecordCard: RecordCard
  },
  props: {
    records: Array,
    editable: Boolean,
    showDate: Boolean,
    showFilter: Boolean,
  },
  data() {
    return {
      sortType: ["日期", "標籤", "金額"],
      type: 0
    }
  },
  methods: {
    sortByTime(records) {
      if(!this.showDate) {
        return {
          data: records
        }
      }
      let res = new Object();
      records.forEach(record => {
        if (!res[record.record_date]) res[record.record_date] = new Array();
        res[record.record_date].push(record);
      });
      return res;
    },
    sortByTag(records) {
      const tags = this.getAllWalletTags.map(tag => tag.tag_id);
      return {
        data: records.map(r => r).sort((a, b) => {
          return tags.indexOf(a.wallet_record_tag_id) < tags.indexOf(b.wallet_record_tag_id) ? 1 : -1;
        })
      }
    },
    sortByCount(records) {
      return {
        data: records.map(r => r).sort((a, b) => {
          return Math.abs(a.record_amount) < Math.abs(b.record_amount) ? 1 : -1;
        })
      }
    },

  },
  computed: {
    ...mapGetters({
      getAllWalletTags: "wallet/getAllWalletTags"
    }),
    getSortedData() {
      switch (this.type) {
        case 1:
          return this.sortByTag(this.records);
        case 2:
          return this.sortByCount(this.records);
        case 0:
        default:
          return this.sortByTime(this.records);
      }
    }
  }

}
</script>