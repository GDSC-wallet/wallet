<template>
  <v-sheet>
    <v-row>
      <v-col cols="12" sm="6">
        <Calendar class="pa-1" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-expansion-panels accordion class="pa-1">
          <v-expansion-panel v-for="record in getTodaysRecords" :key="record.record_id">
            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <v-chip :color="tag(record.wallet_record_tag_id).tag_color"
                  :text-color="contrastText(tag(record.wallet_record_tag_id).tag_color)" label small class="ma-2">
                  {{ tag(record.wallet_record_tag_id).tag_name }}
                </v-chip>
                <span>{{ record.record_name }}</span>
              </div>
              <template v-slot:actions>
                <span>
                  {{ record.record_amount }}
                </span>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>{{ record.record_description }}</p>
              <v-row>
                <v-col>
                  <v-btn color="primary" @click="openRecordModal(record)" block>修改</v-btn>
                </v-col>
                <v-col>
                  <v-btn color="error" @click="deleteRecord(record)" block>刪除</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import Calendar from "../components/Calendar/Main.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Calendar: Calendar,
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
      getAllWalletTags: "wallet/getAllWalletTags",
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