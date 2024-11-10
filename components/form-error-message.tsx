interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message = '' }: FormErrorMessageProps) => {
  if (!message.trim()) {
    return null;
  }
  return <p className='ml-1 mt-2 text-sm text-rose-400'>{message}</p>;
};

export default FormErrorMessage;
