import { StoreGoalInput } from '../resolvers/storeGoal';

export const validateStoreGoal = (input: StoreGoalInput) => {
  if (input.goal.length <= 2) {
    return [
      {
        field: 'name',
        message: 'length must be greater than 2',
      },
    ];
  }
  if (input.goal.length <= 2) {
    return [
      {
        field: 'goal',
        message: 'length must be greater than 2',
      },
    ];
  }

  return null;
};
