import React from 'react';
import { translate } from 'react-i18next';

const RaidInfo = (props) => {
  const {
    type,
    time,
    location,
    description,
    verified,
  } = props.raid;
  const { t } = props;

  return (
    <div className="raidInfo">
      <div className="raidStat col-xs-2"> <h1>{t('RaidInfo:time')}</h1> <p>{time}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('RaidInfo:loc')}</h1> <p>{location}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('RaidInfo:type')}</h1> <p>{type}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('RaidInfo:desc')}</h1> <p>{description}</p> </div >
      <div className="raidStat col-xs-2"> <h1>{t('RaidInfo:ver')}</h1> <p>{verified?'true':'false'}</p> </div >
    </div>
  );
};

export default translate(['defaultNamespace'], { wait: true })(RaidInfo);
