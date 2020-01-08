<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <app-navigation @toogleOverlay="toogleOverlay" :overlay="overlay" @textWasSearched="textWasSearched" />
      <user-table :users="users" @delete:user="deleteUser" @edit:user="editUser" :searchedText="searchedText"/>
      <v-overlay :z-index="zIndex" :value="overlay"></v-overlay>
      <lateral-menu class="lateralMenu" @toogleOverlay="toogleOverlay" v-show="shouldShow"/>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from "@/components/AppNavigation.vue";
import UserTable from "@/components/UserTable.vue";
import LateralMenu from "@/components/LateralMenu.vue";
import mockData from "@/mockup";

export default {
  name: "app",
  components: {
    AppNavigation,
    LateralMenu,
    UserTable
  },
  data() {
    return {
      users: [],
      newUser: null,
      overlay: false,
      shouldShow: false,
      zIndex: 0,
      searchedText: ""
    };
  },

  mounted() {
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    } else {
      this.getUsers();
    }
  },

  methods: {
    async saveUser(users) {
      const parsed = JSON.stringify(users);
      localStorage.setItem("users", parsed);
    },

    async getUsers() {
      try {
        const data = mockData();
        this.users = data;
        this.saveUser(this.users);
        /* eslint-disable no-console */
        console.log(data);
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error);
      }
    },

    async deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id);
      this.users.splice(id, 1);
      this.saveUser(this.users);
    },
    async editUser(id, updatedUser) {
      this.users = this.users.map(user =>
        user.id === id ? updatedUser : user
      );
      this.saveUser(this.users);
    },
    toogleOverlay(boolValue) {
      this.overlay = boolValue
      this.shouldShow = boolValue
    },

    textWasSearched(newText){
      this.searchedText = newText
    }
  }
};
</script>



<style>

#whiteButtons {
  background-color: #f5f5f5;
  color: #f5f5f5;
}

.pinkButtons {
  background: #d63768;
}

.small-container {
  max-width: 680px;
}

.lateralMenu {
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  width: 1050% !important;
  height: 100% !important;
  z-index: 100 !important;
}
</style>
