export const CREATE_LIST_BEGIN = "CREATE_LIST_BEGIN";
export const UPDATE_LIST_BEGIN = "UPDATE_LIST_BEGIN";

export function createList(channel, data) {
  return dispatch => {
    const topic = "lists:create";
    channel.push(topic, { list: data });
    dispatch(createListBegin());
  };
}

export const createListBegin = () => ({
  type: CREATE_LIST_BEGIN
});

export function updateList(channel, data) {
  console.log("updating list: ", data);
  return dispatch => {
    const topic = "lists:update";
    channel.push(topic, { list: data });
    dispatch(updateListBegin());
  };
}

export const updateListBegin = () => ({
  type: UPDATE_LIST_BEGIN
});
