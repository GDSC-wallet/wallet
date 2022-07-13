<template>

  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="prices"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>記帳清單</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              新增項目
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="名稱"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.prices"
                      label="價格"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.desc"
                      label="敘述"
                    ></v-text-field>
                  </v-col>
                  
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                儲存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="font-weight-bold">確定要刪除此項目嗎？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">確定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '項目',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '價格', value: 'prices' },
        {
          text: '描述',
          align: 'start',
          sortable: false,
          value: 'desc',
        },
        { text: '動作', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        prices: 0,
        desc: '',
      },
      defaultItem: {
        name: '',
        prices: 0,
        desc: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      totalItem: function(){
        let sum = 0;
        this.items.forEach(function(item) {
          sum += (parseFloat(item.price) * parseFloat(item.quantity));
        });

        return sum;
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: '吐司夾蛋',
            prices: 159,
            desc: '',
          },
          {
            name: '冰紅茶',
            prices: 237,
            desc: '好喝',
          },
          {
            name: '英文講義',
            prices: 262,
            desc: 'for英文通識',
          },
          {
            name: '立可帶',
            prices: 305,
            desc: '',
          },
          {
            name: '泡麵',
            prices: 356,
            desc: '',
          },
          {
            name: '公車費',
            prices: 375,
            desc: '',
          },
          {
            name: '活動保證金',
            prices: 392,
            desc: '社團：GDSC',
          },
          {
            name: '便當',
            prices: 408,
            desc: '',
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>