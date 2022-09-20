<template>
  <draggable
    class="list-group"
    tag="div"
    v-model="renderList"
    v-bind="dragOptions"
    handle=".handle"
    @start="drag = true"
    @end="drag = false"
  >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <v-sheet
        class="list-group-item pa-1"
        v-for="tag in renderList"
        :key="tag.tag_id"
      >
        <v-card>
          <v-card-title
            class="d-flex justify-space-between align-content-center"
          >
            <span>
              <v-icon class="handle">mdi-drag</v-icon>
              <v-chip
                :color="tag.tag_color"
                :text-color="contrastText(tag.tag_color)"
                label
                small
                class="mx-2"
              >
                {{ tag.tag_name }}
              </v-chip>
            </span>
            <span>
              <v-btn icon>
                <v-icon @click="editTag(tag)">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="deleteTag(tag.tag_id)" :disabled="cantDelete(tag.tag_id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </span>
          </v-card-title>
        </v-card>
      </v-sheet>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Draggable",
  props: {
    list: Array,
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
      drag: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    ...mapActions({
      deleteTag: "wallet/deleteTag",
    }),
    contrastText(color) {
      let hex = color.charAt(0) === "#" ? color.substring(1, 7) : color;
      let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
    },
    editTag(tag) {
      this.$emit("handleeditTag", tag);
    }
  },
  computed: {
    ...mapGetters({
      getWalletId: "wallet/getWalletId"
    }),
    renderList: {
      get() {
        return this.list;
      },
      set(value) {
        this.$emit("handleChange", value);
      },
    },
    cantDelete() {
      return (id) => {
        return id === "tag_income_" + this.getWalletId || id === "tag_expense_" + this.getWalletId
      }
    }
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.handle {
  cursor: move;
}
</style>