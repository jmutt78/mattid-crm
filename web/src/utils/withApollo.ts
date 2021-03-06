import { PaginatedStaff } from './../generated/graphql';
import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            staffs: {
              keyArgs: [],
              merge(
                existing: PaginatedStaff | undefined,
                incoming: PaginatedStaff,
              ): PaginatedStaff {
                return {
                  ...incoming,
                  staffs: [...(existing?.staffs || []), ...incoming.staffs],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
