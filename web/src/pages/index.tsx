import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  useIsAuth();
  return <Layout></Layout>;
};

export default withApollo({ ssr: false })(Index);
