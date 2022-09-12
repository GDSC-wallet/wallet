<template>
  <v-expansion-panel :readonly="!editable && !record.record_description">
    <v-expansion-panel-header>
      <v-sheet class="d-flex align-center overflow-hidden">
        <v-chip
          :color="tag(record.wallet_record_tag_id).tag_color"
          :text-color="contrastText(tag(record.wallet_record_tag_id).tag_color)"
          label
          small
          style="min-width: 48px"
        >
          {{ tag(record.wallet_record_tag_id).tag_name }}
        </v-chip>
        <div class="flex-grow-1 mx-2">{{ record.record_name }}</div>
      </v-sheet>
      <template v-slot:actions>{{ record.record_amount }}</template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p v-if="record.record_description !== ''">
        {{ record.record_description }}
      </p>
      <div v-if="record.record_debtors.length != 0" class="d-flex pb-2">
        <v-tooltip bottom v-for="deb in record.record_debtors">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              v-on="on"
              color="orange lighten-2"
              class="px-1 mr-1"
            >
              <v-avatar color="white lighten-1" size="20" class="">
                <span>{{ deb.debtor_name[0] }}</span>
              </v-avatar>
              <span class="px-1 ml-1">{{ deb.debtor_name }}</span>
            </v-chip>
          </template>
          <span>{{ deb.debtor_record_amount }}</span>
        </v-tooltip>
      </div>
      <v-row v-if="editable">
        <v-col>
          <v-btn color="primary" @click="openRecordModal(record)" block
            >修改</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="error" @click="deleteRec" :disabled="disabled" block
            >刪除</v-btn
          >
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RecordCard",
  props: {
    record: Object,
    editable: Boolean,
  },
  data() {
    return {
      disabled: false,
    };
  },
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
    deleteRec() {
      this.disabled = true;
      this.deleteRecord(this.record).catch(() => (this.disabled = false));
    },
  },
  computed: {
    ...mapGetters({
      currentDate: "calendar/getDate",
      getAllWalletTags: "wallet/getAllWalletTags",
    }),
  },
};
</script>
