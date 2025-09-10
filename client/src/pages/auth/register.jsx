import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../components/common/form';
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  mobile: '',
  email: '',
  location: '',
  password: '',
  confirmPassword: '',
  profilePic: null,
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
        description: "Please make sure both password fields are identical.",
      });
      return;
    }

    // Prepare form data for sending with image
    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }

    dispatch(registerUser(submissionData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate('/auth/login');
      } else {
        toast({
          title: "Registration failed",
          variant: 'destructive',
          description: "Please try again with different credentials.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gold">Create new account</h1>
        <p className="mt-2">
          Already have an account?
          <Link className="text-gold hover:underline ml-2 font-semibold" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
