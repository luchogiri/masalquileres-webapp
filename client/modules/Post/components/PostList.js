import React, { Component, PropTypes } from 'react';

// Import Components
import PostListItem from './PostListItem/PostListItem';

class PostList extends Component {
  render() {
    return (
      <div className="listView">
        {
          this.props.posts.map(post => (
            <PostListItem
              user={this.props.user}
              post={post}
              key={post._id}
              onDelete={() => this.props.handleDeletePost(post._id)}
              onPause={() => this.props.handlePausePost(post)}
              onPublish={() => this.props.handlePublishPost(post)}
            />
          ))
        }
      </div>
    );
  }
}

PostList.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handlePausePost: PropTypes.func.isRequired,
  handlePublishPost: PropTypes.func.isRequired,
};

export default PostList;
