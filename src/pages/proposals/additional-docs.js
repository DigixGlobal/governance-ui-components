import React from 'react';
import PropTypes from 'prop-types';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';
import { Content, SubTitle } from '@digix/gov-ui/pages/proposals/style';
import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';
import { dijix } from '@digix/gov-ui/utils/dijix';

export default class AdditionalDocs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  componentWillMount = () => {
    const {
      proposal: {
        data: { proposalVersions },
      },
    } = this.props;
    const latestVersion = proposalVersions[proposalVersions.length - 1];
    const { moreDocs } = latestVersion;

    const moreDocsReducer = (acc, currentValue) => {
      if (!currentValue.docs) return undefined;
      const data = currentValue.docs.map(d => d);
      acc.push({ docs: data, created: currentValue.created });
      return acc;
    };

    const ipfs = moreDocs.reduce(moreDocsReducer, []);

    try {
      if (ipfs) {
        return Promise.all(
          ipfs.map(d => fetchImages(d.docs).then(file => ({ file, created: d.created })))
        ).then(files => this.setState({ files }));
      }
    } catch (error) {
      // do nothing
    }
  };

  render() {
    const {
      translations: { project },
      proposal: {
        data: { proposalVersions },
      },
    } = this.props;
    const { files } = this.state;
    const latestVersion = proposalVersions[proposalVersions.length - 1];
    const { moreDocs } = latestVersion;

    if (!moreDocs || moreDocs.length === 0) return null;
    return (
      <Content>
        <SubTitle>{project.updates || 'Updates'}</SubTitle>
        {files.map(data =>
          data.file.map((f, i) => {
            const source = `${dijix.config.httpEndpoint}/${f.src}`;
            if (f.type === 'image') {
              return <img src={source} alt="" key={`img-${i + 1}`} />;
            } else if (f.type === 'pdf') return <PDFViewer file={source} key={`pdf-${i + 1}`} />;

            return null;
          })
        )}
      </Content>
    );
  }
}

const { object } = PropTypes;
AdditionalDocs.propTypes = {
  translations: object.isRequired,
  proposal: object.isRequired,
};
