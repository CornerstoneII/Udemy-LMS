import React, { Component } from "react";
import YTSearch from "youtube-api-v3-search";
import _ from "lodash";

import SearchBar from "./searchBar";
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";
import "./style.css";
import NavBar from "./NavBar";

const YT_API = "AIzaSyAAavBuxkGBogQYZY7rWjWx3HQJjBX0Dho";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.searchYoutube("");
  }

  videoSearch = _.debounce((term) => {
    this.searchYoutube(term);
  }, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar siteTitle="React Youtube App" />
        <div className="container">
          <SearchBar
            onChange={(searchTerm) => {
              this.videoSearch(searchTerm);
            }}
          />
          <VideoPlayer video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={(selectedVideo) => {
              this.setState({ selectedVideo });
            }}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
