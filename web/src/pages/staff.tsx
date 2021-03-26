import React from 'react';
import { Layout } from '../components/Layout';
import Staff from '../components/Staff';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

const StaffPage = () => {
  useIsAuth();
  return (
    <Layout>
      <Staff />
    </Layout>
  );
};

export default withApollo({ ssr: false })(StaffPage);
