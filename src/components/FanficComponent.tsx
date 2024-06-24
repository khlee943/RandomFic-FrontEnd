import React from 'react';

export interface Fanfic {
    id: number
    title: string;
    author: string;
    fandom: string;
    url: string;
    kudos: string;
    summary: string;
    average_sentiment: number;
}

interface FanficComponentProps {
    fanfic: Fanfic;
}

// ({ fanfic }): This is object destructuring syntax in the function parameter list.
// It extracts the fanfic property from the props object passed to the component.
const FanficComponent: React.FC<FanficComponentProps> = ({ fanfic }) => {
    return (
        <div className="fanfic">
            <h2>{fanfic.title}</h2>
            <p><strong>Author</strong>: {fanfic.author}</p>
            <p><strong>Fandom</strong>: {fanfic.fandom}</p>
            <p><strong>Kudos</strong>: {fanfic.kudos}</p>
            <p><strong>Average Sentiment</strong>: {fanfic.average_sentiment}</p>
            <a href={fanfic.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    );
};

export default FanficComponent;

/*
Import React: import React from 'react'; is necessary to use JSX syntax.
Interface Definition: interface Fanfic defines the structure of a fanfic object.
Props Interface: interface CardComponentProps defines the props expected by the CardComponent.
React Component: const CardComponent: React.FC<CardComponentProps> defines a functional component in React that takes
CardComponentProps as props and renders a card with the fanfic details.
*/