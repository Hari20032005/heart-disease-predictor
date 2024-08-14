import Head from 'next/head';
import PredictionForm from '../components/PredictionForm';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Heart Disease Predictor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Heart Disease Risk Predictor</h1>
        <PredictionForm />
      </main>
    </div>
  );
}