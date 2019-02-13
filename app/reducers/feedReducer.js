/* User Reducer
 * app 用户信息中心
 */
import createReducer from 'app/lib/createReducer';
import * as types from '../actions/types';

const initialState = {
    // 客户端被用户点击不感兴趣的feed
    dislikeFeed: {},
};

export const feedReducer = createReducer(initialState, {
    [types.FEED_SET_LIST](state, {category, list, hasMore}) {
        state[category] = list;
        state[`${category}_hasMore`] = hasMore;
        return {...state};
    },
    [types.FEED_APPEND_LIST](state, {list, category, hasMore}) {
        const oldlist = state[category] || [];
        // state[category] = [...oldlist, ...list];

        if (!state.dislikeFeed[category]) {
            state.dislikeFeed[category] = [];
        }

        state[category] = [...oldlist, ...list].filter(item=>{
            return state.dislikeFeed[category].indexOf(item._id) === -1;
        });
        state[`${category}_hasMore`] = hasMore;
        return {...state};
    },
    [types.FEED_PREPEND_LIST](state, {list, category, hasMore}) {
        // const oldlist = state[category] || [];
        // state[category] = [...list,...oldlist];
        if (!state.dislikeFeed[category]) {
            state.dislikeFeed[category] = [];
        }
        state[category] = list.filter(item=>{
            return  state.dislikeFeed[category].indexOf(item._id) === -1;
        });
        state[`${category}_hasMore`] = hasMore;
        return {...state};
    },
    [types.FEED_REFRESH_LIST](state, {category}) {
        state[category] = [];
        state[`${category}_hasMore`] = true;
        return {...state};
    },

    [types.FEED_LIST_LIKE](state, {payload: {category, params}}) {
        const list = state[category];
        const targetItem = list.find(item=>item._id === params._id);
        let actionValue = targetItem.userAction.actionValue;
        targetItem.userAction.actionValue = !actionValue;
        targetItem.likeNum = !actionValue ? Number(targetItem.likeNum) + 1 : Number(targetItem.likeNum) - 1;
        state[category] = [...state[category]];
        return {...state};
    },

    [types.FEED_ITEM_CHANGE](state, {payload: {category, params}}) {
        const list = state[category];
        const targetItem = list.find(item=>item._id === params._id);
        Object.assign(targetItem,params)
        state[category] = [...state[category]];
        return {...state};
    },

    [types.FEED_ROMEVE_ITEM](state, {payload: {category,item}}) {
        const list = state[category];
        // 添加不感兴趣的feedID
        if (!state.dislikeFeed[category]) {
            state.dislikeFeed[category] = [];
        }
        state.dislikeFeed[category] = [...state.dislikeFeed[category], item._id];

        const targetIndex = list.findIndex(i=>i._id === item._id);
        list.splice(targetIndex,1);
        state[category] = [...state[category]];
        return {...state};
    },

});
