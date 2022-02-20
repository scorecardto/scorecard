import { NextSeo } from 'next-seo';
import Link from 'next/link';

const Index = () => {
  return (
    <div>
      <NextSeo title="Insights" />
      <p>Scorecard Boilerplate</p>
      <Link href={'/insights'}>
        <a>link</a>
      </Link>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Insights',
    },
  };
}

export default Index;
