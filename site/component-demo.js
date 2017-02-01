import React, {PropTypes} from 'react';

import * as Boundless from '../exports';
import LinkedHeaderText from './linked-header-text';

function getPackageIndexURI(name) {
    return `https://api.github.com/repos/enigma-io/boundless/contents/packages/${name}/demo/index.js`;
}

const ComponentDemo = ({demo, name, prettyName = 'Demo'}) => (
    <div className='demo-section-wrapper'>
        <LinkedHeaderText component='h3'>
            {prettyName}
        </LinkedHeaderText>

        <div className='demo-section-example'>
            {React.createElement(demo)}
        </div>

        <Boundless.ProgressiveDisclosure
            className='demo-implementation-disclosure'
            teaser='Show Implementation'
            teaserExpanded='Hide Implementation'>
            {() => (
                <Boundless.Async childrenDidRender={() => window.Prism.highlightAll()}>
                    {fetch(getPackageIndexURI(name)).then(
                        (response) => response.ok ? response.json() : response.statusText,
                        (error) => error.message,
                    ).then((payload) => {
                        if (typeof payload === 'string') {
                            return <p>There was a network failure retrieving the demo source ({payload}).</p>;
                        }

                        return (
                            <pre className='demo-implementation'>
                                <code className='language-jsx'>
                                    {atob(payload.content)}
                                </code>
                            </pre>
                        );
                    })}
                </Boundless.Async>
            )}
        </Boundless.ProgressiveDisclosure>
    </div>
);

ComponentDemo.propTypes = {
    demo: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    prettyName: PropTypes.string,
};

export default ComponentDemo;
