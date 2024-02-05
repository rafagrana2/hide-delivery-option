import type {
  RunInput,
  FunctionRunResult,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  if (input.cart.deliveryGroups.some(group => group.deliveryAddress?.countryCode === 'AT')) {
    const hideStandard = input.cart?.attribute?.value === 'hideStandard';
  
    if (hideStandard) {
      let toHide = input.cart.deliveryGroups
        .flatMap(group => group.deliveryOptions)
        .filter(option => option.title === 'Standardversand Österreich')
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
      .filter(option => option.title === 'Standard Versand Österreich')
      .map(option => ({
        hide: {
          deliveryOptionHandle: option.handle
        }
      }));
  
      return {
        operations: toHide
      };
    }
  } else {
    return {
      operations: []
    }
  }
}