import type { User } from '@/services/user';
import { fetchUser } from '@/services/user';
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import history from '@/utils/history';

export interface UserState {
  /** 是否登录 */
  login?: boolean;
  /** 当前用户信息 */
  user?: User;
}

type UserStateReducers = {
  /** 更新登录状态 */
  signin: CaseReducer<UserState, PayloadAction<{ user: User }>>;
  /** 退出登录 */
  signout: CaseReducer<UserState, PayloadAction<{ user: User }>>;
};

const initialState: UserState = {
  login: false,
};

/** 获取当前用户 */
export const queryCurrentUser = createAsyncThunk(
  'user/queryCurrentUser',
  async (_, { dispatch }) => {
    try {
      // if (!Cookies.get('token')) {
      //   throw new Error();
      // }
      const user = await fetchUser();
      dispatch({
        type: 'user/signin',
        payload: { user: user.data },
      });
    } catch (e) {
      history.push(`/user/login?_r=${encodeURIComponent(location.href)}`);
    }
  },
);

export const userSlice = createSlice<UserState, UserStateReducers>({
  name: 'user',
  initialState,
  reducers: {
    signin(state, { payload }) {
      return {
        ...state,
        user: payload.user,
        login: true,
      };
    },
    signout() {
      Cookies.remove('token');
      history.push('/user/login');
      return initialState;
    },
  },
});

const userSliceReducers = userSlice.reducer;

export default userSliceReducers;
