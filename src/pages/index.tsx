import Link from 'next/link';

const Index = () => {
  return (
    <div>
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
      pageTitle: 'Your Grades',
    },
  };
}

export default Index;
