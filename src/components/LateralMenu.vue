<template>
<v-flex xs12 sm5 md3>
  <v-card
    max-width="500"
    class="mx-auto mt-0"
    id="filterCard"
    absolute
    right
  >
    <v-toolbar
    :flat="true"
    id="filterToolbar"
    >
      <v-icon class="filterIcons mr-3" >mdi-tune</v-icon>
      <v-toolbar-title id="filtro">Filtros</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn id="closeButton"  @click="closeFilter()" >
        <v-icon>mdi-close</v-icon>
      </v-btn>

    </v-toolbar>

    <v-list two-line subheader
    class="filterList">
      
      <p id="subText" >
        Utilize os filtros abaixo para refinar os resultados da tabela, clique no botão APLICAR para salvar as alterações.
      </p>

      <v-divider class="ms-4" inset id="subHeaderDivider"></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
      
        <v-list-item-avatar  v-if="item.title === 'ATIVOS E INATIVOS' ">
            <svg class="filterIcons" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M17 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
        </v-list-item-avatar>

        <v-list-item-avatar  v-else>
          <v-icon
            :class="[item.iconClass]"
            v-text="item.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title" class="secondFilterTitle"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-menu-down</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>
 
          <v-btn id="aplicarBtn" class="ma-2 white--text ml-2 mt-5" color="pink" outlined >
            Aplicar
          </v-btn>


    </v-list>
  </v-card>
  </v-flex>
</template>



<script>

export default {
  subHeaderText: "utilize os filtros abaixo para refinar os resultados da tabela, clique no botão APLICAR para salvar as alterações.",
  name: "lateral-menu",
    data () {
      return {
        items: [
          { title: 'TODAS AS DATAS DE INCLUSSÃO', icon: 'mdi-calendar', iconClass: "filterIcons" },
          { title: 'TODAS AS DATAS DE ALTERAÇÃO ', icon: 'mdi-calendar', iconClass: "filterIcons" },
          { title: 'ATIVOS E INATIVOS', iconClass: "filterIcons" },
        ],
      }
    },

    methods: {
      closeFilter() {
        this.$emit('toogleOverlay', false)
      }
    }
  }
</script>





<style lang="scss" scoped>

$iconColor: #BDBDBD;
$backgroundColor: #f5f5f5; 
$filterTextColor: #d63768;
$subTextColor: #9a9a9a;

@media screen and (max-width: 600px) {

#aplicarBtn{
  width: 10% !important;
}

}
 

.firstHeader {
    vertical-align: middle !important;
}

.secondFilterTitle {
    color: $filterTextColor !important;
    font-weight: bold !important;
}

.v-card{

  margin-top: 10px !important;
  background-color: rgba(0,0,0,0.0) !important;
}

#closeButton{
  min-width: 0 !important;
  width: 44px !important;
  height: 44px !important;
  background-color: white !important;
}

#filtro{
  font-weight: bold !important;
  color: Black !important;
}

#aplicarBtn {
  width: 90% !important;
  text-align:center !important;
  margin-top: 10px !important;
  margin-left: 5% !important;
}

.filterIcons {
  color: $iconColor !important;
  fill: $iconColor !important;
}

#subText{
  color: $subTextColor !important;
  margin-left: 5%;
  padding-top: 3%;
  font-style: italic;
}

#subHeaderDivider{
  width: 5% !important;
  margin-left: 5% !important;
}

.filterList{
  height: 100% !important;
  background-color: $backgroundColor !important;
}

#filterToolbar{
  background-color: white !important;
}

#filterCard{
  height: 100% !important;
}



</style>

