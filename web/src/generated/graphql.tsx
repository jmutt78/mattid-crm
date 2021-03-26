import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  staffs: PaginatedStaff;
  staff?: Maybe<Staff>;
};


export type QueryStaffsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryStaffArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  role: Scalars['String'];
  email: Scalars['String'];
  customerType: Scalars['String'];
  ccLast4: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedStaff = {
  __typename?: 'PaginatedStaff';
  staffs: Array<Staff>;
  hasMore: Scalars['Boolean'];
};

export type Staff = {
  __typename?: 'Staff';
  id: Scalars['Float'];
  name: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  updateAuth: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  createSubscription: UserResponse;
  reSubribeUserNewCC: UserResponse;
  reSubribeUserExistingCC: UserResponse;
  changeCreditCard: UserResponse;
  cancelSubscription: UserResponse;
  logout: Scalars['Boolean'];
  createStaff: StaffResponse;
  updateStaff?: Maybe<Staff>;
  deleteStaff: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateAuthArgs = {
  input: UserAuthInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateSubscriptionArgs = {
  ccLast4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationReSubribeUserNewCcArgs = {
  ccLast4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationChangeCreditCardArgs = {
  ccLast4: Scalars['String'];
  source: Scalars['String'];
};


export type MutationCreateStaffArgs = {
  input: StaffInput;
};


export type MutationUpdateStaffArgs = {
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  id: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserAuthInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirm?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type StaffResponse = {
  __typename?: 'StaffResponse';
  errors?: Maybe<Array<FieldError>>;
  staff?: Maybe<Staff>;
};

export type StaffInput = {
  name: Scalars['String'];
};

export type ProfileUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'role' | 'customerType' | 'ccLast4'>
);

export type ProfileUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & ProfileUserFragment
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularStaffFragment = (
  { __typename?: 'Staff' }
  & Pick<Staff, 'id'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'role'>
);

export type RegularStaffResponseFragment = (
  { __typename?: 'StaffResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, staff?: Maybe<(
    { __typename?: 'Staff' }
    & RegularStaffFragment
  )> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type StaffSnippetFragment = (
  { __typename?: 'Staff' }
  & Pick<Staff, 'id' | 'name' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { cancelSubscription: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type ChangeCreditCardMutationVariables = Exact<{
  source: Scalars['String'];
  ccLast4: Scalars['String'];
}>;


export type ChangeCreditCardMutation = (
  { __typename?: 'Mutation' }
  & { changeCreditCard: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateStaffMutationVariables = Exact<{
  input: StaffInput;
}>;


export type CreateStaffMutation = (
  { __typename?: 'Mutation' }
  & { createStaff: (
    { __typename?: 'StaffResponse' }
    & RegularStaffResponseFragment
  ) }
);

export type CreateSubscriptionMutationVariables = Exact<{
  source: Scalars['String'];
  ccLast4: Scalars['String'];
}>;


export type CreateSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { createSubscription: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type DeleteStaffMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStaff'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ReSubribeUserExistingCcMutationVariables = Exact<{ [key: string]: never; }>;


export type ReSubribeUserExistingCcMutation = (
  { __typename?: 'Mutation' }
  & { reSubribeUserExistingCC: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type ReSubribeUserNewCcMutationVariables = Exact<{
  source: Scalars['String'];
  ccLast4: Scalars['String'];
}>;


export type ReSubribeUserNewCcMutation = (
  { __typename?: 'Mutation' }
  & { reSubribeUserNewCC: (
    { __typename?: 'UserResponse' }
    & ProfileUserResponseFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateStaffMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateStaffMutation = (
  { __typename?: 'Mutation' }
  & { updateStaff?: Maybe<(
    { __typename?: 'Staff' }
    & Pick<Staff, 'id' | 'name'>
  )> }
);

export type UpdateUserAuthMutationVariables = Exact<{
  input: UserAuthInput;
}>;


export type UpdateUserAuthMutation = (
  { __typename?: 'Mutation' }
  & { updateAuth: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & ProfileUserFragment
  )> }
);

export type StaffQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type StaffQuery = (
  { __typename?: 'Query' }
  & { staff?: Maybe<(
    { __typename?: 'Staff' }
    & Pick<Staff, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  )> }
);

export type StaffsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type StaffsQuery = (
  { __typename?: 'Query' }
  & { staffs: (
    { __typename?: 'PaginatedStaff' }
    & Pick<PaginatedStaff, 'hasMore'>
    & { staffs: Array<(
      { __typename?: 'Staff' }
      & StaffSnippetFragment
    )> }
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const ProfileUserFragmentDoc = gql`
    fragment ProfileUser on User {
  id
  email
  role
  customerType
  ccLast4
}
    `;
export const ProfileUserResponseFragmentDoc = gql`
    fragment ProfileUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...ProfileUser
  }
}
    ${RegularErrorFragmentDoc}
${ProfileUserFragmentDoc}`;
export const RegularStaffFragmentDoc = gql`
    fragment RegularStaff on Staff {
  id
}
    `;
export const RegularStaffResponseFragmentDoc = gql`
    fragment RegularStaffResponse on StaffResponse {
  errors {
    ...RegularError
  }
  staff {
    ...RegularStaff
  }
}
    ${RegularErrorFragmentDoc}
${RegularStaffFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  role
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const StaffSnippetFragmentDoc = gql`
    fragment StaffSnippet on Staff {
  id
  name
  creator {
    id
    email
  }
  createdAt
}
    `;
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription {
  cancelSubscription {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const ChangeCreditCardDocument = gql`
    mutation ChangeCreditCard($source: String!, $ccLast4: String!) {
  changeCreditCard(source: $source, ccLast4: $ccLast4) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type ChangeCreditCardMutationFn = Apollo.MutationFunction<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>;

/**
 * __useChangeCreditCardMutation__
 *
 * To run a mutation, you first call `useChangeCreditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeCreditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeCreditCardMutation, { data, loading, error }] = useChangeCreditCardMutation({
 *   variables: {
 *      source: // value for 'source'
 *      ccLast4: // value for 'ccLast4'
 *   },
 * });
 */
export function useChangeCreditCardMutation(baseOptions?: Apollo.MutationHookOptions<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>(ChangeCreditCardDocument, options);
      }
export type ChangeCreditCardMutationHookResult = ReturnType<typeof useChangeCreditCardMutation>;
export type ChangeCreditCardMutationResult = Apollo.MutationResult<ChangeCreditCardMutation>;
export type ChangeCreditCardMutationOptions = Apollo.BaseMutationOptions<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateStaffDocument = gql`
    mutation CreateStaff($input: StaffInput!) {
  createStaff(input: $input) {
    ...RegularStaffResponse
  }
}
    ${RegularStaffResponseFragmentDoc}`;
export type CreateStaffMutationFn = Apollo.MutationFunction<CreateStaffMutation, CreateStaffMutationVariables>;

/**
 * __useCreateStaffMutation__
 *
 * To run a mutation, you first call `useCreateStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStaffMutation, { data, loading, error }] = useCreateStaffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStaffMutation(baseOptions?: Apollo.MutationHookOptions<CreateStaffMutation, CreateStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStaffMutation, CreateStaffMutationVariables>(CreateStaffDocument, options);
      }
export type CreateStaffMutationHookResult = ReturnType<typeof useCreateStaffMutation>;
export type CreateStaffMutationResult = Apollo.MutationResult<CreateStaffMutation>;
export type CreateStaffMutationOptions = Apollo.BaseMutationOptions<CreateStaffMutation, CreateStaffMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($source: String!, $ccLast4: String!) {
  createSubscription(source: $source, ccLast4: $ccLast4) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      source: // value for 'source'
 *      ccLast4: // value for 'ccLast4'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const DeleteStaffDocument = gql`
    mutation DeleteStaff($id: Int!) {
  deleteStaff(id: $id)
}
    `;
export type DeleteStaffMutationFn = Apollo.MutationFunction<DeleteStaffMutation, DeleteStaffMutationVariables>;

/**
 * __useDeleteStaffMutation__
 *
 * To run a mutation, you first call `useDeleteStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStaffMutation, { data, loading, error }] = useDeleteStaffMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStaffMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStaffMutation, DeleteStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStaffMutation, DeleteStaffMutationVariables>(DeleteStaffDocument, options);
      }
export type DeleteStaffMutationHookResult = ReturnType<typeof useDeleteStaffMutation>;
export type DeleteStaffMutationResult = Apollo.MutationResult<DeleteStaffMutation>;
export type DeleteStaffMutationOptions = Apollo.BaseMutationOptions<DeleteStaffMutation, DeleteStaffMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ReSubribeUserExistingCcDocument = gql`
    mutation ReSubribeUserExistingCC {
  reSubribeUserExistingCC {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type ReSubribeUserExistingCcMutationFn = Apollo.MutationFunction<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>;

/**
 * __useReSubribeUserExistingCcMutation__
 *
 * To run a mutation, you first call `useReSubribeUserExistingCcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReSubribeUserExistingCcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reSubribeUserExistingCcMutation, { data, loading, error }] = useReSubribeUserExistingCcMutation({
 *   variables: {
 *   },
 * });
 */
export function useReSubribeUserExistingCcMutation(baseOptions?: Apollo.MutationHookOptions<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>(ReSubribeUserExistingCcDocument, options);
      }
export type ReSubribeUserExistingCcMutationHookResult = ReturnType<typeof useReSubribeUserExistingCcMutation>;
export type ReSubribeUserExistingCcMutationResult = Apollo.MutationResult<ReSubribeUserExistingCcMutation>;
export type ReSubribeUserExistingCcMutationOptions = Apollo.BaseMutationOptions<ReSubribeUserExistingCcMutation, ReSubribeUserExistingCcMutationVariables>;
export const ReSubribeUserNewCcDocument = gql`
    mutation ReSubribeUserNewCC($source: String!, $ccLast4: String!) {
  reSubribeUserNewCC(source: $source, ccLast4: $ccLast4) {
    ...ProfileUserResponse
  }
}
    ${ProfileUserResponseFragmentDoc}`;
export type ReSubribeUserNewCcMutationFn = Apollo.MutationFunction<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>;

/**
 * __useReSubribeUserNewCcMutation__
 *
 * To run a mutation, you first call `useReSubribeUserNewCcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReSubribeUserNewCcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reSubribeUserNewCcMutation, { data, loading, error }] = useReSubribeUserNewCcMutation({
 *   variables: {
 *      source: // value for 'source'
 *      ccLast4: // value for 'ccLast4'
 *   },
 * });
 */
export function useReSubribeUserNewCcMutation(baseOptions?: Apollo.MutationHookOptions<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>(ReSubribeUserNewCcDocument, options);
      }
export type ReSubribeUserNewCcMutationHookResult = ReturnType<typeof useReSubribeUserNewCcMutation>;
export type ReSubribeUserNewCcMutationResult = Apollo.MutationResult<ReSubribeUserNewCcMutation>;
export type ReSubribeUserNewCcMutationOptions = Apollo.BaseMutationOptions<ReSubribeUserNewCcMutation, ReSubribeUserNewCcMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateStaffDocument = gql`
    mutation UpdateStaff($id: Int!, $name: String!) {
  updateStaff(id: $id, name: $name) {
    id
    name
  }
}
    `;
export type UpdateStaffMutationFn = Apollo.MutationFunction<UpdateStaffMutation, UpdateStaffMutationVariables>;

/**
 * __useUpdateStaffMutation__
 *
 * To run a mutation, you first call `useUpdateStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffMutation, { data, loading, error }] = useUpdateStaffMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateStaffMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStaffMutation, UpdateStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStaffMutation, UpdateStaffMutationVariables>(UpdateStaffDocument, options);
      }
export type UpdateStaffMutationHookResult = ReturnType<typeof useUpdateStaffMutation>;
export type UpdateStaffMutationResult = Apollo.MutationResult<UpdateStaffMutation>;
export type UpdateStaffMutationOptions = Apollo.BaseMutationOptions<UpdateStaffMutation, UpdateStaffMutationVariables>;
export const UpdateUserAuthDocument = gql`
    mutation UpdateUserAuth($input: UserAuthInput!) {
  updateAuth(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type UpdateUserAuthMutationFn = Apollo.MutationFunction<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>;

/**
 * __useUpdateUserAuthMutation__
 *
 * To run a mutation, you first call `useUpdateUserAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAuthMutation, { data, loading, error }] = useUpdateUserAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAuthMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>(UpdateUserAuthDocument, options);
      }
export type UpdateUserAuthMutationHookResult = ReturnType<typeof useUpdateUserAuthMutation>;
export type UpdateUserAuthMutationResult = Apollo.MutationResult<UpdateUserAuthMutation>;
export type UpdateUserAuthMutationOptions = Apollo.BaseMutationOptions<UpdateUserAuthMutation, UpdateUserAuthMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  me {
    ...ProfileUser
  }
}
    ${ProfileUserFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const StaffDocument = gql`
    query Staff($id: Int!) {
  staff(id: $id) {
    id
    createdAt
    updatedAt
    name
    creator {
      id
      email
    }
  }
}
    `;

/**
 * __useStaffQuery__
 *
 * To run a query within a React component, call `useStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffQuery(baseOptions: Apollo.QueryHookOptions<StaffQuery, StaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StaffQuery, StaffQueryVariables>(StaffDocument, options);
      }
export function useStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StaffQuery, StaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StaffQuery, StaffQueryVariables>(StaffDocument, options);
        }
export type StaffQueryHookResult = ReturnType<typeof useStaffQuery>;
export type StaffLazyQueryHookResult = ReturnType<typeof useStaffLazyQuery>;
export type StaffQueryResult = Apollo.QueryResult<StaffQuery, StaffQueryVariables>;
export const StaffsDocument = gql`
    query Staffs($limit: Int!, $cursor: String) {
  staffs(limit: $limit, cursor: $cursor) {
    hasMore
    staffs {
      ...StaffSnippet
    }
  }
}
    ${StaffSnippetFragmentDoc}`;

/**
 * __useStaffsQuery__
 *
 * To run a query within a React component, call `useStaffsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useStaffsQuery(baseOptions: Apollo.QueryHookOptions<StaffsQuery, StaffsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StaffsQuery, StaffsQueryVariables>(StaffsDocument, options);
      }
export function useStaffsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StaffsQuery, StaffsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StaffsQuery, StaffsQueryVariables>(StaffsDocument, options);
        }
export type StaffsQueryHookResult = ReturnType<typeof useStaffsQuery>;
export type StaffsLazyQueryHookResult = ReturnType<typeof useStaffsLazyQuery>;
export type StaffsQueryResult = Apollo.QueryResult<StaffsQuery, StaffsQueryVariables>;