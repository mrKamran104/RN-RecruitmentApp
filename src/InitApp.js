import React from 'react';
import Routing from './routers/index';
import StartRouter from './routers/StartRouter';
import { connect } from 'react-redux';

function InitApp(props) {
  return (
    <>
      {!props.login ?
        <StartRouter /> :
          <Routing />
      }
    </>
  );
};

function mapStateToProp(state) {
  return ({
    login: state.root.login
  })
}

export default connect(mapStateToProp)(InitApp);
// export default InitApp

