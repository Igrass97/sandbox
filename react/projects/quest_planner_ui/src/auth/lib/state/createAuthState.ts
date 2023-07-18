import { create } from 'zustand';

/*
 * This is the base state for the auth state.
 * It is used to extend the state with additional properties.
 */
export interface IAuthState<UserType> {
  user: UserType | null;
  updateUser: (userUpdate: Partial<UserType>) => void;
  setUser: (user: UserType | null) => void;
  removeUser: () => void;
}

/*
 * This is the function that creates the auth state.
 * It takes a two generic types. The first is the user type and the second is the auth state.
 * It also takes a function that extends the state with additional properties.
 */
export function createAuthState<UserType>() {
  return create<IAuthState<UserType>>((set, get) => {
    const store: IAuthState<UserType> = {
      user: null,
      updateUser: (userUpdate: Partial<UserType>) => {
        const { user } = get();

        if (!user) return;

        set({ user: { ...user, ...userUpdate } });
      },
      setUser: user => set(() => ({ user })),
      removeUser: () => set({ user: null }),
    };

    return store;
  });
}

export default createAuthState;
