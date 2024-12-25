import RegisterForm from './_components/register-form';
// import AuthWrapper from '@/components/auth/wrapper';

const RegisterPage = () => (
  // <AuthWrapper>
  <section className='pb-24 pt-40'>
    <div className='container max-w-3xl'>
      <h2 className='title'>Register</h2>
      <RegisterForm />
    </div>
  </section>
  // </AuthWrapper>
);

export default RegisterPage;
