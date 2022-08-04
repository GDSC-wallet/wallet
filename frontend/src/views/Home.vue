<template>
  <v-sheet>
    <v-row>
      <v-col cols="12" sm="6">
        <Calendar class="px-1" />
      </v-col>
      <v-col cols="12" sm="6">
        <RecordList :records="getTodaysRecords" editable />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import Calendar from "../components/Calendar/Main.vue";
import RecordList from "../components/RecordCard/RecordList.vue"
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Calendar: Calendar,
    RecordList: RecordList
  },
  mounted() { },
  methods: {
    ...mapActions({
      deleteRecord: "record/deleteRecord",
      openModal: "record/openModal",
      switchEditMode: "record/editMode",
      setData: "record/setData",
    }),
    openRecordModal(record) {
      this.openModal();
      this.switchEditMode();
      this.setData(record);
    },
    contrastText(color) {
      let hex = color.charAt(0) === "#" ? color.substring(1, 7) : color;
      let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
    },
    tag(id) {
      return this.getAllWalletTags.find((tag) => tag.tag_id == id);
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