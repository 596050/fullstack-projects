import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SongList extends Component {
  renderSongs() {
    if (!this.props.data.loading) return <div>Loading...</div>;
    return this.props.data.songs.map(song => {
      return <li key={song.id}>{song.title}</li>;
    });
  }
  render() {
    return (
      <div>
        <ul>{this.renderSongs()}</ul>
      </div>
    );
  }
}

const query = gql`
  query {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
