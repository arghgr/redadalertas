import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { loadRaids } from './actions';
import RaidInfo from '../../components/RaidInfo';

class Dashboard extends Component {

  render() {
    const {
      t,
      raids
    } = this.props;

    return (
      <div className="dashboard">
        <h2>{t('Dashboard.title')}</h2>
        {
          raids.map(raid => (
            <RaidInfo
              key={raid.id}
              raid={raid}
              verifyRaid={this.props.verifyRaid}
            />
          ))
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    raids: state.dashboard.raids,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadRaids,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(['defaultNamespace'], { wait: true })(Dashboard));
