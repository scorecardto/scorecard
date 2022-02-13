import { Meta } from '@/layout/Meta';
import { AppConfig } from '@/lib/AppConfig';
import { Main } from '@/templates/Main';

const Index = () => {
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
