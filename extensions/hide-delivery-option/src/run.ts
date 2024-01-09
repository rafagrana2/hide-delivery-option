import type {
  RunInput,
  FunctionRunResult,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  // Check if the customer has the 'hide' tag
  const hideDeliveryOption = input.cart?.buyerIdentity?.customer?.hasAnyTag;

  if (hideDeliveryOption) {
    // Collect the delivery options
    let toHide = input.cart.deliveryGroups
      .flatMap(group => group.deliveryOptions)
      // Construct a hide operation for each delivery option
      .filter(option => option.title === 'Standard')
      .map(option => ({
        hide: {
          deliveryOptionHandle: option.handle
        }
      }));

    // Return the operations
    return {
      operations: toHide
    };
  }

  // If the customer doesn't have the 'hide' tag, no operations are needed
  return {
    operations: []
  };
}