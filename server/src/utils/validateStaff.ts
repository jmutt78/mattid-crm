import { StaffInput } from './../resolvers/staff';

export const validateStaff = (input: StaffInput) => {
  if (input.name.length <= 2) {
    return [
      {
        field: 'name',
        message: 'length must be greater than 2',
      },
    ];
  }

  return null;
};
