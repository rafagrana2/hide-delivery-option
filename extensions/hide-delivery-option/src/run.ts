import type {
  RunInput,
  FunctionRunResult,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  const hideDeliveryOption = input.cart?.buyerIdentity?.customer?.hasAnyTag;

  if (hideDeliveryOption) {
    let toHide = input.cart.deliveryGroups
      .flatMap(group => group.deliveryOptions)
      .filter(option => option.title === 'Standard')
      .map(option => ({
        hide: {
          deliveryOptionHandle: option.handle
        }
      }));

    return {
      operations: toHide
    };
  }

  return {
    operations: []
  };
}