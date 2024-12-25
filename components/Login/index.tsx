import React, { useState, useCallback } from 'react';
import Image from 'next/image';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [loginType, setLoginType] = useState<'password' | 'sms'>('password');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = useCallback(() => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      console.log('Sending verification code to:', phoneNumber);
      startCountdown();
    } catch (error) {
      console.error('Failed to send verification code:', error);
      alert('发送验证码失败，请重试');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }

    if (!agreedToTerms) {
      alert('请阅读并同意用户协议和隐私政策');
      return;
    }

    try {
      if (loginType === 'password') {
        if (!password) {
          alert('请输入密码');
          return;
        }
        // TODO: Replace with actual password login API call
        console.log('Password login:', { phoneNumber, password });
      } else {
        if (!verificationCode) {
          alert('请输入验证码');
          return;
        }
        // TODO: Replace with actual SMS login API call
        console.log('SMS login:', { phoneNumber, verificationCode });
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('登录失败，请重试');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl overflow-hidden flex w-[1000px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left side - Image */}
        <div className="w-1/2 bg-[#f8faf0] flex items-center justify-center p-8">
          <div className="relative w-80 h-96">
            <Image
              src="/login.svg"
              alt="Login"
              width={320}
              height={384}
              priority
            />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-96 p-8">
            <div className="flex gap-4 mb-8">
              <button
                className={`text-xl font-medium ${loginType === 'password' ? 'text-black' : 'text-gray-400'}`}
                onClick={() => setLoginType('password')}
              >
                密码登录
              </button>
              <button
                className={`text-xl font-medium ${loginType === 'sms' ? 'text-black' : 'text-gray-400'}`}
                onClick={() => setLoginType('sms')}
              >
                验证码登录
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Phone Input */}
              <div className="relative">
                <div className="flex border rounded-full overflow-hidden">
                  <span className="bg-black text-white px-3 py-3">+86</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="输入手机号"
                    className="flex-1 px-4 py-3 outline-none"
                    maxLength={11}
                  />
                </div>
              </div>

              {/* Password or Verification Code Input */}
              <div className="relative">
                <div className="flex border rounded-full overflow-hidden">
                  <input
                    type={loginType === 'password' ? (showPassword ? "text" : "password") : "text"}
                    value={loginType === 'password' ? password : verificationCode}
                    onChange={(e) => loginType === 'password' 
                      ? setPassword(e.target.value)
                      : setVerificationCode(e.target.value)
                    }
                    placeholder={loginType === 'password' ? "输入密码" : "输入验证码"}
                    className="flex-1 px-4 py-3 outline-none"
                    maxLength={loginType === 'password' ? undefined : 6}
                  />
                  {loginType === 'password' ? (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-4"
                    >
                      <Image
                        src="/vector.svg"
                        alt={showPassword ? "Hide password" : "Show password"}
                        width={20}
                        height={20}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={countdown > 0}
                      className={`px-4 whitespace-nowrap ${countdown > 0 ? 'text-gray-400' : 'text-green-500'}`}
                    >
                      {countdown > 0 ? `${countdown}s后重新发送` : '发送验证码'}
                    </button>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-600">
                  我已阅读并同意{' '}
                  <a href="#" className="text-green-500">用户协议</a>
                  {' '}和{' '}
                  <a href="#" className="text-green-500">隐私政策</a>
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#c3f53b] rounded-full text-black font-medium hover:bg-[#b5e48c] transition-colors"
              >
                登录
              </button>

              {/* Register Link */}
              <div className="text-center">
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                  还没注册？前往注册 &gt;
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;