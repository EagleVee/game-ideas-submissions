import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Idea, UserVote } from '../types.ts';

interface IdeasContextValue {
    ideas: Idea[];
    addIdea: (description: string) => void;
    upvoteIdea: (id: number) => void;
    downvoteIdea: (id: number) => void;
}

const IdeasContext = createContext<IdeasContextValue>({
    ideas: [],
    addIdea: () => null,
    upvoteIdea: () => null,
    downvoteIdea: () => null,
});

const LOCAL_STORAGE_KEY = 'ideas';

export const IdeasProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [ideas, setIdeas] = useState<Idea[]>(() => {
        const storedIdeas = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedIdeas ? JSON.parse(storedIdeas) : [];
    });

    const updateIdeas = (updatedIdeas: Idea[]) => {
        setIdeas(updatedIdeas);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedIdeas));
    };

    const addIdea = (description: string) => {
        const trimmed = description.trim();
        if (!trimmed.length) return;

        const newIdea: Idea = {
            id: Date.now(),
            description: trimmed,
            upvotes: 0,
            downvotes: 0,
            userVote: null,
        };
        const updated = [newIdea, ...ideas];
        updateIdeas(updated);
    };

    const upvoteIdea = (id: number) => {
        const updated = ideas.map((idea) => {
            if (idea.id !== id) return idea;

            if (idea.userVote === UserVote.Upvote) {
                return {
                    ...idea,
                    userVote: null,
                    upvotes: Math.max(idea.upvotes - 1, 0),
                };
            }

            if (idea.userVote === UserVote.Downvote) {
                return {
                    ...idea,
                    userVote: UserVote.Upvote,
                    downvotes: Math.max(idea.downvotes - 1, 0),
                    upvotes: idea.upvotes + 1,
                };
            }

            return {
                ...idea,
                userVote: UserVote.Upvote,
                upvotes: idea.upvotes + 1,
            };
        });

        updateIdeas(updated);
    };

    const downvoteIdea = (id: number) => {
        const updated = ideas.map((idea) => {
            if (idea.id !== id) return idea;

            if (idea.userVote === UserVote.Downvote) {
                return {
                    ...idea,
                    userVote: null,
                    downvotes: idea.downvotes - 1,
                };
            }

            if (idea.userVote === UserVote.Upvote) {
                return {
                    ...idea,
                    userVote: UserVote.Downvote,
                    upvotes: idea.upvotes - 1,
                    downvotes: idea.downvotes + 1,
                };
            }

            return {
                ...idea,
                userVote: UserVote.Downvote,
                downvotes: idea.downvotes + 1,
            };
        });

        updateIdeas(updated);
    };

    const value: IdeasContextValue = {
        ideas,
        addIdea,
        upvoteIdea,
        downvoteIdea,
    };

    return (
        <IdeasContext.Provider value={value}>{children}</IdeasContext.Provider>
    );
};

export const useIdeasContext = (): IdeasContextValue => {
    return useContext(IdeasContext);
};
