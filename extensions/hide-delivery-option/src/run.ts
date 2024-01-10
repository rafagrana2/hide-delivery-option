import type {
  RunInput,
  FunctionRunResult,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  const hideStandard = input.cart?.attribute?.value === 'hideStandard';

  if (hideStandard) {
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
  } else {
    let toHide = input.cart.deliveryGroups
    .flatMap(group => group.deliveryOptions)
    .filter(option => option.title === 'Express')
    .map(option => ({
      hide: {
        deliveryOptionHandle: option.handle
      }
    }));

    return {
      operations: toHide
    };
  }
}