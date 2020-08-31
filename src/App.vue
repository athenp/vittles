<template>
  <v-app id="inspire">
    <v-app-bar
      app
      bottom
      dense
      flat
      :style="{background: $vuetify.theme.themes[theme].accent}"
    >
      <v-toolbar-title class="title_font">VITTLES</v-toolbar-title>
      <v-toolbar-items>
        <v-btn text class="ml-3">BROWSE RECIPES</v-btn>
        <v-btn text class="pl-3">DECIDER TOOL</v-btn>
        <v-btn text class="pl-3">MEAL PLANNING</v-btn>
        <v-btn text class="pl-3">PARTNER PROGRAM</v-btn>
        <v-btn text class="pl-3">API</v-btn>
      </v-toolbar-items>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text class="pl-3">LOG IN</v-btn>
        <v-btn text class="pl-3">GO PREMIUM</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main :style="{background: $vuetify.theme.themes[theme].primary}">
      <v-container v-if="this.cycleRan == false" fill-height fluid style="width: 50%">
        <v-row align="center" justify="center">
          <h1 class="title_font">{{ homeTextCurrent }}</h1>
        </v-row>
      </v-container>
      <v-container fill-height fluid style="width: 50%">
        <v-row align="center" justify="center">
          <v-text-field
            v-model = "model"
            class = "title_font"
            append-icon = "mdi-plus"
            v-on:keyup.enter = "addIngredient"
            height="100px"
            color="#bc5f43"
            :placeholder = "placeholderText"
            v-on:focus = "clearPlaceholderText"
            v-on:blur = "changePlaceholderText"
          ></v-text-field>
          <v-chip
            v-for="(ingredient, index) in ingredients" :key="index"
            class = "ma-1"
            close
            color="white"
            outlined
            @click:close = "removeIngredient(index)"
          >{{ ingredient }}</v-chip>
        </v-row>
      </v-container>
    </v-main>
    <v-btn v-if="this.ingredients.length > 0" block tile max-height="48px" style="margin-bottom:48px" color="#bc5f43">SEARCH</v-btn>
  </v-app>
</template>

<script>
  export default {
    computed:{
      theme(){
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    },
    props: {
      source: String,
    },
    data: () => ({
      model: "",
      homeTextCurrent: "VITTLES",
      currVal: 0,
      cycleRan: false,
      placeholderText: "WHATCHA GOT?",
      ingredients: [],
    }),
    methods: {
      cycleHomeText: function() {
        var homeTextPossible = ["VITTLES", "FIND RECIPES", "TRACK DATES"];
        this.homeTextCurrent = homeTextPossible[this.currVal];
        this.currVal += 1;
        if (this.currVal == 3) {
          this.setHomeTextCycleRefresh();
        } else if (this.currVal == 4) {
          clearInterval(this.interval);
          this.cycleRan = true;
        }
        console.log(this.currVal);
      },
      setHomeTextCycleRefresh() {
        var vittleslastclear = localStorage.getItem('vittleslastclear'),
        time_now  = (new Date()).getTime();

        if (localStorage.getItem('cycleRan') == 'true') {
          this.cycleRan = true;
        } else if (localStorage.getItem('cycleRan') == 'false') {
          this.cycleRan = false;
        } else {
          this.cycleRan = false;
        }

        if ((time_now - vittleslastclear) > 1000 * 60 * 60 * 24) {
          localStorage.clear();
          localStorage.setItem('vittleslastclear', time_now);
          localStorage.setItem('cycleRan', false)
        } else {
          localStorage.setItem('cycleRan', true)
        }
      },
      clearPlaceholderText: function() {
        this.placeholderText = ""
      },
      changePlaceholderText: function() {
        this.placeholderText = "WHATCHA GOT?"
      },
      addIngredient: function() {
        if (this.model != "") {
          this.ingredients.push(this.model);
          this.model = "";
        } else {
          this.model = "";
        }
      },
      removeIngredient: function(index) {
        this.ingredients.splice(index, 1);
      },
    },
    created() {
      this.interval = setInterval(() => this.cycleHomeText(), 2000);
    },
    mounted() {
      this.setHomeTextCycleRefresh();
    }
  }
</script>

<style>
.title_font {
  font-family: 'Alice', serif !important;
}
h1 {
  color: #bc5f43;
  font-size: 100px;
  text-align: center;
}
.v-input input{
  max-height: 100px !important;
}
.v-text-field input {
  font-size: 80px;
}
.theme--light.v-input input, .theme--light.v-input textarea {
  color: #bc5f43 !important;
}
</style>