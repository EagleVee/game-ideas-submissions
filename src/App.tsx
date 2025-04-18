import React, { useState, ChangeEvent, FormEvent, useMemo } from 'react';
import { IdeasProvider, useIdeasContext } from './providers/IdeasProvider';
import './App.css';
import IdeaItem from './components/IdeaItem.tsx';

const App: React.FC = () => {
    return (
        <IdeasProvider>
            <MainUI />
        </IdeasProvider>
    );
};

const MainUI: React.FC = () => {
    const { ideas, addIdea } = useIdeasContext();

    const [description, setDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'upvotes' | 'downvotes' | ''>('');

    const displayIdeas = useMemo(() => {
        const filteredIdeas = searchQuery
            ? ideas.filter((idea) =>
                  idea.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
              )
            : ideas;

        const sortedIdeas = sortBy
            ? filteredIdeas.sort((a, b) => {
                  if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
                  if (sortBy === 'downvotes') return b.downvotes - a.downvotes;
                  return 0;
              })
            : filteredIdeas;

        return sortedIdeas;
    }, [ideas, searchQuery, sortBy]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addIdea(description);
        setDescription('');
    };

    return (
        <main className="app-container">
            <h1>Game Idea Submission</h1>

            <form onSubmit={handleSubmit} className="idea-form">
                <label htmlFor="idea-input">Add New Idea:</label>
                <div className="form-row">
                    <textarea
                        id="idea-input"
                        placeholder="Enter your game ideas..."
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <div className="search-sort">
                <input
                    type="text"
                    placeholder="Search ideas..."
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                    }
                />
                <select
                    value={sortBy}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setSortBy(
                            e.target.value as 'upvotes' | 'downvotes' | '',
                        )
                    }
                >
                    <option value="">None</option>
                    <option value="upvotes">Upvotes</option>
                    <option value="downvotes">Downvotes</option>
                </select>
            </div>

            {displayIdeas.map((idea) => (
                <IdeaItem key={idea.id} idea={idea} />
            ))}
        </main>
    );
};

export default App;
