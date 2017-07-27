import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactPaginate from 'react-paginate';

import ProfileContainer from '../../components/ProfileContainer';

import styles from './UserList.css';

import { getUsers } from '../../UserActions';

class UserList extends Component {

  state = {
    loading: true
  };

  componentDidMount() {
    this.fetchUsers(0);
  }

  fetchUsers = (selected) => {
    this.props.dispatch(getUsers({
        pageNumber: selected
      }))
      .then(res => {
        this.setState({
          users: res,
          loading: false
        });
      });
  };

  handlePageChange = (data) => {
    this.fetchUsers(data.selected+1);
  };

  render() {
    return (
      <div>
        <ProfileContainer user={this.props.user} active="users">
          <div className={styles.main}>
            <div className={styles.items}>
              <h2 className={styles.title}>
                USUARIOS
              </h2>
              {
                !this.state.loading &&
                this.state.users.items.map((user) => (
                  <div className={styles.item} key={user._id}>
                    <Link className={styles.imgContainer} to={`/user/${user._id}`}
                         style={{
                           background: `#FFF url(${user.avatar || `http://graph.facebook.com/${ user.facebook_id }/picture?type=large`}) center`,
                           backgroundSize: 'cover'
                         }}>
                    </Link>
                    <div className={styles.info}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Email</div>
                        <div className={styles.infoValue}>{ user.email }</div>
                      </div>
                      {
                        user.first_name &&
                        <div className={styles.infoItem}>
                          <div className={styles.infoLabel}>Nombre</div>
                          <div className={styles.infoValue}>{ user.first_name } { user.last_name }</div>
                        </div>
                      }
                      <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Verificado</div>
                        <div className={styles.infoValue}>{ user.verified ? 'SI' : 'NO' }</div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className={styles.paginator}>
              {
                this.state.users && this.state.users.items.length !== 0 &&
                <ReactPaginate
                  previousLabel={"anterior"}
                  nextLabel={"posterior"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.users.totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageChange}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
              }
            </div>
          </div>
        </ProfileContainer>
      </div>
    );
  }

}

export default connect(state => state)(UserList);
