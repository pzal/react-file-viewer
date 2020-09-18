// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component, Fragment } from 'react';

import 'styles/video.scss';
import Loading from '../loading';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  onCanPlay() {
    this.setState({ loading: false });
  }

  renderLoading() {
    if (this.state.loading) {
      return this.props.loader || <Loading />;
    }
    return null;
  }

  render() {
    const visibility = this.state.loading ? 'hidden' : 'visible';
    return (
      <Fragment>
        {this.renderLoading()}
        <div className="pg-driver-view">
          <div className="video-container">
            <video
              style={{ visibility }}
              controls
              type={`video/${this.props.fileType}`}
              onCanPlay={e => this.onCanPlay(e)}
              src={this.props.filePath}
            >
              Video playback is not supported by your browser.
            </video>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VideoViewer;
