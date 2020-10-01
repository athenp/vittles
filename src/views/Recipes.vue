<template>
  <v-app>
    <v-main :style="{background: $vuetify.theme.themes[theme].primary}">
      <v-container class="ma-0 pa-0" fill-height fluid>
        <div class="mb-4 mt-4 pl-4 white--text">Results matching these ingredients: {{ searchedIngredients }}</div>
        <v-card>
          <!-- <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title> -->
          <v-data-table class="hoverTable" :headers="headers" :items="desserts" :items-per-page="20" hide-default-footer></v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import npyjs from '/Users/athenpellicci/Desktop/vittles/node_modules/npyjs/index.js'

export default {
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  data () {
      return {
        searchedIngredients: this.$store.state.searchedIngredients,
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    methods: {
        matchRecipes: function() {
            let n = new npyjs();
            n.load("simplified-recipes-1M.npz", (array, shape) => {
            // `array` is a one-dimensional array of the raw data
            // `shape` is a one-dimensional array that holds a numpy-style shape.
            console.log(`You loaded an array with ${array.length} elements and ${shape.length} dimensions.`);
            });
        }
    },
    mounted() {
      this.matchRecipes();
    }
};
</script>

<style>
.v-sheet.v-card {
    border-radius: 0;
    width: 100%;
}
.v-card__title {
    padding-top: 0px;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none;
}
.theme--light.v-card {
    background-color: transparent;
}
.v-data-table-header {
    color: white !important;
}
.theme--light.v-data-table {
    background-color: transparent;
    color: white;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom-color: white;
}
.hoverTable tr:hover {
    background-color:#bc5f43 !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    color: white;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    border-bottom-color: white;
}
.theme--light.v-data-table .v-data-footer {
    border-top-color: white;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: white;
}
.theme--light.v-select .v-select__selection--comma {
    color: white;
}
.theme--light.v-icon {
    color: white;
}
</style>