import React from "react";
import {Idea, UserVote} from "../types.ts";
import {useIdeasContext} from "../providers/IdeasProvider.tsx";

const IdeaItem: React.FC<{ idea: Idea }> = ({ idea }) => {
    const { upvoteIdea, downvoteIdea } = useIdeasContext();

    return (
        <div className="idea-list-item">
            <p>{idea.description}</p>
            <div className="vote-section">
                <button onClick={() => upvoteIdea(idea.id)}>
                    {idea.userVote === UserVote.Upvote
                        ? 'Remove Upvote'
                        : 'Upvote'}
                </button>
                <span>{idea.upvotes} upvotes</span>

                <button onClick={() => downvoteIdea(idea.id)}>
                    {idea.userVote === UserVote.Downvote
                        ? 'Remove Downvote'
                        : 'Downvote'}
                </button>
                <span className="downvote-count">
                    {idea.downvotes} downvotes
                </span>
            </div>
            {idea.userVote && (
                <div className="voted-status">
                    You have {idea.userVote}voted this idea.
                </div>
            )}
        </div>
    );
};

export default IdeaItem
