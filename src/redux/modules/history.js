const LOAD = 'redux-example/history/LOAD';
const LOAD_SUCCESS = 'redux-example/history/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/history/LOAD_FAIL';
const SEND_SUCCESS = 'redux-example/send/SEND_SUCCESS';

const initialState = {
  success: false,
  history: [],
  fail: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        success: false,
        history: [],
        fail: {}
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        success: true,
        history: action.result,
        fail: {}
      };
    case LOAD_FAIL:
      return {
        ...state,
        success: false,
        history: [],
        fail: action.error
      };
    // TODO maybe reload history on SEND_SUCCESS?
    case SEND_SUCCESS:
      return {
        ...state,
        history: state.history.concat([{source_amount: action.result.source_amount}])
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/history')
  };
}