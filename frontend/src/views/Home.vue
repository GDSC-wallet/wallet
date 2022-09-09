<template>
  <v-sheet>
    <v-row>
      <v-col cols="12" sm="6">
        <Calendar class="px-1" />
      </v-col>
      <v-col cols="12" sm="6">
        <Balance />
        <RecordList :records="getTodaysRecords" editable class="px-1">
          <template v-slot:empty>
            <v-card class="py-4 px-6 elevation-0" elevation-0>
              本日無資料
              <br />
              用右下角的按鈕新增這天的第一筆吧
            </v-card>
          </template>
        </RecordList>
        <br /><br /><br />
      </v-col>
    </v-row>
    <v-btn color="primary" bottom right fab fixed @click="openRecordModal">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
import Calendar from "../components/Calendar/Main.vue";
import RecordList from "../components/RecordCard/RecordList.vue";
import Balance from "../components/Balance/Main.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Calendar: Calendar,
    RecordList: RecordList,
    Balance: Balance,
  },
  mounted() {},
  methods: {
    ...mapActions({
      openModal: "record/openModal",
      switchCreateMode: "record/createMode",
    }),
    openRecordModal() {
      this.openModal();
      this.switchCreateMode();
    },
  },
  computed: {
    ...mapGetters({
      currentDate: "calendar/getDate",
      records: "wallet/getRecords",
    }),
    getTodaysRecords() {
      return this.records.filter((record) => {
        let record_date = new Date(record.record_date);
        let selected_date = new Date(this.currentDate);
        return (
          record_date.setHours(0, 0, 0, 0) == selected_date.setHours(0, 0, 0, 0)
        );
      });
    },
  },
};
</script>
