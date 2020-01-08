<template>
  <v-toolbar
    :extended="extended"
    :prominent="prominent"
    :dense="dense"
    :collapse="collapse"
    :flat="flat"
    color="grey lighten-4"
    :extension-height="extensionHeight"
    :menu="menu"
    id="appNav"
  >

     <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }" >
          <v-app-bar-nav-icon

            v-on="on"
            class="hidden-md-and-up"
          >
          </v-app-bar-nav-icon>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, i) in menu"
            :key="i"
            class="hidden-md-and-up"
          >
          
          <v-list-item-title v-if="item.title === 'Filtros'" @click="openFilter()">{{ item.title }}</v-list-item-title>
          <v-list-item-title v-else >{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


    <v-btn class="sourceFilter hidden-md-and-down" text>
      <img id="sourceFilterImg" class="hidden-md-and-down" src="https://i.ibb.co/L0WHR7k/btnIcon.png">
    </v-btn>
    <v-divider class="ms-4 hidden-md-and-down" inset vertical></v-divider>

    <v-btn :id="fiterOnBtn" class="ml-2 white black--text hidden-md-and-down" text large>
      <v-icon>mdi-security</v-icon>
    </v-btn>

    <v-btn :id="userListBtn" class="hidden-md-and-down" text large>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-text-field
      id="searchField"
      class="ml-5 mt-7"
      v-model="model"
      :shaped="shaped"
      :outlined="outlined"
      :rounded="rounded"
      :solo="solo"
      :single-line="singleLine"
      :filled="filled"
      :clearable="clearable"
      :persistent-hint="persistentHint"
      :loading="loading"
      :flat="flat"
      :counter="counterEn ? counter : false"
      :dense="dense"
      @click="clearMessage"
    >
      <v-tooltip v-slot:activator="{ on }" bottom>
        <v-icon v-on="on" color="black" class="magnifyIcon hidden-md-and-down">mdi-magnify</v-icon>
      </v-tooltip>
    </v-text-field>

    <v-spacer class="hidden-md-and-down"></v-spacer>

    <v-btn text large id="filterBtn" class="white black--text hidden-md-and-down" @click="openFilter()">
      <v-icon>mdi-tune</v-icon>
    </v-btn>
    <v-btn class="userBtn pink white--text ml-5 hidden-md-and-down" depressed large>
      <v-icon class="accountIcon mr-2">mdi-account</v-icon>INCLUIR USUÁRIO
    </v-btn>
    <v-divider class="ms-4 hidden-md-and-down" inset vertical></v-divider>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-power-settings</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppNavigation",
  props: {
    overlay: Boolean
  },
  data: () => ({
          menu: [
        { icon: 'home', title: 'Filtros'},
        { icon: 'info', title: 'Incluir usuário' },
        { icon: 'warning', title: 'Home' },
        { icon: 'warning', title: 'Settings' },
        { icon: 'warning', title: 'log off' }
      ],
    extended: false,
    extendedSlot: false,
    prominent: false,
    dense: false,
    collapse: false,
    flat: false,
    bg: false,
    extensionHeight: 48,
    userListBtn: "userListBtn",
    fiterOnBtn: "fiterOnBtn",

    //textField
    model: "Pesquisar....",
    outlined: false,
    rounded: false,
    solo: false,
    singleLine: false,
    filled: false,
    clearable: false,
    persistentHint: false,
    loading: false,
    counterEn: false,
    counter: 0,
    shaped: false
  }),

  methods: {
    menuItems () {
      return this.menu
    },
    clearMessage() {
      this.message = "";
      this.model = "";
    },

    openFilter() {
      this.fiterOnBtn = "fiterOnBtnGradient";
      this.userListBtn = "userListBtnWhite";
      this.$emit("toogleOverlay", true);
    },

    resetBtnStats() {
      this.fiterOnBtn = "fiterOnBtn";
      this.userListBtn = "userListBtn";
    },

    textSearched() {
      this.$emit("textWasSearched", this.model);
    }
  },

  watch: {
    overlay(newValue) {
      if (newValue == false) {
        this.resetBtnStats();
      }
    },
    model(newValue) {
      if (newValue != "") {
        this.textSearched();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin squared-btn {
  min-width: 0 !important;
  width: 44px !important;
}

@mixin gradient-btn {
  color: white !important;
  background: #f77b28 !important;
  background: -webkit-linear-gradient(
    to bottom left,
    #f77b28,
    #f77b28,
    #d93d60,
    #d93d60
  ) !important;
  background: linear-gradient(
    to bottom left,
    #f77b28,
    #f77b28,
    #d93d60,
    #d93d60
  ) !important;
  min-width: 0 !important;
}

.v-divider {
  height: 20px !important;
  transform: translate(0, 50%) !important;
}

.sourceFilter,
#userListBtn,
#fiterOnBtnGradient {
  @include gradient-btn;
  @include squared-btn;
}

#sourceFilterImg {
    max-width: 50% !important;
    display: block !important;
    margin-top: -6% !important;
    margin-left: -1% !important;

}

#userListBtnWhite {
  @include squared-btn;
  background-color: white !important;
  color: black !important;
  min-width: 0 !important;
}

.userBtn {
  text-align: center;
  .v-icon {
    vertical-align: middle !important;
  }
}

#filterBtn,
#fiterOnBtn,
#userListBtn {
  @include squared-btn;
}

#responsiveMenu{
  color:red !important;
  width: 100% !important;
}
</style>