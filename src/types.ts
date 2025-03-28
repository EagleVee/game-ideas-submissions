export enum UserVote {
    Upvote = 'upvote',
    Downvote = 'downvote',
}

export interface IdeaVoteCount {
    upvotes: number;
    downvotes: number;
}

export interface Idea extends IdeaVoteCount {
    id: number;
    description: string;
    userVote: UserVote | null;
}
