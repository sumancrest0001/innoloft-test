import React, { Suspense } from 'react';

function WaitingComponent(Component) {
    // eslint-disable-next-line react/display-name
    return (props) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
}

const LazyComponent = (importer) => WaitingComponent(React.lazy(importer));

export default LazyComponent;
