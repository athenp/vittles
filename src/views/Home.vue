<template>
  <v-app>
    <v-main id="main_stuff" :style="{background: $vuetify.theme.themes[theme].primary}">
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
            v-on:keyup.188 = "addIngredient"
            height="100px"
            color="#bc5f43"
            :placeholder = "placeholderText"
            
            
          ></v-text-field>
          <v-chip
            v-for="(ingredient, index) in ingredients" :key="index"
            class = "ma-1"
            close
            color="white"
            outlined
            @click:close = "removeIngredient(index)"
          >
            {{ ingredient }}
          </v-chip>
          <v-chip
            v-if="model != ''"
            class = "ma-1"
            color="white"
            outlined
          >
            {{ currentSuggestion }}
            <v-icon size="18px" right>mdi-help-circle</v-icon>
          </v-chip>
        </v-row>
      </v-container>
    </v-main>
    <v-btn 
      v-if="this.ingredients.length > 0"
      @click="$router.push({path: '/recipes'})"
      block
      tile 
      max-height="48px" 
      style="margin-bottom:48px" 
      color="#bc5f43"
    >SEARCH
    </v-btn>
  </v-app>
</template>

<script>
import Matter from '/Users/athenpellicci/Desktop/vittles/node_modules/matter-js/build/matter.js'
import json from '@/data/ingredients.json'

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
      ingredientData: json,
      currentSuggestion: "",
    }),
    watch: {
      model: function () {
        this.autocomplete();
      }
    },
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
      autocomplete: function() {
        if (this.model != "") {
          this.currentSuggestion = this.ingredientData.find(a =>a.toLowerCase().includes(this.model.toLowerCase().replace(/,\s*$/, "")));
        }
      },
      addIngredient: function() {
        if (this.model != "") {
          //this.model = this.model.replace(/,\s*$/, "");
          this.ingredients.push(this.currentSuggestion);
          this.model = "";
          //this.addShape();
        }
      },
      removeIngredient: function(index) {
        this.ingredients.splice(index, 1);
      },
      addShape: function() {
          // module aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

        // create an engine
        var engine = Engine.create();

        // create a renderer
        var render = Render.create({
            element: document.getElementById("main_stuff"),
            engine: engine,
            background: 'transparent'
        });

        // create two boxes and a ground
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        World.add(engine.world, [boxA, boxB, ground]);

        // run the engine
        Engine.run(engine);

        // run the renderer
        Render.run(render);
      }
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