const app = Vue.createApp({
  data() {
    return {
      seasons: [],
      selectedSeason: null,
      animeList: [],
      fileNameList: [],
    };
  },
  mounted() {
    this.generateSeasonMenu();
  },
  methods: {
    generateSeasonMenu() {
      axios
        .get("./json/anime_fileList.json")
        .then((response) => {
          // ファイル名からメニューを生成
          this.fileNameList = response.data;
          this.seasons = this.fileNameList.map(
            (season) => season.JapaneseSeasonName
          );
          this.seasons = this.seasons.reverse();
          this.loadLatestAnimeList();
        })
        .catch((error) => {
          console.error("Error fetching JSON files:", error);
        });
    },
    loadAnimeList(season) {
      const fileName = this.findFileNameByJapaneseSeasonName(season);
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
    findFileNameByJapaneseSeasonName(JapaneseSeasonName) {
      for (const item of this.fileNameList) {
        if (item.JapaneseSeasonName === JapaneseSeasonName) {
          return item.fileName;
        }
      }
      return null;
    },
  },
});

app.mount("#app");
