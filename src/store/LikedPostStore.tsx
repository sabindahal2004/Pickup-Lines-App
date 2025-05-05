import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../types/Post';

interface LikedPostsStore {
  likedPosts: Post[];
  addLikedPost: (post: Post) => void;
  removeLikedPost: (postId: string) => void;
}

const useLikedPostsStore = create<LikedPostsStore>()(
  persist(
    set => ({
      likedPosts: [],
      addLikedPost: post =>
        set(state => ({
          likedPosts: [...state.likedPosts, post],
        })),
      removeLikedPost: postId =>
        set(state => ({
          likedPosts: state.likedPosts.filter(post => post.id !== postId),
        })),
    }),
    {
      name: 'liked-posts',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useLikedPostsStore;
