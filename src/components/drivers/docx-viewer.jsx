// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component, Fragment } from 'react';
import mammoth from 'mammoth';

import 'styles/docx.scss';
import Loading from '../loading';

export default class extends Component {
  state = {
    loading: true
  }
  
  componentDidMount() {
    const jsonFile = new XMLHttpRequest();
    jsonFile.open('GET', this.props.filePath, true);
    jsonFile.send();
    jsonFile.responseType = 'arraybuffer';
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        mammoth.convertToHtml(
          { arrayBuffer: jsonFile.response },
          { includeDefaultStyleMap: true },
        )
        .then((result) => {
          const docEl = document.createElement('div');
          docEl.className = 'document-container';
          docEl.innerHTML = result.value;
          document.getElementById('docx').innerHTML = docEl.outerHTML;
        })
        .catch((a) => {
          console.log('alexei: something went wrong', a);
        })
        .then(() => {
          this.setState({loading: false})
        })
        .done();
      }
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.loading && (this.props.loader || <Loading />)}
        <div id="docx">
        </div>
      </Fragment>
    );
  }
}
