const app = Vue.createApp({
  data() {
    return {
      seasons: [],
      selectedSeason: null,
      animeList: [],
    };
  },
  mounted() {
    this.generateSeasonMenu();
  },
  methods: {
    generateSeasonMenu() {
      axios
        .get("./json/")
        .then((response) => {
          // ファイル名からメニューを生成
          this.seasons = response.data.map((file) => {
            const year = file.split("_")[0];
            const season = file.split("_")[1];
            const EnglishTojapanese = {
              spring: "春",
              summer: "夏",
              autumn: "秋",
              winter: "冬",
            };
            return `${year.slice(2)}年 ${EnglishTojapanese[season]}`;
          });
          this.seasons = this.seasons.reverse();
          this.loadLatestAnimeList();
        })
        .catch((error) => {
          console.error("Error fetching JSON files:", error);
        });
    },
    loadAnimeList(season) {
      const seasonName = this.convertToFileName(season);
      const fileName = `${seasonName}_animaList.json`;
      axios
        .get(`./json/${fileName}`)
        .then((response) => {
          this.selectedSeason = season;
          this.animeList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching anime data:", error);
        });
    },
    loadLatestAnimeList() {
      const latestSeason = this.seasons.length > 0 ? this.seasons[0] : null;
      if (latestSeason) {
        this.loadAnimeList(latestSeason);
      }
    },
    convertToFileName(season) {
      const [year, seasonName] = season.split(" ");
      const englishToJapanese = {
        spring: "春",
        summer: "夏",
        autumn: "秋",
        winter: "冬",
      };
      let englishSeason = "";
      for (const key in englishToJapanese) {
        if (englishToJapanese[key] === seasonName) {
          englishSeason = key;
        }
      }
      return `20${year.slice(0, 2)}_${englishSeason}`;
    },
  },
});

app.mount("#app");
