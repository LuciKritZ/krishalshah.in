import LoginForm from './_components/login-form';
// import AuthWrapper from '@/components/auth/wrapper';

const LoginPage = () => (
  // <AuthWrapper>
  <section className='pb-24 pt-40'>
    <div className='container max-w-3xl'>
      <h2 className='title'>Sign In</h2>
      <LoginForm />
    </div>
  </section>
  // </AuthWrapper>
);

export default LoginPage;
