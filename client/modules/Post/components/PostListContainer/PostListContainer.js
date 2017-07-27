import React, { PropTypes, Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';

// Import Actions
import { fetchPosts, deletePostRequest, publishRequest, pauseRequest } from '../../PostActions';

// Import Selectors
import { getPosts, getPageData } from '../../PostReducer';

import styles from './PostListContainer.css';

class PostListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    var data = {};

    if (!this.props.all) {
      data.user = this.props.id;
    }

    return this.props.dispatch(fetchPosts(data)).then(() => {
      this.setState({ loading: false });
    }).catch(() => {
      this.setState({ loading: false });
    });
  };

  handleDeletePost = (post) => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handlePausePost = (post) => {
    if (confirm('Do you want to pause this post')) { // eslint-disable-line
      this.props.dispatch(pauseRequest(post)).then(() => {
        this.fetchPosts();
      });
    }
  };

  handlePublishPost = (post) => {
    if (confirm('Do you want to publish this post')) { // eslint-disable-line
      this.props.dispatch(publishRequest(post)).then(() => {
        this.fetchPosts();
      });
    }
  };

  pageChange = (selected) => {
    let data = {
      pageNumber: selected
    };

    if (!this.props.all) {
      data.user = this.props.id;
    }

    this.props.dispatch(fetchPosts(data)).then(() => {
      this.setState({ loading: false });
    }).catch(() => {
      this.setState({ loading: false });
    });
  };

  handlePageChange = (data) => {
    this.pageChange(data.selected + 1);
  };

  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <div>
            <div className={styles[ 'list-container' ]}>
              <PostList
                handleDeletePost={this.handleDeletePost}
                handlePausePost={this.handlePausePost}
                handlePublishPost={this.handlePublishPost}
                posts={this.props.posts}
                user={this.props.user}/>
              {
                this.props.posts.length === 0 &&
                <div className={ styles[ 'error-container' ] }>
                  <h2 className={ styles[ 'error' ] }>No hay anuncios</h2>
                </div>
              }
            </div>
            <div className={styles[ 'paginator' ]}>
              {
                this.props.posts.length !== 0 ?
                  <ReactPaginate
                    previousLabel={"anterior"}
                    nextLabel={"posterior"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.props.page.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageChange}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/> : null
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.user,
    posts: getPosts(state),
    page: getPageData(state)
  };
}

PostListContainer.propTypes = {
  posts: React.PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostListContainer);
