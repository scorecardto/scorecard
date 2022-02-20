import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      <p>Scorecard Boilerplate</p>
      <Link href={'/about'}>
        <a>link</a>
      </Link>
    </div>
  );
};

export default Dashboard;
