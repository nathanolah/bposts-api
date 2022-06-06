const axios = require("axios");
const async = require("async");

class DataSource {
  constructor() {
    this.tags = [];
    this.functionArray;
  }

  setTags(tags) {
    this.tags = tags;
  }

  pingApi = async (tag) => {
    return await new Promise((resolve, reject) => {
      axios
        .get(`${process.env.API_URL_TAG_QUERY}${tag}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  getApi = async (tag, callback) => {
    return await new Promise((resolve, reject) => {
      axios
        .get(`${process.env.API_URL_TAG_QUERY}${tag}`)
        .then((res) => {
          resolve(callback("", res));
        })
        .catch((error) => {
          console.error(error);
          reject(callback(error, ""));
        });
    });
  };

  get functionArray() {
    return this.tags.map((tag) => {
      return (callback) => this.getApi(tag, callback);
    });
  }

  getPosts = async (tags) => {
    return await new Promise((resolve, reject) => {
      this.setTags(tags);

      // Based on the amount of tags, this performs a get request for each tag in parallel
      async.parallel(this.functionArray, (err, results) => {
        if (err) {
          console.error("error: ", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
}

module.exports = new DataSource();
