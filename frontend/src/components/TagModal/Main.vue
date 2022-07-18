<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>編輯標籤</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs v-model="tab" grow>
            <v-tab>收入</v-tab>
            <v-tab>支出</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-container class="flex-grow-1" style="overflow: auto">
        <v-tabs-items v-model="tab" touchless>
          <v-tab-item>
            <DraggableTag
              :list="incomeList"
              @handleChange="handleIncomeChange"
              @handleeditTag="editTag"
            />
          </v-tab-item>
          <v-tab-item>
            <DraggableTag
              :list="expenseList"
              @handleChange="handleExpenseChange"
              @handleeditTag="editTag"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="success" block @click="createTag">新增標籤</v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" block @click="updateTag">儲存順序</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <EditTagModal
      :open="tagModalOpen"
      @handleChange="handleDialogChange"
      :mode="mode"
      :type="type"
      :editData="editTagData"
    />
  </v-dialog>
</template>

<script>
import DraggableTag from "./components/Draggable.vue";
import EditTagModal from "./components/EditTagModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TagModal",
  props: {
    open: Boolean,
  },
  data() {
    return {
      incomeList: [],
      expenseList: [],
      type: "income",
      tagModalOpen: false,
      editTagData: null,
      mode: "create",
    };
  },
  components: {
    DraggableTag: DraggableTag,
    EditTagModal: EditTagModal,
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      updateAllTags: "wallet/updateAllTags"
    }),
    initialize() {
      this.incomeList = this.tags("income").map((tag) =>
        Object.assign({}, tag)
      );
      this.expenseList = this.tags("expense").map((tag) =>
        Object.assign({}, tag)
      );
    },
    handleIncomeChange(value) {
      this.incomeList = value;
    },
    handleExpenseChange(value) {
      this.expenseList = value;
    },
    handleDialogChange(value) {
      this.tagModalOpen = value;
    },
    updateTag() {
      this.updateAllTags(this.tagList).then(() => {
        this.dialogOpen = false
      })
    },
    createTag() {
      this.handleDialogChange(true);
      this.mode = "create";
    },
    editTag(tag) {
      this.handleDialogChange(true);
      this.mode = "edit";
      this.editTagData = tag;
    },
  },
  computed: {
    ...mapGetters({
      tags: "wallet/getWalletTags",
    }),
    dialogOpen: {
      get() {
        if (this.open == true) this.initialize();
        return this.open;
      },
      set(value) {
        this.$emit("handleChange", value);
      },
    },
    tab: {
      get() {
        if (this.type == "income") return 0;
        if (this.type == "expense") return 1;
        return 0;
      },
      set(value) {
        //this.initialize();
        if (value == 0) {
          this.type = "income";
        } else if (value == 1) {
          this.type = "expense";
        }
      },
    },
    tagList() {
      return this.expenseList.concat(this.incomeList).map((tag, i) => {
        return {
          ...tag,
          tag_ordinary: i + 1,
        };
      });
    },
  },
};
</script>