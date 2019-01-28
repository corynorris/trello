export const CREATE_CARD_BEGIN = "CREATE_CARD_BEGIN";
export const UPDATE_CARD_BEGIN = "UPDATE_CARD_BEGIN";

export function createCard(channel, data) {
  return dispatch => {
    const topic = "cards:create";
    channel.push(topic, { card: data });
    dispatch(createCardBegin());
  };
}

export const createCardBegin = () => ({
  type: CREATE_CARD_BEGIN
});

export function updateCard(channel, data) {
  console.log("updating card: ", data);
  return dispatch => {
    const topic = "cards:update";
    channel.push(topic, { card: data });
    dispatch(updateCardBegin());
  };
}

export const updateCardBegin = () => ({
  type: UPDATE_CARD_BEGIN
});
