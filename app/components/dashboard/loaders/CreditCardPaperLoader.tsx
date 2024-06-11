import React from 'react';
import { PaperContainer } from '../commonStyledComponents';
import RepeatableLoader from './RepeatableLoader';

const CreditCardPaperLoader = () => {
    return (
        <PaperContainer>
            <RepeatableLoader items={3} width={400} height={100} />
        </PaperContainer>
    );
};

export default CreditCardPaperLoader;