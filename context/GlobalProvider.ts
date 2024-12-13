import {create} from 'zustand';

import {getCurrentUser} from '@/lib/appwrite';

export interface User {
   username: string;
   email: string;
   avatar: string;
   accountId: string;
   $id: string;
   $createdAt: string;
   $updatedAt: string;
   $permissions: string[];
   $databaseId: string;
   $collectionId: string;
}
interface GlobalState {
   isLogged: boolean;
   isLoading: boolean;
   setIsLogged: (isLogged: boolean) => void;
   setIsLoading: (isLoading: boolean) => void;
   user: User | null;
   setUser: (user: User | null) => void;
   fetchCurrentUser: () => Promise<void>;
}

const initialState: GlobalState = {
   isLogged: false,
   isLoading: true,
   setIsLogged: () => {},
   setIsLoading: () => {},
   user: null,
   setUser: () => {},
   fetchCurrentUser: async () => {},
};

export const useGlobalStore = create<GlobalState>((set) => ({
   ...initialState,
   setIsLogged: (isLogged: boolean) => set({isLogged}),
   setUser: (user: User | null) => set({user}),
   fetchCurrentUser: async () => {
      try {
         console.log('Fetching current user...');
         const currentUser = await getCurrentUser();

         if (currentUser) {
            set({user: currentUser, isLogged: true});
         } else {
            set({user: null, isLogged: false});
         }
      } catch (error) {
         console.error('Failed to fetch current user:', error);
         set({user: null, isLogged: false});
      } finally {
         set({isLoading: false});
      }
   },
}));
