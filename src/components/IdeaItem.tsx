import React from 'react';
import { Idea, UserVote } from '../types.ts';
import { useIdeasContext } from '../providers/IdeasProvider.tsx';
import UpvoteIcon from '../assets/upvote.svg?react';
import DownvoteIcon from '../assets/downvote.svg?react';

const IdeaItem: React.FC<{ idea: Idea }> = ({ idea }) => {
    const { upvoteIdea, downvoteIdea } = useIdeasContext();

    return (
        <div className="idea-list-item">
            <p>{idea.description}</p>
            <div className="vote-section">
                <button
                    onClick={() => upvoteIdea(idea.id)}
                    className={`vote-btn ${idea.userVote === UserVote.Upvote && 'vote-btn-active'}`}
                >
                    <UpvoteIcon
                        width="1rem"
                        height="1rem"
                        fill={
                            idea.userVote === UserVote.Upvote
                                ? '#D93900'
                                : 'white'
                        }
                    />
                    <p className="vote-count">{idea.upvotes}</p>
                </button>

                <button
                    onClick={() => downvoteIdea(idea.id)}
                    className={`vote-btn ${idea.userVote === UserVote.Downvote && 'vote-btn-active'}`}
                >
                    <DownvoteIcon
                        width="1rem"
                        height="1rem"
                        fill={
                            idea.userVote === UserVote.Downvote
                                ? '#D93900'
                                : 'white'
                        }
                    />
                    <p className="vote-count">{idea.downvotes}</p>
                </button>
            </div>
        </div>
    );
};

export default IdeaItem;
