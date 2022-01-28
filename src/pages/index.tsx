import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <p>Scorecard Boilerplate</p>
    </Main>
  );
};

export default Index;
