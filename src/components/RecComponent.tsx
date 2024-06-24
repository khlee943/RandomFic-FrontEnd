import React from 'react';
import FanficComponent, { Fanfic } from './FanficComponent';

interface RecommendationComponentProps {
    recommendation: Fanfic | null;
    error: string | null;
}

const RecommendationComponent: React.FC<RecommendationComponentProps> = ({ recommendation, error }) => {
    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (recommendation) {
        return (
            <div>
                <h2>{recommendation.title}</h2>
                <p><strong>Author</strong>: {recommendation.author}</p>
                <p><strong>Fandom</strong>: {recommendation.fandom}</p>
                <p><strong>Kudos</strong>: {recommendation.kudos}</p>
                <a href={recommendation.url}>Read more</a>
            </div>
        );
    }

    return <p>Enter a description to get a recommendation.</p>;
};

export default RecommendationComponent;
