import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

import { currency_symbol } from '../../../../../shared/constants';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div>
      <div className={styles.rowResults}>
        <img className={styles.imagen} src={ props.post.uploads[0] && props.post.uploads[0].url } />
        <div className={styles.info}>
          <h4>
            <Link className={styles.linkh4} to={`/posts/${props.post._id}`} >
              { props.post.title || 'Sin Titulo' }
            </Link>
          </h4>
          <ul>
            <li><strong>Precio:</strong> { currency_symbol[props.post.currency] }{props.post.price}</li>
            <li><strong>Publicada:</strong> { props.post.published ? 'SI' : 'NO' }</li>
            <li><strong>Verificada:</strong> { props.post.verified ? 'SI' : 'NO' }</li>
          </ul>
          <h5 className={styles.linksbottom}>
            <span><Link to={`/posts/edit/${props.post._id}`} >editar</Link></span>
            <span><a href="#" onClick={props.onDelete}>borrar</a></span>
            { props.post.published && props.user.rol === 'admin' && <span><a href="#" onClick={props.onPause}>pausar</a></span> }
            { !props.post.published && props.user.rol === 'admin' && <span><a href="#" onClick={props.onPublish}>publicar</a></span> }
          </h5>
        </div>
      </div>
    </div>
  );
}

PostListItem.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
};

export default PostListItem;
