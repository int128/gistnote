export default class PromiseAction {
  static resolvedTypeOf = actionType => `${actionType}_RESOLVED`
  static resolved(actionType, payload) {
    return {
      type: PromiseAction.resolvedTypeOf(actionType),
      payload,
    };
  }

  static rejectedTypeOf = actionType => `${actionType}_REJECTED`
  static rejected(actionType, payload) {
    return {
      type: PromiseAction.rejectedTypeOf(actionType),
      payload,
    };
  }

  static invalidateTypeOf = actionType => `${actionType}_INVALIDATE`
  static invalidate(actionType) {
    return {
      type: PromiseAction.invalidateTypeOf(actionType),
    };
  }
}
