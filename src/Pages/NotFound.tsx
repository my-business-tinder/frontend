import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return (
      <div style={{paddingLeft: 20}}>
        <h1>404 Not Found</h1>
        <Link to='/my-account'>
            <div> Go to main page</div>
        </Link>
      </div>
  );
}

export default NotFoundPage;
