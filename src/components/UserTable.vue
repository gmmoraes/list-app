<template>
  <div id="user-table" class="mt-5">
    <v-app>
      <v-content>
        <v-container>
          <v-data-table
            :items="users"
            :headers="headers"
            :search="searchedText"
            :single-select="true"
            :footer-props="{'items-per-page-options': [7,14, 28, 42,56, 100]}"
            :items-per-page="6"
            show-select
            :currentTablePage="page"
            :hide-default-footer="true"
          >
            <template v-slot:body="{ items }">
              <tbody class="tableTbody"> 
                <tr
                  v-for="item in items"
                  :key="item.name"
                  @click="selectItem(item)"
                  :class="getBackgroundColor(item.id,'Background')"
                >
                  <td>
                    <v-checkbox id="userRowCheckBox"></v-checkbox>
                  </td>
                  <td id="extraSpace"></td>
                  <td v-if="editing === item.id" data-label="usuario" class="userTD">
                    <input type="text" v-model="item.usuario" class="editInput" />
                  </td>
                  <td v-else class="userTD" data-label="usuario">{{ item.usuario }}</td>

                  <td v-if="editing === item.id" data-label="email">
                    <input type="text" v-model="item.email" class="editInput" />
                  </td>
                  <td v-else data-label="email">{{ item.email }}</td>

                  <td v-if="editing === item.id" data-label="data de inclusão">
                    <input type="text" v-model="item.dataDeInclusao" class="editInput" />
                  </td>
                  <td v-else data-label="data de inclusão">{{ item.dataDeInclusao }}</td>

                  <td v-if="editing === item.id" data-label="data de alteração">
                    <input type="text" v-model="item.dataDeAlteracao" class="editInput" />
                  </td>
                  <td v-else data-label="data de alteração">{{ item.dataDeAlteracao }}</td>

                  <td v-if="editing === item.id" data-label="regras">
                    <input type="text" v-model="item.regras" class="editInput" />
                  </td>
                  <td v-else data-label="regras">{{ item.regras }}</td>

                  <td v-if="editing === item.id " data-label="status">
                    <input type="text" v-model="item.regras" class="editInput" />
                  </td>
                  <td v-else :class="getColor(item.status)" data-label="status">{{ item.status }}</td>

                  <td>
                    <v-btn
                      :class="getBackgroundColor(item.id,'hoverIcons')"
                      text
                      @click="$emit('delete:user', item.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn :class="getBackgroundColor(item.id,'hoverIcons')" text>
                      <v-icon>mdi-archive</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn :class="getBackgroundColor(item.id,'hoverIcons')" text>
                      <v-icon>mdi-security</v-icon>
                    </v-btn>
                  </td>

                  <td v-if="editing === item.id">
                    <v-btn
                      :class="getBackgroundColor(item.id,'hoverIcons')"
                      @click="editUser(item)"
                      text
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </td>
                  <td v-else>
                    <v-btn
                      :class="getBackgroundColor(item.id,'hoverIcons')"
                      @click="editMode(item)"
                      text
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </td>
                  <td data-label="ações">
                    <v-btn :class="getBackgroundColor(item.id,'hoverIcons')" text>
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>

            <template slot="footer">
              <div class="containerFooter pt-5 pb-5">
                <v-btn text class="leftFootButton">Primeiro</v-btn>

                <v-btn text class="leftFootButton ml-2">Anterior</v-btn>

                <v-btn text class="pink white--text ml-2">{{currentTablePage}}</v-btn>

                <v-btn text class="rightFootButton ml-2">Próximo</v-btn>

                <v-btn text class="rightFootButton ml-2">Último</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

 






<script>
export default {
  name: "user-table",
  props: {
    users: Array,
    searchedText: String
  },
  data: () => ({
    currentTablePage: 1,
    rowsPerPageItems: [10, 20, 30, 40],
    pagination: {
      rowsPerPage: 20
    },
    active: false,
    editing: null,
    dialog: false,
    headers: [
      { text: "", value: "", align: "left" },
      {
        text: "USUÁRIO",
        align: "left",
        sortable: false,
        value: "usuario"
      },
      { text: "EMAIL", value: "email", align: "left" },
      { text: "DATA DE INCLUSÃO", value: "dataDeInclusao", align: "left" },
      { text: "DATA DE ALTERAÇÃO", value: "dataDeAlteracao", align: "left" },
      { text: "REGRAS", value: "regras", align: "left" },
      { text: "STATUS", value: "status", align: "left" },
      { text: "", value: "", sortable: false, align: "left" },
      { text: "", value: "", sortable: false, align: "left" },
      { text: "", value: "", sortable: false, align: "left" },
      { text: "", value: "", sortable: false, align: "left" },
      { text: "AÇÕES", value: "", sortable: false, align: "center" }
    ],
    userList: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editMode(user) {
      /* eslint-disable no-console */
      console.log("lol1");
      this.cachedUser = Object.assign({}, user);
      this.editing = user.id;
      console.log(user);
    },
    cancelEdit(user) {
      /* eslint-disable no-console */
      console.log("lol2");
      Object.assign(user, this.cachedUser);
      this.editing = null;
    },
    editUser(user) {
      /* eslint-disable no-console */
      console.log("lol");

      if (user.usuario === "" || user.email === "") return;
      this.$emit("edit:user", user.id, user);
      this.editing = null;
    },
    getColor(status) {
      if (status == "Inativo") return "redStatusText";
      else return "greenStatusText";
    },

    getBackgroundColor(id, idName) {
      if (id % 2 == 0) return "grey" + idName;
      else return "white" + idName;
    }
  }
};
</script>




<style lang="scss" scoped>
@mixin status-text {
  vertical-align: middle !important;
  // display: inherit !important;
}

$whiteBackgroundColor: #f5f5f5;
$greyBackgroundColor: #e9e9e9;

$hoveredGreenStatusTextColor: #e6f6e4;
$hoveredRedStatusTextColor: #fee5e5;
$bulletPointHoveredColor: #ececec;

$footerLeftButtonsBackgroundColor: #fafafa;
$footerLeftButtonsColor: #a8a8a8;

$footerRightButtonsBackgroundColor: #f5f5f5;
$footerRightButtonsColor: #c2c2c2;

@media screen and (max-width: 600px) {
  #extraSpace {
    display: none !important;
  }
  .v-input {
    position: absolute !important;
    right: 0 !important;
  }
  table {
    border: 0 !important;
  }

  table caption {
    font-size: 1.3em !important;
  }
  table thead {
    border: none !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
  }
  table tr {
    border-bottom: 3px solid #ddd !important;
    display: block !important;
    margin-bottom: 0.625em !important;
  }
  table td {
    border-bottom: 1px solid #ddd !important;
    display: block !important;
    font-size: 0.8em !important;
    text-align: right !important;
  }
  table td::before {
    content: attr(data-label) !important;
    float: left !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
  }

  table td:last-child {
    border-bottom: 0 !important;
  }
}

.greenStatusText::before,
.redStatusText::before {
  color: black !important;
}

.redStatusText {
  color: red !important;
}

.greenStatusText {
  color: green !important;
}

.whiteBackground {
  background-color: $whiteBackgroundColor !important;
}

.greyBackground {
  background-color: $greyBackgroundColor !important;
}

th {
  @include status-text;
}

.v-data-table {
  border-collapse: collapse !important;
  width: 98% !important;
  position: absolute !important;
  left: 1% !important;
  right: 1% !important;
}

.whiteBackground:hover,
.greyBackground:hover {
  background-color: #fdfdfd !important;
  color: #e6e6e6 !important;

  td {
    border-bottom: 3px solid #d63768 !important;
  }

  .greenStatusText::before,
  .redStatusText::before {
    color: #e6e6e6 !important;
  }
  .greenStatusText {
    color: $hoveredGreenStatusTextColor !important;
  }

  .redStatusText {
    color: $hoveredRedStatusTextColor !important;
  }

  #dots {
    color: $bulletPointHoveredColor !important;
  }

  .whitehoverIcons,
  .greyhoverIcons {
    color: #666666 !important;
  }
}

#userRowCheckBox {
  @include status-text;
}

.whitehoverIcons {
  color: $whiteBackgroundColor !important;
}
.greyhoverIcons {
  color: $greyBackgroundColor !important;
}

.user-table {
  width: 90% !important;
}

.editInput {
  background-color: white !important;
  border: 1px solid black !important;
}

.containerFooter{
  margin: 0 auto !important;
  width: 40% !important;
}

.leftFootButton{
  background-color: $footerLeftButtonsBackgroundColor !important;
  color: $footerLeftButtonsColor !important;
}

.rightFootButton{
  background-color: $footerRightButtonsBackgroundColor !important;
  color: $footerRightButtonsColor !important;
  border: 2px solid #f9f9f9 !important;
}

</style>