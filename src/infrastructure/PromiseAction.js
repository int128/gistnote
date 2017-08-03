export default class PromiseAction {
  static resolved(actionType, payload) {
    return {
      type: `${actionType}_RESOLVED`,
      payload,
    };
  }

  static rejected(actionType, payload) {
    return {
      type: `${actionType}_REJECTED`,
      payload,
    };
  }

  static invalidate(actionType) {
    return {
      type: `${actionType}_INVALIDATE`,
    };
  }
}
