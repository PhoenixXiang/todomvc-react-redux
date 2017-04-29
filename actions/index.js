import * as types from '../constants/ActionTypes';

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    })
    return action;
  }
}
export const addTodo = makeActionCreator(types.ADD_TODO, "text");
export const deleteTodo = makeActionCreator(types.DELETE_TODO, "id");
export const editTodo = makeActionCreator(types.EDIT_TODO, ["id","text"]);
export const completeTodo = makeActionCreator(types.COMPLETE_TODO, "id");
export const completeAll = makeActionCreator(types.COMPLETE_ALL,[]);
export const clearCompleted = makeActionCreator(types.CLEAR_COMPLETED,[]);


// export function addTodo(text) {
//   return { type: types.ADD_TODO, text };
// }

// export function deleteTodo(id) {
//   return { type: types.DELETE_TODO, id };
// }

// export function editTodo(id, text) {
//   return { type: types.EDIT_TODO, id, text };
// }

// export function completeTodo(id) {
//   return { type: types.COMPLETE_TODO, id };
// }

// export function completeAll() {
//   return { type: types.COMPLETE_ALL };
// }

// export function clearCompleted() {
//   return { type: types.CLEAR_COMPLETED };
// }
