import React from 'react';

export default function () {
  const children = [];
  for (let idx = 0; idx < 3; ++idx) {
    children.push(<div key={idx} className="u-flexColumn lp-size4of12 lp-loader-item">
      <div className="linePlaceholder"></div>
      <div className="linePlaceholder"></div>
      <div className="linePlaceholder linePlaceholder--truncated"></div>
      <div className="lp-flex lp-marginTop10 lp-loader-down">
        <div className="lp-flex0 avatarPlaceholder lp-size36x36"></div>
        <div className="lp-flex1">
          <div className="linePlaceholder linePlaceholder--thin linePlaceholder--medium"></div>
          <div className="linePlaceholder linePlaceholder--thin linePlaceholder--small"></div>
        </div>
      </div>
    </div>);
  }
  return (<div className="lp-flex lp-loader">
    {children}
  </div>);
}
