<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="record in records" :key="record.record_id">
      <v-expansion-panel-header>
        <div class="d-flex align-center">
          <v-chip :color="tag(record.wallet_record_tag_id).tag_color"
            :text-color="contrastText(tag(record.wallet_record_tag_id).tag_color)" label small class="mr-2">
            {{ tag(record.wallet_record_tag_id).tag_name }}
          </v-chip>
          <span v-if="showDate">{{ ezDate(record.record_date) }}: </span>
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
        <v-row v-if="editable">
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  props: {
    records: Array,
    editable: Boolean,
    showDate: Boolean
  },
  data() {
    return {};
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
    ezDate(str) {
      let ret = String();
      ret = ret.concat(str.slice(5, 10));
      return ret;
    }
  },
  computed: {
    ...mapGetters({
      currentDate: "calendar/getDate",
      getAllWalletTags: "wallet/getAllWalletTags",
    }),
  },
};
</script>